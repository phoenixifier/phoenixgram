import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { Webhook } from "svix";
import { api } from "./_generated/api";

const http = httpRouter();

http.route({
	path: "/clerk-webhook",
	method: "POST",
	handler: httpAction(async (ctx, req) => {
		const webhookSecret = process.env.CLERK_WEBHOOK_SECRET;
		if (!webhookSecret) {
			throw new Error("Missing CLERK_WEBHOOK_SECRET environment variable");
		}

		const svix_id = req.headers.get("svix-id");
		const svix_signature = req.headers.get("svix-signature");
		const svix_timestamp = req.headers.get("svix-timestamp");

		if (!svix_id || !svix_signature || !svix_timestamp) {
			return new Response("Error occurred - no svix headers", { status: 400 });
		}

		const payload = await req.json();
		const body = JSON.stringify(payload);

		const wh = new Webhook(webhookSecret);
		let event: any;

		try {
			event = wh.verify(body, {
				"svix-id": svix_id,
				"svix-signature": svix_signature,
				"svix-timestamp": svix_timestamp,
			}) as any;
		} catch (error) {
			console.error(error);
			return new Response("Error occurred", { status: 400 });
		}

		const eventType = event.type;

		if (eventType === "user.created") {
			const { id, email_addresses, first_name, last_name, image_url } =
				event.data;

			const email = email_addresses[0].email_address;
			const name = `${first_name || ""} ${last_name || ""}`.trim();

			try {
				await ctx.runMutation(api.users.createUser, {
					email,
					full_name: name,
					image: image_url,
					clerk_id: id,
					username: email.split("@")[0],
				});
			} catch (error) {
				console.log("Error creating a user", error);
				return new Response("Error creating a user", { status: 500 });
			}
		}
		return new Response("Created user", { status: 200 });
	}),
});

export default http;

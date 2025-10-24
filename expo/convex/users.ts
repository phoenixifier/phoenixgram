import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
	args: {
		username: v.string(),
		full_name: v.string(),
		email: v.string(),
		image: v.optional(v.string()),
		bio: v.optional(v.string()),
		clerk_id: v.string(),
	},

	handler: async (ctx, args) => {
		const existingUser = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => {
				return q.eq("clerk_id", args.clerk_id);
			})
			.unique();

		//await ctx.auth.getUserIdentity();

		if (existingUser) return;

		await ctx.db.insert("users", {
			username: args.username,
			full_name: args.username,
			email: args.email,
			image: args.image,
			bio: args.bio,
			clerk_id: args.clerk_id,
			followers: 0,
			following: 0,
			posts: 0,
		});
	},
});

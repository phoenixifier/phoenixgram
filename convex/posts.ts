import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const generateUploadUrl = mutation(async (ctx) => {
	const identity = await ctx.auth.getUserIdentity();
	if (!identity) throw new Error("Unauthorized");
	return await ctx.storage.generateUploadUrl();
});

export const createPost = mutation({
	args: {
		caption: v.optional(v.string()),
		storage_id: v.id("_storage"),
	},

	handler: async (ctx, args) => {
		const identity = await ctx.auth.getUserIdentity();
		if (!identity) throw new Error("Unauthorized");
		const currentUser = await ctx.db
			.query("users")
			.withIndex("by_clerk_id", (q) => q.eq("clerk_id", identity.subject))
			.unique();

		if (!currentUser) throw new Error("User not found");

		const imageUrl = await ctx.storage.getUrl(args.storage_id);
		if (!imageUrl) throw new Error("Image not found");

		const postId = await ctx.db.insert("posts", {
			user_id: currentUser._id,
			image_url: imageUrl,
			storage_id: args.storage_id,
			caption: args.caption,
			likes: 0,
			comments: 0,
		});

		await ctx.db.patch(currentUser._id, {
			posts: currentUser.posts + 1,
		});

		return postId;
	},
});

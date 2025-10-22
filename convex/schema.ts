import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
	users: defineTable({
		username: v.string(),
		full_name: v.string(),
		email: v.string(),
		bio: v.optional(v.string()),
		image: v.optional(v.string()),
		followers: v.number(),
		following: v.number(),
		posts: v.number(),
		clerk_id: v.string(),
	}).index("by_clerk_id", ["clerk_id"]),

	posts: defineTable({
		user_id: v.id("users"),
		image_url: v.string(),
		storage_id: v.id("_storage"),
		caption: v.optional(v.string()),
		likes: v.number(),
		comments: v.number(),
	}).index("by_user", ["user_id"]),

	likes: defineTable({
		user_id: v.id("users"),
		post_id: v.id("posts"),
	})
		.index("by_posts", ["post_id"])
		.index("by_user_and_post", ["user_id", "post_id"]),

	comments: defineTable({
		user_id: v.id("users"),
		post_id: v.id("posts"),
		content: v.string(),
	}).index("by_posts", ["post_id"]),

	follows: defineTable({
		follower_id: v.id("users"),
		following_id: v.id("users"),
	})
		.index("by_follower", ["follower_id"])
		.index("by_following", ["following_id"])
		.index("by_both", ["follower_id", "following_id"]),

	notifications: defineTable({
		receiver_id: v.id("users"),
		sender_id: v.id("users"),
		type: v.union(v.literal("like"), v.literal("comment"), v.literal("follow")),
		post_id: v.optional(v.id("posts")),
		comment_id: v.optional(v.id("comments")),
	}).index("by_receiver", ["receiver_id"]),

	bookmarks: defineTable({
		user_id: v.id("users"),
		post_id: v.id("posts"),
	})
		.index("by_user", ["user_id"])
		.index("by_post", ["post_id"])
		.index("by_user_and_post", ["user_id", "post_id"]),
});

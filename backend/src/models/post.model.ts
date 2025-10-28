export interface Post {
	post_id: number;
	user_id: number;
	media: string;
	caption: string;
	likes_count: number;
	comments_count: number;
	created_at: Date;
	updated_at: Date;
}

export let posts: Post[] = [];

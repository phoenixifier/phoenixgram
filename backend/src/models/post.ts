export interface Post {
	user_id: number;
	media: string;
	caption: string;
	likes_count: number;
	comments_count: number;
}

export let posts: Post[] = [];

import { apiGet, apiPost, apiPut, apiDelete } from '$lib/api/client';

export interface Blog {
	id: number;
	slug: string;
	title_fr: string;
	title_en: string | null;
	title_es: string | null;
	excerpt_fr: string | null;
	excerpt_en: string | null;
	excerpt_es: string | null;
	content_fr: string;
	content_en: string | null;
	content_es: string | null;
	cover_image: string | null;
	meta_title: string | null;
	meta_description: string | null;
	meta_keywords: string | null;
	category: string | null;
	tags: string[] | null;
	published: 0 | 1;
	published_at: string | null;
	views: number;
	created_at: string;
	updated_at: string;
}

export async function listBlogs(): Promise<Blog[]> {
	try {
		const r = await apiGet<{ ok: true; blogs: Blog[] }>('/blogs');
		return r.blogs;
	} catch {
		return [];
	}
}

export async function getBlog(slug: string): Promise<Blog | null> {
	try {
		const r = await apiGet<{ ok: true; blog: Blog }>(`/blogs/${encodeURIComponent(slug)}`);
		return r.blog;
	} catch {
		return null;
	}
}

export async function createBlog(input: Partial<Blog>): Promise<Blog | null> {
	try {
		const r = await apiPost<{ ok: true; blog: Blog }>('/blogs', input);
		return r.blog;
	} catch {
		return null;
	}
}

export async function updateBlog(id: number, input: Partial<Blog>): Promise<Blog | null> {
	try {
		const r = await apiPut<{ ok: true; blog: Blog }>(`/blogs/${id}`, input);
		return r.blog;
	} catch {
		return null;
	}
}

export async function deleteBlog(id: number): Promise<boolean> {
	try {
		await apiDelete(`/blogs/${id}`);
		return true;
	} catch {
		return false;
	}
}

export async function togglePublish(id: number): Promise<boolean | null> {
	try {
		const r = await apiPost<{ ok: true; published: boolean }>(`/blogs/${id}/publish`);
		return r.published;
	} catch {
		return null;
	}
}

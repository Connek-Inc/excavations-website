<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import BlogEditor from '$lib/components/BlogEditor.svelte';
	import { apiGet } from '$lib/api/client';
	import { getCurrent } from '$lib/admin/clients';
	import type { Blog } from '$lib/admin/blogs';

	let blog: Blog | null = null;
	let loading = true;
	let notFound = false;

	$: id = $page.params.id;

	onMount(async () => {
		const admin = await getCurrent();
		if (!admin) {
			goto('/mi/admin/login', { replaceState: true });
			return;
		}
		// Look up by id — the /api/blogs endpoint uses slug, but list+filter is simpler.
		try {
			const r = await apiGet<{ ok: true; blogs: Blog[] }>('/blogs');
			blog = r.blogs.find((b) => String(b.id) === String(id)) || null;
			notFound = !blog;
		} catch {
			notFound = true;
		}
		loading = false;
	});
</script>

<svelte:head><title>Modifier article — Admin</title><meta name="robots" content="noindex, nofollow" /></svelte:head>

{#if loading}
	<p class="text-sm text-gray-400 dark:text-zinc-600 p-8">…</p>
{:else if notFound || !blog}
	<div class="p-8 text-center">
		<p class="text-gray-500 dark:text-zinc-400 mb-4">Article introuvable.</p>
		<a href="/mi/admin/blogs" class="text-sm text-[#febd17] underline">Retour à la liste</a>
	</div>
{:else}
	<BlogEditor {blog} />
{/if}

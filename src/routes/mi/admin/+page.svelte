<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { ShieldCheck } from 'lucide-svelte';

	onMount(() => {
		// Admin root → send to login. Once a real session check is wired
		// up (backend re-enabled), this should go to the dashboard when
		// authenticated.
		goto('/mi/admin/login', { replaceState: true });
	});
</script>

<svelte:head>
	<title>Administration — Mini Excavations Érable</title>
	<meta name="robots" content="noindex, nofollow" />
</svelte:head>

<div class="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-4">
	<div class="text-center">
		<div class="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-[#febd17] mb-4">
			<ShieldCheck class="w-6 h-6 text-black" />
		</div>
		<p class="text-zinc-400 text-sm mb-4">Redirection vers la connexion…</p>
		<a href="/mi/admin/login" class="text-[#febd17] hover:underline text-sm font-semibold">
			Accéder au panneau administrateur →
		</a>
	</div>
</div>

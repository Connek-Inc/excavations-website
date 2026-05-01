<script lang="ts">
	import { cn } from '$lib/lib-utils';
	import { ArrowRight } from 'lucide-svelte';

	export let href: string = '#contact';
	export let variant: 'primary' | 'secondary' | 'ghost' | 'whatsapp' | 'phone' = 'primary';
	export let size: 'sm' | 'md' | 'lg' | 'xl' = 'lg';
	export let fullWidth: boolean = false;
	export let icon: any = null;
	export let pulse: boolean = false;
	let className: string | undefined | null = undefined;
	export { className as class };

	const variants = {
		primary:
			'bg-gradient-to-r from-[#febd17] to-yellow-500 hover:from-yellow-500 hover:to-[#febd17] text-black shadow-2xl shadow-yellow-500/40 hover:shadow-yellow-500/60',
		secondary:
			'bg-white dark:bg-zinc-900 text-black dark:text-white border-2 border-black dark:border-white hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black',
		ghost:
			'bg-transparent text-black dark:text-white hover:bg-black/5 dark:hover:bg-white/10 border border-gray-300 dark:border-zinc-700',
		whatsapp:
			'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white shadow-2xl shadow-green-500/40',
		phone:
			'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-2xl shadow-blue-500/40'
	};

	const sizes = {
		sm: 'px-4 py-2 text-sm',
		md: 'px-6 py-3 text-base',
		lg: 'px-8 py-4 text-lg',
		xl: 'px-10 py-5 text-xl'
	};
</script>

<a
	{href}
	on:click
	class={cn(
		'group inline-flex items-center justify-center gap-2 rounded-full font-black tracking-tight transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden',
		variants[variant],
		sizes[size],
		fullWidth && 'w-full',
		pulse && 'animate-pulse-cta',
		className
	)}
>
	{#if pulse}
		<span class="absolute inset-0 rounded-full bg-current opacity-30 animate-ping"></span>
	{/if}
	{#if icon}
		<svelte:component this={icon} class="w-5 h-5 relative z-10" />
	{/if}
	<span class="relative z-10"><slot /></span>
	<ArrowRight class="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
</a>

<style>
	@keyframes pulse-cta {
		0%, 100% { transform: scale(1); }
		50% { transform: scale(1.03); }
	}
	:global(.animate-pulse-cta) {
		animation: pulse-cta 2s ease-in-out infinite;
	}
</style>

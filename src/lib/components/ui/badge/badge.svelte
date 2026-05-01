<script lang="ts">
	import { cn } from '$lib/lib-utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let variant: 'default' | 'success' | 'warning' | 'danger' | 'info' | 'outline' = 'default';

	const variants = {
		default: 'bg-gray-100 text-gray-800 dark:bg-zinc-800 dark:text-zinc-200',
		success: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
		warning: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400',
		danger: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
		info: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
		outline: 'border border-gray-200 dark:border-zinc-700 text-gray-700 dark:text-gray-300'
	};
</script>

<span
	class={cn(
		'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
		variants[variant],
		className
	)}
>
	<slot />
</span>

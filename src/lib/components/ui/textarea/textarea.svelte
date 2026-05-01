<script lang="ts">
	import { cn } from '$lib/lib-utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let value: string | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let rows = 4;
	export let required = false;
	export let disabled = false;
	export let maxlength: number | undefined = undefined;
</script>

<textarea
	{name}
	{id}
	{rows}
	{placeholder}
	{required}
	{disabled}
	{maxlength}
	bind:value
	on:input
	on:change
	on:blur
	class={cn(
		'flex min-h-[100px] w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-3 text-sm transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#febd17] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
		className
	)}
></textarea>

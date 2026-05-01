<script lang="ts">
	import { cn } from '$lib/lib-utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let type: string = 'text';
	export let value: string | number | undefined = undefined;
	export let placeholder: string | undefined = undefined;
	export let name: string | undefined = undefined;
	export let id: string | undefined = undefined;
	export let required = false;
	export let disabled = false;
	export let readonly = false;
	export let autocomplete: string | undefined = undefined;
	export let pattern: string | undefined = undefined;
	export let maxlength: number | undefined = undefined;

	$: inputClass = cn(
		'flex h-11 w-full rounded-xl border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 px-4 py-2 text-sm transition-all placeholder:text-gray-400 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[#febd17] focus:border-transparent disabled:cursor-not-allowed disabled:opacity-50',
		className
	);
</script>

{#if type === 'email'}
	<input
		type="email"
		{name}
		{id}
		{placeholder}
		{required}
		{disabled}
		{readonly}
		{autocomplete}
		{pattern}
		{maxlength}
		bind:value
		on:input
		on:change
		on:blur
		on:focus
		on:keydown
		class={inputClass}
	/>
{:else if type === 'password'}
	<input
		type="password"
		{name}
		{id}
		{placeholder}
		{required}
		{disabled}
		{readonly}
		{autocomplete}
		{pattern}
		{maxlength}
		bind:value
		on:input
		on:change
		on:blur
		on:focus
		on:keydown
		class={inputClass}
	/>
{:else if type === 'number'}
	<input
		type="number"
		{name}
		{id}
		{placeholder}
		{required}
		{disabled}
		{readonly}
		{autocomplete}
		bind:value
		on:input
		on:change
		on:blur
		on:focus
		on:keydown
		class={inputClass}
	/>
{:else if type === 'tel'}
	<input
		type="tel"
		{name}
		{id}
		{placeholder}
		{required}
		{disabled}
		{readonly}
		{autocomplete}
		{pattern}
		{maxlength}
		bind:value
		on:input
		on:change
		on:blur
		on:focus
		on:keydown
		class={inputClass}
	/>
{:else if type === 'url'}
	<input
		type="url"
		{name}
		{id}
		{placeholder}
		{required}
		{disabled}
		{readonly}
		{autocomplete}
		{pattern}
		{maxlength}
		bind:value
		on:input
		on:change
		on:blur
		on:focus
		on:keydown
		class={inputClass}
	/>
{:else}
	<input
		type="text"
		{name}
		{id}
		{placeholder}
		{required}
		{disabled}
		{readonly}
		{autocomplete}
		{pattern}
		{maxlength}
		bind:value
		on:input
		on:change
		on:blur
		on:focus
		on:keydown
		class={inputClass}
	/>
{/if}

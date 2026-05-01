<script lang="ts">
	import { cn } from '$lib/lib-utils';

	let className: string | undefined | null = undefined;
	export { className as class };
	export let forId: string | undefined = undefined;
</script>

<label
	for={forId}
	class={cn(
		'text-sm font-medium text-gray-700 dark:text-gray-300 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
		className
	)}
>
	<slot />
</label>

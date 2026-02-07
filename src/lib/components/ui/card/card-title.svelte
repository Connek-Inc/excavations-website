<script lang="ts">
	import { cn } from "$lib/lib-utils";
	import type { HTMLAttributes } from "svelte/elements";
  
	let className: string | undefined | null = undefined;
	export { className as class };
</script>
  
<h3
	class={cn(
	  "text-2xl font-semibold leading-none tracking-tight",
	  className
	)}
	{...$$restProps}
>
	<slot />
</h3>

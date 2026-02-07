<script lang="ts">
	import { cn } from "$lib/lib-utils";
	import type { HTMLAttributes } from "svelte/elements";
  
	let className: string | undefined | null = undefined;
	export { className as class };
</script>
  
<p
	class={cn("text-sm text-muted-foreground", className)}
	{...$$restProps}
>
	<slot />
</p>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Eraser } from 'lucide-svelte';

	export let value: string = ''; // data URL
	export let label: string = 'Signature';

	let canvas: HTMLCanvasElement;
	let ctx: CanvasRenderingContext2D;
	let drawing = false;
	let hasDrawn = false;
	let lastX = 0;
	let lastY = 0;

	onMount(() => {
		ctx = canvas.getContext('2d')!;
		ctx.strokeStyle = '#111';
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';

		const dpr = window.devicePixelRatio || 1;
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		canvas.style.width = rect.width + 'px';
		canvas.style.height = rect.height + 'px';
		ctx.scale(dpr, dpr);
		ctx.strokeStyle = '#111';
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.lineJoin = 'round';
	});

	function getPos(e: MouseEvent | TouchEvent) {
		const rect = canvas.getBoundingClientRect();
		const x = 'touches' in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
		const y = 'touches' in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
		return { x: x - rect.left, y: y - rect.top };
	}

	function start(e: MouseEvent | TouchEvent) {
		e.preventDefault();
		drawing = true;
		const { x, y } = getPos(e);
		lastX = x;
		lastY = y;
	}

	function draw(e: MouseEvent | TouchEvent) {
		if (!drawing) return;
		e.preventDefault();
		const { x, y } = getPos(e);
		ctx.beginPath();
		ctx.moveTo(lastX, lastY);
		ctx.lineTo(x, y);
		ctx.stroke();
		lastX = x;
		lastY = y;
		hasDrawn = true;
	}

	function end() {
		if (!drawing) return;
		drawing = false;
		if (hasDrawn) {
			value = canvas.toDataURL('image/png');
		}
	}

	export function clear() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		hasDrawn = false;
		value = '';
	}
</script>

<div class="space-y-2">
	<div class="flex items-center justify-between">
		<span class="text-sm font-medium text-zinc-300">{label}</span>
		<button
			type="button"
			on:click={clear}
			class="inline-flex items-center gap-1 text-xs text-zinc-400 hover:text-amber-400 transition"
		>
			<Eraser class="h-3 w-3" /> Effacer
		</button>
	</div>
	<div class="relative rounded-lg border-2 border-dashed border-zinc-600 bg-white">
		<canvas
			bind:this={canvas}
			class="block w-full h-40 touch-none cursor-crosshair"
			on:mousedown={start}
			on:mousemove={draw}
			on:mouseup={end}
			on:mouseleave={end}
			on:touchstart={start}
			on:touchmove={draw}
			on:touchend={end}
		></canvas>
		{#if !hasDrawn}
			<div class="absolute inset-0 flex items-center justify-center pointer-events-none text-zinc-400 text-sm">
				Signez ici avec la souris ou le doigt
			</div>
		{/if}
	</div>
</div>

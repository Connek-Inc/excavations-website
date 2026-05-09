<script lang="ts">
	import { onMount } from 'svelte';

	export let initial: string | null = null;

	let canvas: HTMLCanvasElement;
	let drawing = false;
	let dirty = false;
	let last: { x: number; y: number } | null = null;

	export function clear() {
		if (!canvas) return;
		const ctx = canvas.getContext('2d')!;
		ctx.save();
		ctx.setTransform(1, 0, 0, 1, 0, 0);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		ctx.restore();
		dirty = false;
	}

	export function isEmpty() {
		return !dirty;
	}

	export function toDataURL() {
		return canvas?.toDataURL('image/png') ?? '';
	}

	function resizeAndInit() {
		if (!canvas) return;
		const dpr = window.devicePixelRatio || 1;
		const rect = canvas.getBoundingClientRect();
		canvas.width = rect.width * dpr;
		canvas.height = rect.height * dpr;
		const ctx = canvas.getContext('2d')!;
		ctx.scale(dpr, dpr);
		ctx.lineWidth = 2;
		ctx.lineCap = 'round';
		ctx.strokeStyle = '#000';
		if (initial) {
			const img = new Image();
			img.onload = () => ctx.drawImage(img, 0, 0, rect.width, rect.height);
			img.src = initial;
			dirty = true;
		}
	}

	onMount(() => {
		resizeAndInit();
	});

	function pos(e: PointerEvent) {
		const r = canvas.getBoundingClientRect();
		return { x: e.clientX - r.left, y: e.clientY - r.top };
	}

	function start(e: PointerEvent) {
		e.preventDefault();
		drawing = true;
		last = pos(e);
		canvas.setPointerCapture(e.pointerId);
	}

	function move(e: PointerEvent) {
		if (!drawing) return;
		const ctx = canvas.getContext('2d')!;
		const p = pos(e);
		ctx.beginPath();
		ctx.moveTo(last!.x, last!.y);
		ctx.lineTo(p.x, p.y);
		ctx.stroke();
		last = p;
		dirty = true;
	}

	function end() {
		drawing = false;
		last = null;
	}
</script>

<canvas
	bind:this={canvas}
	on:pointerdown={start}
	on:pointermove={move}
	on:pointerup={end}
	on:pointercancel={end}
	class="h-40 w-full touch-none rounded-md border border-gray-300 dark:border-zinc-700 bg-white"
></canvas>

<script lang="ts">
	import { onMount } from 'svelte';
	import { Play, Pause, Volume2, VolumeX } from 'lucide-svelte';

	export let src: string = '/videos/work-1.mp4';
	export let mobileSrc: string = '/videos/work-1-mobile.mp4';
	export let poster: string = '/videos/work-1-poster.jpg';
	export let title: string = 'Mini Excavations Érable — Drain Français Québec';
	export let description: string = '';
	export let autoplay: boolean = true;
	export let loop: boolean = true;
	export let muted: boolean = true;

	let videoEl: HTMLVideoElement;
	let isPlaying = autoplay;
	let isMuted = muted;
	let isMobile = false;

	onMount(() => {
		isMobile = window.matchMedia('(max-width: 768px)').matches;

		// Pause when out of viewport (saves battery + bandwidth)
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!videoEl) return;
					if (entry.isIntersecting && autoplay) {
						videoEl.play().catch(() => {});
						isPlaying = true;
					} else {
						videoEl.pause();
						isPlaying = false;
					}
				});
			},
			{ threshold: 0.25 }
		);
		if (videoEl) observer.observe(videoEl);
		return () => observer.disconnect();
	});

	function togglePlay() {
		if (!videoEl) return;
		if (videoEl.paused) {
			videoEl.play();
			isPlaying = true;
		} else {
			videoEl.pause();
			isPlaying = false;
		}
	}

	function toggleMute() {
		if (!videoEl) return;
		videoEl.muted = !videoEl.muted;
		isMuted = videoEl.muted;
	}
</script>

<div class="relative group rounded-2xl md:rounded-3xl overflow-hidden bg-black border border-gray-200 dark:border-zinc-800 shadow-2xl">
	<video
		bind:this={videoEl}
		{poster}
		{loop}
		muted={isMuted}
		playsinline
		preload="metadata"
		aria-label={title}
		class="w-full h-full object-cover aspect-video"
	>
		<source src={isMobile ? mobileSrc : src} type="video/mp4" />
		<!-- Fallback poster if video fails -->
		<img src={poster} alt={title} loading="lazy" class="w-full h-full object-cover" />
	</video>

	<!-- Gradient overlay for controls -->
	<div class="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 pointer-events-none"></div>

	<!-- Top label -->
	{#if title}
		<div class="absolute top-4 left-4 right-4 flex items-start justify-between">
			<div class="px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2 border border-white/20">
				<span class="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
				LIVE WORK
			</div>
		</div>
	{/if}

	<!-- Bottom: title + description + controls -->
	<div class="absolute bottom-0 left-0 right-0 p-4 md:p-5 flex items-end justify-between gap-3">
		<div class="flex-1 min-w-0 text-white">
			{#if title}<p class="font-bold text-sm md:text-base truncate">{title}</p>{/if}
			{#if description}<p class="text-xs md:text-sm text-white/80 line-clamp-2">{description}</p>{/if}
		</div>

		<!-- Controls -->
		<div class="flex gap-2 flex-shrink-0">
			<button
				on:click={toggleMute}
				class="w-10 h-10 rounded-full bg-white/15 backdrop-blur-md hover:bg-white/30 text-white flex items-center justify-center transition-colors"
				aria-label={isMuted ? 'Unmute' : 'Mute'}
			>
				{#if isMuted}
					<VolumeX class="w-4 h-4" />
				{:else}
					<Volume2 class="w-4 h-4" />
				{/if}
			</button>
			<button
				on:click={togglePlay}
				class="w-10 h-10 rounded-full bg-[#febd17] hover:bg-yellow-400 text-black flex items-center justify-center transition-colors shadow-lg"
				aria-label={isPlaying ? 'Pause' : 'Play'}
			>
				{#if isPlaying}
					<Pause class="w-4 h-4" />
				{:else}
					<Play class="w-4 h-4" fill="currentColor" />
				{/if}
			</button>
		</div>
	</div>
</div>

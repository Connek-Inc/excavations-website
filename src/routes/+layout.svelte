<script lang="ts">
	import '../app.postcss';
	import TopBar from '$lib/TopBar.svelte';
	import Calendar from '$lib/Calendar.svelte';
	import logo from "$lib/logo.png"
    import { onMount, setContext } from 'svelte';
	import { Modal, initializeStores } from "@skeletonlabs/skeleton"
	import type { ModalComponent } from '@skeletonlabs/skeleton';
    import { CalendarClass } from '$lib/calendar';

	onMount(() => {
		// Check if we're running in the browser
		if (typeof window !== 'undefined') {
			// Your GTM container snippet
			(function (w, d, s, l, i) {
				w[l] = w[l] || [];
				w[l].push({
					'gtm.start': new Date().getTime(),
					event: 'gtm.js',
				});
				var f = d.getElementsByTagName(s)[0],
				j = d.createElement(s),
				dl = l != 'dataLayer' ? '&l=' + l : '';
				j.async = true;
				j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
				f.parentNode.insertBefore(j, f);
			})(window, document, 'script', 'dataLayer', 'GTM-KMSWPFDV');
		}
	});

	initializeStores()
	let papa = new CalendarClass([], [])
	const modalRegistry: Record<string, ModalComponent> = {
		calendarModal: { ref: Calendar, props: {calendar: papa, title: 'HI', subtitle: 'hello'} }
	};

	const language = 'fr'
	setContext('language', language)
	setContext('theme', {
		primary: '#febd17',
		secondary: 'black',
		tertiary: 'white'
	})

	let menuOptions;
	let topBarHeight: string | number | undefined;

	$: console.log('IN LAYOUTTTT', topBarHeight)

	if (language=='en') {
		menuOptions = [{
			text: 'Services',
			link: '#services' 
		}, {
			text: 'About Us',
			link: '#about-us' 
		}, {
			text: 'Contact',
			link: '#contact' 
		}]
	} else if (language=='fr') {
		menuOptions = [{
			text: 'Services',
			link: '#services' 
		}, {
			text: 'À propos',
			link: '#about-us' 
		}, {
			text: 'Contact',
			link: '#contact' 
		}]
	}

	
	onMount(()=> {
		if (window.innerHeight <= 768) {
			topBarHeight = 68
		} else {
			topBarHeight = 96
		}
	})


	// Font Afacad sans-serif
</script>


<Modal components={modalRegistry}/>

<TopBar menuOptions={menuOptions} logo={logo} bind:topBarHeight/>

<div class="mt-{topBarHeight/4}">
	<slot />
</div>




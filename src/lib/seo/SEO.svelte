<script lang="ts">
	import { SITE, seoData } from './seo-config';

	export let lang: 'fr' | 'en' | 'es' = 'fr';
	export let title: string | undefined = undefined;
	export let description: string | undefined = undefined;
	export let keywords: string | undefined = undefined;
	export let path: string = '/';
	export let image: string = `${SITE.url}/logo.png`;
	export let imageAlt: string | undefined = undefined;
	export let type: 'website' | 'article' | 'product' = 'website';
	export let publishedTime: string | undefined = undefined;
	export let modifiedTime: string | undefined = undefined;
	export let author: string | undefined = undefined;
	export let section: string | undefined = undefined;
	export let tags: string[] = [];
	export let noIndex: boolean = false;
	export let jsonLd: object[] = [];

	$: data = seoData[lang];
	$: finalTitle = title || data.title;
	$: finalDescription = description || data.description;
	$: finalKeywords = keywords || data.keywords;
	$: canonical = `${SITE.url}${path}`;
	$: ogLocale = data.ogLocale;
	$: finalImageAlt = imageAlt || finalTitle;

	$: hreflangAlternates = [
		{ lang: 'fr-CA', url: `${SITE.url}${path}` },
		{ lang: 'en-CA', url: `${SITE.url}${path}?lang=en` },
		{ lang: 'es', url: `${SITE.url}${path}?lang=es` },
		{ lang: 'x-default', url: `${SITE.url}${path}` }
	];
</script>

<svelte:head>
	<title>{finalTitle}</title>
	<meta name="description" content={finalDescription} />
	<meta name="keywords" content={finalKeywords} />
	<link rel="canonical" href={canonical} />

	<!-- Semantic Topic / Subject -->
	<meta name="subject" content="Excavation and French Drain Services" />
	<meta name="topic" content="Construction, Excavation, Fondation" />
	<meta name="summary" content={finalDescription} />

	<!-- Robots -->
	{#if noIndex}
		<meta name="robots" content="noindex, nofollow" />
	{:else}
		<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
		<meta name="googlebot" content="index, follow, max-image-preview:large" />
	{/if}

	<!-- Hreflang -->
	{#each hreflangAlternates as alt}
		<link rel="alternate" hreflang={alt.lang} href={alt.url} />
	{/each}

	<!-- Open Graph -->
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content={SITE.name} />
	<meta property="og:title" content={finalTitle} />
	<meta property="og:description" content={finalDescription} />
	<meta property="og:url" content={canonical} />
	<meta property="og:image" content={image} />
	<meta property="og:image:secure_url" content={image} />
	<meta property="og:image:type" content="image/jpeg" />
	<meta property="og:image:width" content="1200" />
	<meta property="og:image:height" content="630" />
	<meta property="og:image:alt" content={finalImageAlt} />
	<meta property="og:locale" content={ogLocale} />
	<meta property="og:locale:alternate" content="fr_CA" />
	<meta property="og:locale:alternate" content="en_CA" />
	<meta property="og:locale:alternate" content="es_ES" />

	<!-- Article-specific -->
	{#if type === 'article'}
		{#if publishedTime}
			<meta property="article:published_time" content={publishedTime} />
		{/if}
		{#if modifiedTime}
			<meta property="article:modified_time" content={modifiedTime} />
		{/if}
		{#if author}
			<meta property="article:author" content={author} />
		{/if}
		{#if section}
			<meta property="article:section" content={section} />
		{/if}
		{#each tags as tag}
			<meta property="article:tag" content={tag} />
		{/each}
	{/if}

	<!-- Twitter Card -->
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@excavationserable" />
	<meta name="twitter:creator" content="@excavationserable" />
	<meta name="twitter:title" content={finalTitle} />
	<meta name="twitter:description" content={finalDescription} />
	<meta name="twitter:image" content={image} />
	<meta name="twitter:image:alt" content={finalImageAlt} />

	<!-- Mobile / App -->
	<meta name="apple-mobile-web-app-capable" content="yes" />
	<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
	<meta name="apple-mobile-web-app-title" content={SITE.name} />
	<meta name="application-name" content={SITE.name} />
	<meta name="msapplication-TileColor" content="#febd17" />

	<!-- Verification (placeholders - set when you have them) -->
	<!-- <meta name="google-site-verification" content="..." /> -->
	<!-- <meta name="msvalidate.01" content="..." /> -->

	<!-- JSON-LD Structured Data -->
	{#each jsonLd as schema}
		{@html `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</` + `script>`}
	{/each}
</svelte:head>

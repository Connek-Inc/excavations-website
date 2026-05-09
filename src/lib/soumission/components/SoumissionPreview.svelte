<script lang="ts">
	import {
		COMPANY,
		calcTotals,
		fmtMoney,
		articleTotal,
		articlesSubtotal
	} from '$lib/soumission/company';
	import { SECTION_ORDER, getSectionText } from '$lib/soumission/default-sections';
	import type { Modalite, Article, SectionsMap, Statut } from '$lib/soumission/types';
	import SignatureBlock from './SignatureBlock.svelte';
	import { createEventDispatcher } from 'svelte';

	export let s: {
		id?: number;
		token?: string;
		numero?: string | null;
		statut: Statut;
		clientNom?: string | null;
		clientAdresse?: string | null;
		projetAdresse?: string | null;
		dateSoumission?: string | Date | null;
		notes?: string | null;
		sousTotal?: string | number | null;
		modalites?: Modalite[] | null;
		articles?: Article[] | null;
		sections?: SectionsMap | null;
		entrepreneurNom?: string | null;
		entrepreneurSignature?: string | null;
		entrepreneurSignedAt?: string | Date | null;
		clientSignataireNom?: string | null;
		clientSignature?: string | null;
		clientSignedAt?: string | Date | null;
		sentAt?: string | Date | null;
	};
	export let signableRoles: ('client' | 'entrepreneur')[] = [];
	export let signEndpoint: string | null = null;

	const dispatch = createEventDispatcher<{ signed: { role: 'client' | 'entrepreneur' } }>();

	$: modalites = (s.modalites ?? []) as Modalite[];
	$: articles = (s.articles ?? []) as Article[];
	$: sectionsMap = (s.sections ?? {}) as SectionsMap;
	$: totalsFinal =
		articles.length > 0
			? calcTotals(articlesSubtotal(articles))
			: calcTotals(Number(s.sousTotal ?? 0));

	function dateLabel(d: string | Date | null | undefined): string {
		if (!d) return '—';
		const dt = typeof d === 'string' ? new Date(d) : d;
		if (isNaN(dt.getTime())) return String(d);
		return dt.toLocaleDateString('fr-CA', { year: 'numeric', month: 'long', day: 'numeric' });
	}
</script>

<div class="mx-auto max-w-3xl rounded-lg border border-gray-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-4 sm:p-8 shadow-sm">
	<header class="-mx-4 -mt-4 mb-6 bg-zinc-900 px-4 py-5 text-white sm:-mx-8 sm:-mt-8 sm:px-8 rounded-t-lg">
		<div class="flex items-end justify-between gap-4">
			<div>
				<div class="text-2xl font-black tracking-tight text-[#febd17]">
					{COMPANY.name.toUpperCase()}
				</div>
				<div class="mt-1 text-xs opacity-80">RBQ {COMPANY.rbq} • NEQ {COMPANY.neq}</div>
				<div class="text-xs opacity-80">{COMPANY.phone} • {COMPANY.website}</div>
			</div>
			<div class="flex h-14 w-14 items-center justify-center rounded-md bg-[#febd17] text-2xl font-black text-black">
				ME
			</div>
		</div>
	</header>

	<h1 class="text-3xl font-bold">SOUMISSION-CONTRAT</h1>
	{#if s.numero}
		<div class="text-sm text-gray-500 dark:text-zinc-400">N° {s.numero}</div>
	{/if}

	<div class="mt-6 grid gap-4 rounded-md border border-gray-200 dark:border-zinc-800 bg-gray-50 dark:bg-zinc-900/40 p-4 sm:grid-cols-3">
		<div>
			<div class="text-xs font-bold uppercase text-gray-500 dark:text-zinc-400">Client</div>
			<div class="font-semibold">{s.clientNom || '—'}</div>
			<div class="whitespace-pre-line text-xs text-gray-500 dark:text-zinc-400">{s.clientAdresse ?? ''}</div>
		</div>
		<div>
			<div class="text-xs font-bold uppercase text-gray-500 dark:text-zinc-400">Adresse du projet</div>
			<div class="whitespace-pre-line text-sm">{s.projetAdresse || '—'}</div>
		</div>
		<div>
			<div class="text-xs font-bold uppercase text-gray-500 dark:text-zinc-400">Date</div>
			<div class="text-sm">{dateLabel(s.dateSoumission)}</div>
		</div>
	</div>

	<div class="mt-6 space-y-5">
		{#each SECTION_ORDER as sec (sec.key)}
			{@const isPrimary = sec.key === 'travaux' || sec.key === 'prix'}
			<section
				class={isPrimary
					? 'space-y-3 rounded-md border-2 border-[#febd17]/40 bg-[#febd17]/5 p-3 sm:p-4'
					: 'space-y-1'}
			>
				<h3
					class={isPrimary
						? 'border-l-[6px] border-[#febd17] pl-3 text-xl sm:text-2xl font-extrabold tracking-tight'
						: 'border-l-2 border-[#febd17]/60 pl-2 text-[11px] sm:text-sm font-semibold'}
				>
					{sec.num}. {sec.title}
				</h3>
				<div
					class={isPrimary
						? 'text-sm sm:text-base leading-relaxed'
						: 'text-[11px] sm:text-xs leading-snug text-gray-700 dark:text-zinc-300'}
				>
					<p class="whitespace-pre-line">{getSectionText(sectionsMap, sec.key)}</p>
					{#if sec.key === 'modalites' && modalites.length > 0}
						<ul class="mt-2 list-disc space-y-1 pl-5">
							{#each modalites as m}
								<li>
									<strong>{m.pourcentage}%</strong> — {m.label} :
									<span class="font-medium">{fmtMoney((totalsFinal.total * m.pourcentage) / 100)}</span>
								</li>
							{/each}
						</ul>
					{/if}
				</div>
			</section>
		{/each}

		{#if articles.length > 0}
			<section class="space-y-1">
				<h3 class="border-l-2 border-[#febd17]/60 pl-2 text-sm font-semibold">
					Détail des articles / propriétés
				</h3>
				<div class="overflow-hidden rounded-md border border-gray-200 dark:border-zinc-800">
					<div class="grid grid-cols-12 bg-zinc-900 px-3 py-2 text-xs font-bold uppercase text-[#febd17]">
						<div class="col-span-7">Description</div>
						<div class="col-span-1 text-right">Qté</div>
						<div class="col-span-2 text-right">Prix unit.</div>
						<div class="col-span-2 text-right">Total</div>
					</div>
					{#each articles as a}
						<div class="grid grid-cols-12 border-t border-gray-200 dark:border-zinc-800 px-3 py-2 text-sm">
							<div class="col-span-7 whitespace-pre-line">{a.description || '—'}</div>
							<div class="col-span-1 text-right">{a.quantite}</div>
							<div class="col-span-2 text-right">{fmtMoney(Number(a.prix_unitaire) || 0)}</div>
							<div class="col-span-2 text-right font-semibold">
								{fmtMoney(articleTotal(a))}
							</div>
						</div>
					{/each}
				</div>
			</section>
		{/if}

		<section class="space-y-1">
			<h3 class="border-l-2 border-[#febd17]/60 pl-2 text-sm font-semibold">Détail des coûts</h3>
			<div class="overflow-hidden rounded-md border border-gray-200 dark:border-zinc-800">
				<div class="flex justify-between px-4 py-2"><span>Sous-total</span><span>{fmtMoney(totalsFinal.sousTotal)}</span></div>
				<div class="flex justify-between border-t border-gray-200 dark:border-zinc-800 px-4 py-2 text-gray-500 dark:text-zinc-400"><span>TPS (5 %)</span><span>{fmtMoney(totalsFinal.tps)}</span></div>
				<div class="flex justify-between border-t border-gray-200 dark:border-zinc-800 px-4 py-2 text-gray-500 dark:text-zinc-400"><span>TVQ (9,975 %)</span><span>{fmtMoney(totalsFinal.tvq)}</span></div>
				<div class="flex justify-between border-t border-gray-200 dark:border-zinc-800 bg-[#febd17] px-4 py-2 font-bold text-black"><span>TOTAL</span><span>{fmtMoney(totalsFinal.total)}</span></div>
			</div>
		</section>

		{#if s.notes?.trim()}
			<section class="space-y-1">
				<h3 class="border-l-2 border-[#febd17]/60 pl-2 text-sm font-semibold">
					Notes supplémentaires
				</h3>
				<p class="text-sm whitespace-pre-line">{s.notes}</p>
			</section>
		{/if}

		<section class="space-y-3 rounded-md border-2 border-[#febd17]/40 bg-[#febd17]/5 p-3 sm:p-4">
			<h3 class="border-l-[6px] border-[#febd17] pl-3 text-xl font-extrabold tracking-tight">
				12. Signatures
			</h3>
			<div class="grid gap-6 sm:grid-cols-2">
				<SignatureBlock
					role="entrepreneur"
					label="Entrepreneur"
					defaultName={s.entrepreneurNom || `${COMPANY.dirigeant} — ${COMPANY.titre}`}
					caption={COMPANY.name}
					imageUrl={s.entrepreneurSignature}
					signedAt={s.entrepreneurSignedAt}
					signable={signableRoles.includes('entrepreneur') && !!signEndpoint}
					{signEndpoint}
					parent={s}
					on:signed={(e) => dispatch('signed', e.detail)}
				/>
				<SignatureBlock
					role="client"
					label="Client"
					defaultName={s.clientSignataireNom || s.clientNom || ''}
					caption="Signature"
					imageUrl={s.clientSignature}
					signedAt={s.clientSignedAt}
					signable={signableRoles.includes('client') && !!signEndpoint}
					{signEndpoint}
					parent={s}
					on:signed={(e) => dispatch('signed', e.detail)}
				/>
			</div>
		</section>
	</div>
</div>

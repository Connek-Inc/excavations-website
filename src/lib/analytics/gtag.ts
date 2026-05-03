// Google Ads + Analytics centralized helper
// Account: AW-18036493782 (Google Ads)
// Add G-XXXXXXX (GA4) when available — config in app.html

export const GOOGLE_ADS_ID = 'AW-18036493782';

// IMPORTANT: Replace this with the real conversion send_to from Google Ads
// (Google Ads → Goals → Conversions → "Contact" → Tag setup → event snippet)
// It looks like: 'AW-18036493782/AbCdEfGhIjK_LmNoPqR'
export const CONTACT_CONVERSION_ID: string = 'AW-18036493782/1_cdCLOF6qUcENabvJhD';

declare global {
	interface Window {
		gtag?: (...args: any[]) => void;
		dataLayer?: any[];
	}
}

function safeGtag(...args: any[]) {
	if (typeof window === 'undefined') return;
	if (typeof window.gtag !== 'function') return;
	try {
		window.gtag(...args);
	} catch (e) {
		console.warn('[gtag] failed', e);
	}
}

/** Track a generic event */
export function trackEvent(name: string, params: Record<string, any> = {}) {
	safeGtag('event', name, params);
}

/** Track a click on phone number — useful for call-tracking */
export function trackPhoneClick(phone: string, location: string = 'unknown') {
	trackEvent('phone_click', {
		phone_number: phone,
		click_location: location,
		event_category: 'engagement',
		event_label: location
	});
}

/** Track a click on WhatsApp */
export function trackWhatsAppClick(location: string = 'unknown') {
	trackEvent('whatsapp_click', {
		click_location: location,
		event_category: 'engagement',
		event_label: location
	});
}

/** Track click on a CTA button (Soumission gratuite, Inspection, etc) */
export function trackCTAClick(label: string, location: string = 'unknown') {
	trackEvent('cta_click', {
		cta_label: label,
		click_location: location,
		event_category: 'engagement',
		event_label: `${label} — ${location}`
	});
}

/** Track form submission as a CONVERSION (this is the one Google Ads is waiting for) */
export function trackContactFormSubmit(
	opts: { value?: number; currency?: string; serviceType?: string; lang?: string } = {}
) {
	const { value = 1.0, currency = 'CAD', serviceType, lang } = opts;

	// 1. Standard GA4 event
	trackEvent('generate_lead', {
		value,
		currency,
		service_type: serviceType,
		language: lang
	});

	// 2. Google Ads conversion (the "Contact" conversion that's waiting for verification)
	safeGtag('event', 'conversion', {
		send_to: CONTACT_CONVERSION_ID,
		value,
		currency,
		event_callback: () => {
			console.debug('[gtag] Contact conversion fired');
		}
	});
}

/** Track exit-intent modal shown */
export function trackExitIntent() {
	trackEvent('exit_intent_shown', {
		event_category: 'engagement'
	});
}

/** Update consent (call when user accepts/denies cookies) */
export function updateConsent(granted: boolean) {
	const state = granted ? 'granted' : 'denied';
	safeGtag('consent', 'update', {
		ad_storage: state,
		ad_user_data: state,
		ad_personalization: state,
		analytics_storage: state
	});
	if (typeof window !== 'undefined') {
		try {
			localStorage.setItem('mi_consent', state);
		} catch {}
	}
}

/** Read previously stored consent */
export function getStoredConsent(): 'granted' | 'denied' | null {
	if (typeof window === 'undefined') return null;
	try {
		return (localStorage.getItem('mi_consent') as 'granted' | 'denied') || null;
	} catch {
		return null;
	}
}

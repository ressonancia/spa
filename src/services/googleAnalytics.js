const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
let isInitialized = false

const attributionQueryParameters = /^(utm_[a-z0-9_]+|gclid|dclid|gbraid|wbraid)$/i

export function initializeGoogleAnalytics() {
  if (!measurementId || typeof window === 'undefined' || isInitialized) {
    return
  }

  window.dataLayer = window.dataLayer || []
  window.gtag = window.gtag || function () {
    window.dataLayer.push(arguments)
  }

  if (!document.getElementById('google-analytics-tag')) {
    const script = document.createElement('script')
    script.id = 'google-analytics-tag'
    script.async = true
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`
    document.head.appendChild(script)
  }

  window.gtag('js', new Date())
  // Keep GA4 from collecting unsanitized URLs before the router can report a view.
  // The cookie_domain default is "auto", so GA4 shares its first-party cookie across
  // ressonance.com and app.ressonance.com without cross-domain linker configuration.
  window.gtag('config', measurementId, { send_page_view: false })
  isInitialized = true
}

export function trackPageView(route) {
  if (!isInitialized || typeof window === 'undefined') {
    return
  }

  const safeQuery = new URLSearchParams()
  for (const [key, value] of new URLSearchParams(window.location.search)) {
    if (attributionQueryParameters.test(key)) {
      safeQuery.append(key, value)
    }
  }

  const queryString = safeQuery.toString()
  // Use the route pattern (for example, /dashboard/:project/stats) instead of
  // concrete dynamic segments that could contain a user's data.
  const routePath = route.matched?.at(-1)?.path || `/${route.name || 'unknown'}`
  const pageLocation = `${window.location.origin}${routePath}${queryString ? `?${queryString}` : ''}`

  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: pageLocation,
  })
}

export function trackSignUp(method) {
  if (!isInitialized || typeof window === 'undefined') {
    return
  }

  window.gtag('event', 'sign_up', { method })
}

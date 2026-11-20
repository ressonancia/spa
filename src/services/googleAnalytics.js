const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
const googleAdsId = import.meta.env.VITE_GOOGLE_ADS_ID
let isInitialized = false

const attributionQueryParameters = /^(utm_[a-z0-9_]+|gclid|dclid|gbraid|wbraid|_gl)$/i
const crossDomainLinkerConfig = {
  domains: ['ressonance.com', 'app.ressonance.com'],
}

export function initializeGoogleAnalytics() {
  if ((!measurementId && !googleAdsId) || typeof window === 'undefined' || isInitialized) {
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
    const tagId = measurementId || googleAdsId
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(tagId)}`
    document.head.appendChild(script)
  }

  window.gtag('js', new Date())
  window.gtag('set', 'linker', crossDomainLinkerConfig)
  if (measurementId) {
    window.gtag('config', measurementId, {
      send_page_view: false,
      linker: crossDomainLinkerConfig,
    })
  }
  if (googleAdsId) {
    window.gtag('config', googleAdsId, {
      send_page_view: false,
      linker: crossDomainLinkerConfig,
    })
  }
  isInitialized = true
}

export function trackPageView(route) {
  if (!measurementId || !isInitialized || typeof window === 'undefined') {
    return
  }

  const safeQuery = new URLSearchParams()
  for (const [key, value] of new URLSearchParams(window.location.search)) {
    if (attributionQueryParameters.test(key)) {
      safeQuery.append(key, value)
    }
  }

  const queryString = safeQuery.toString()
  const routePath = route.matched?.at(-1)?.path || `/${route.name || 'unknown'}`
  const pageLocation = `${window.location.origin}${routePath}${queryString ? `?${queryString}` : ''}`

  window.gtag('event', 'page_view', {
    page_title: document.title,
    page_location: pageLocation,
  })
}

export function trackSignUp(method) {
  if (!measurementId || !isInitialized || typeof window === 'undefined') {
    return
  }

  window.gtag('event', 'sign_up', { method })
}

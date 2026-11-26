export const donationApiUrl = import.meta.env.VITE_DONATION_API_URL ||
  (import.meta.env.DEV ? '/api/donations' : undefined)

export const supportersApiUrl = donationApiUrl?.replace(/\/donations\/?$/, '/supporters')

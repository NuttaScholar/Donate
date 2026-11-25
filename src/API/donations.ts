export type DonationSubmission = {
  donorName: string
  amount: number
  message: string
  slip: File
}

const donationApiUrl = import.meta.env.VITE_DONATION_API_URL ||
  (import.meta.env.DEV ? '/api/donations' : undefined)

export function isDonationApiConfigured(): boolean {
  return Boolean(donationApiUrl)
}

export async function submitDonation(submission: DonationSubmission): Promise<void> {
  if (!donationApiUrl) throw new Error('Donation API URL is not configured')

  const body = new FormData()
  body.append('donorName', submission.donorName)
  body.append('amount', String(submission.amount))
  body.append('message', submission.message)
  body.append('slip', submission.slip)

  const response = await fetch(donationApiUrl, { method: 'POST', body })
  if (!response.ok) throw new Error(`Donation API returned HTTP ${response.status}`)
}

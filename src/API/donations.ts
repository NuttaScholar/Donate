import type { ProjectKey } from '../config/projects'

export type DonationSubmission = {
  donorName: string
  project: ProjectKey
  message: string
  slip: File
}

const donationApiUrl = import.meta.env.VITE_DONATION_API_URL ||
  (import.meta.env.DEV ? '/api/donations' : undefined)

export class DonationApiError extends Error {
  constructor(public readonly status: number | null, message: string) {
    super(message)
    this.name = 'DonationApiError'
  }
}

function rejectionReason(status: number, apiError?: string): string {
  if (status === 400) {
    switch (apiError) {
      case 'Slip exceeds 5 MB': return 'ไฟล์สลิปมีขนาดเกิน 5 MB กรุณาเลือกไฟล์ที่เล็กลง'
      case 'Invalid upload': return 'ไฟล์ที่แนบไม่ถูกต้อง กรุณาเลือกสลิป JPG, PNG หรือ WebP'
      case 'Invalid slip image': return 'อ่านภาพสลิปไม่ได้ กรุณาเลือกภาพใหม่ที่ชัดเจน'
      case 'Invalid donation data': return 'ข้อมูลการบริจาคไม่ถูกต้อง กรุณาตรวจสอบโปรเจกต์และข้อมูลในแบบฟอร์ม'
      default: return 'ข้อมูลที่ส่งไม่ถูกต้อง กรุณาตรวจสอบแบบฟอร์มแล้วลองอีกครั้ง'
    }
  }
  if (status === 409) return 'สลิปนี้เคยใช้แจ้งบริจาคแล้ว กรุณาตรวจสอบรายการก่อนส่งซ้ำ'
  if (status === 413) return 'ไฟล์สลิปมีขนาดใหญ่เกินที่ระบบรับได้ กรุณาเลือกไฟล์ที่เล็กลง'
  if (status === 422) return 'อ่าน QR บนสลิปไม่ได้ กรุณาแนบภาพสลิปที่เห็น QR ชัดเจน'
  if (status === 429) return 'ส่งรายการบ่อยเกินไป กรุณารอสักครู่แล้วลองอีกครั้ง'
  if (status >= 500) return 'ระบบรับบริจาคขัดข้องชั่วคราว กรุณาลองใหม่ภายหลัง'
  return 'ระบบไม่รับรายการนี้ กรุณาตรวจสอบข้อมูลแล้วลองอีกครั้ง'
}

export function isDonationApiConfigured(): boolean {
  return Boolean(donationApiUrl)
}

export async function submitDonation(submission: DonationSubmission): Promise<void> {
  if (!donationApiUrl) throw new Error('Donation API URL is not configured')

  const body = new FormData()
  body.append('donorName', submission.donorName)
  body.append('project', submission.project)
  body.append('message', submission.message)
  body.append('slip', submission.slip)

  let response: Response
  try {
    response = await fetch(donationApiUrl, { method: 'POST', body })
  } catch {
    throw new DonationApiError(null, 'เชื่อมต่อระบบรับบริจาคไม่ได้ กรุณาตรวจสอบอินเทอร์เน็ตแล้วลองอีกครั้ง')
  }
  if (!response.ok) {
    const data: unknown = await response.json().catch(() => null)
    const apiError = data && typeof data === 'object' && 'error' in data && typeof data.error === 'string'
      ? data.error : undefined
    throw new DonationApiError(response.status, rejectionReason(response.status, apiError))
  }
}

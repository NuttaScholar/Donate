import { useRef, useState, type ChangeEvent, type FormEvent } from 'react'

const MAX_FILE_SIZE = 5 * 1024 * 1024
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export default function DonationDialog({ apiUrl }: { apiUrl?: string }) {
  const dialog = useRef<HTMLDialogElement>(null)
  const form = useRef<HTMLFormElement>(null)
  const [slip, setSlip] = useState<File | null>(null)
  const [fileError, setFileError] = useState('')
  const [submitError, setSubmitError] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  function close() { if (!submitting) dialog.current?.close() }

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null
    setSlip(null)
    setFileError('')
    if (!file) return
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError('รองรับไฟล์ JPG, PNG หรือ WebP เท่านั้น')
      event.target.value = ''
    } else if (file.size > MAX_FILE_SIZE) {
      setFileError('ไฟล์สลิปต้องมีขนาดไม่เกิน 5 MB')
      event.target.value = ''
    } else setSlip(file)
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!slip || !apiUrl || submitting) return
    const fields = new FormData(event.currentTarget)
    const amount = Number(fields.get('amount'))
    if (!Number.isFinite(amount) || amount <= 0) {
      setSubmitError('กรุณาระบุยอดบริจาคที่มากกว่า 0 บาท')
      return
    }
    const data = new FormData()
    data.append('donorName', String(fields.get('donorName') ?? '').trim())
    data.append('amount', String(amount))
    data.append('message', String(fields.get('message') ?? '').trim())
    data.append('slip', slip)
    setSubmitting(true)
    setSubmitError('')
    try {
      const response = await fetch(apiUrl, { method: 'POST', body: data })
      if (!response.ok) throw new Error(`HTTP ${response.status}`)
      form.current?.reset()
      setSlip(null)
      setSubmitted(true)
    } catch {
      setSubmitError('ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง หรือติดต่อผู้ดูแลเว็บ')
    } finally { setSubmitting(false) }
  }

  return <>
    <button className="button accent" type="button" onClick={() => { setSubmitError(''); dialog.current?.showModal() }}>แจ้งบริจาค / แนบสลิป <b>→</b></button>
    <dialog ref={dialog} className="donation-dialog" aria-labelledby="dialog-title" onCancel={event => { if (submitting) event.preventDefault() }} onClose={() => { setSubmitted(false); setSubmitError('') }}>
      <div className="dialog-head"><div><span className="kicker">DONATION DETAILS</span><h2 id="dialog-title">แจ้งการบริจาค</h2></div><button className="close-button" type="button" onClick={close} disabled={submitting} aria-label="ปิดหน้าต่าง">×</button></div>
      {submitted ? <div className="success-state" role="status"><span aria-hidden="true">✓</span><h3>ได้รับข้อมูลแล้ว</h3><p>ขอบคุณสำหรับการสนับสนุน เราจะตรวจสอบหลักฐานการชำระเงินอีกครั้ง</p><button className="button dark" type="button" onClick={close}>ปิดหน้าต่าง</button></div> : <form ref={form} onSubmit={submit}>
        <p className="dialog-intro">หลังโอนเงินผ่าน QR แล้ว กรุณากรอกยอดบริจาคและแนบสลิปเพื่อแจ้งรายการ</p>
        <label className="field">ชื่อที่ต้องการให้แสดง <span>(ไม่บังคับ)</span><input name="donorName" type="text" maxLength={80} placeholder="ชื่อหรือชื่อเล่น" /></label>
        <label className="field">ยอดบริจาค (บาท) <em>*</em><input name="amount" type="number" min="0.01" step="0.01" inputMode="decimal" required placeholder="เช่น 100" /></label>
        <label className="field">ข้อความติชม <span>(ไม่บังคับ)</span><textarea name="message" rows={4} maxLength={1000} placeholder="ฝากข้อความหรือข้อเสนอแนะไว้ได้เลย" /></label>
        <label className="field">แนบสลิปการชำระเงิน <em>*</em><input name="slip" type="file" accept="image/jpeg,image/png,image/webp" required onChange={selectFile} /><small>JPG, PNG หรือ WebP ขนาดไม่เกิน 5 MB</small></label>
        {slip && !fileError && <p className="selected-file">ไฟล์ที่เลือก: {slip.name}</p>}
        {fileError && <p className="form-error" role="alert">{fileError}</p>}
        {submitError && <p className="form-error" role="alert">{submitError}</p>}
        {!apiUrl && <p className="form-notice">แบบฟอร์มพร้อมใช้งานหลังตั้งค่า API บน VPS</p>}
        <div className="dialog-actions"><button type="button" className="cancel-button" onClick={close} disabled={submitting}>ยกเลิก</button><button type="submit" className="button accent" disabled={!apiUrl || submitting || !!fileError}>{submitting ? 'กำลังส่ง...' : 'ส่งข้อมูลการบริจาค'}</button></div>
        <p className="dialog-privacy">สลิปและข้อความจะถูกส่งไปยังระบบบน VPS เพื่อใช้ตรวจสอบรายการบริจาค</p>
      </form>}
    </dialog>
  </>
}

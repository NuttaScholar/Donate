import { useRef, useState, type ChangeEvent, type FormEvent } from "react";
import {
  DonationApiError,
  isDonationApiConfigured,
  submitDonation,
} from "../../API/donations";
import ActionButton from "../atoms/ActionButton";
import SectionKicker from "../atoms/SectionKicker";
import DonationForm from "../molecules/DonationForm";
import SubmissionSuccess from "../molecules/SubmissionSuccess";
import SubmissionRejection from "../molecules/SubmissionRejection";
import { isProjectKey } from "../../config/projects";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp"];

export default function DonationDialog() {
  const dialog = useRef<HTMLDialogElement>(null);
  const rejectionDialog = useRef<HTMLDialogElement>(null);
  const form = useRef<HTMLFormElement>(null);
  const [slip, setSlip] = useState<File | null>(null);
  const [fileError, setFileError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  function close() {
    if (!submitting) dialog.current?.close();
  }

  function selectFile(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;
    setSlip(null);
    setFileError("");
    if (!file) return;
    if (!ALLOWED_TYPES.includes(file.type)) {
      setFileError("รองรับไฟล์ JPG, PNG หรือ WebP เท่านั้น");
      event.target.value = "";
    } else if (file.size > MAX_FILE_SIZE) {
      setFileError("ไฟล์สลิปต้องมีขนาดไม่เกิน 5 MB");
      event.target.value = "";
    } else setSlip(file);
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!slip || !isDonationApiConfigured() || submitting) return;
    const fields = new FormData(event.currentTarget);
    const project = fields.get("project");
    if (!isProjectKey(project)) {
      setSubmitError("กรุณาเลือกโปรเจกต์ที่ต้องการสนับสนุน");
      return;
    }
    setSubmitting(true);
    setSubmitError("");
    try {
      await submitDonation({
        donorName: String(fields.get("donorName") ?? "").trim(),
        publicName: fields.get("publicName") === "on",
        project,
        message: String(fields.get("message") ?? "").trim(),
        slip,
      });
      form.current?.reset();
      setSlip(null);
      setSubmitted(true);
    } catch (error) {
      setRejectionReason(
        error instanceof DonationApiError
          ? error.message
          : "ส่งข้อมูลไม่สำเร็จ กรุณาลองอีกครั้ง หรือติดต่อผู้ดูแลเว็บ",
      );
      rejectionDialog.current?.showModal();
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <ActionButton
        type="button"
        onClick={() => {
          setSubmitError("");
          dialog.current?.showModal();
        }}
      >
        แจ้งบริจาค / แนบสลิป <b>→</b>
      </ActionButton>
      <dialog
        ref={dialog}
        className="donation-dialog"
        aria-labelledby="dialog-title"
        onCancel={(event) => {
          if (submitting) event.preventDefault();
        }}
        onClose={() => {
          setSubmitted(false);
          setSubmitError("");
        }}
      >
        <div className="dialog-head">
          <div>
            <SectionKicker>DONATION DETAILS</SectionKicker>
            <h2 id="dialog-title">แจ้งการบริจาค</h2>
          </div>
          <button
            className="close-button"
            type="button"
            onClick={close}
            disabled={submitting}
            aria-label="ปิดหน้าต่าง"
          >
            ×
          </button>
        </div>
        {!submitted && <p className="name-warning">กรุณาอย่าใช้ชื่อที่มีคำหยาบหรือดูหมิ่นผู้อื่น หากพบชื่อที่ไม่เหมาะสม ผู้ดูแลจะซ่อนชื่อจากรายชื่อผู้สนับสนุน</p>}
        {submitted ? (
          <SubmissionSuccess onClose={close} />
        ) : (
          <DonationForm
            formRef={form}
            onSubmit={submit}
            onFileChange={selectFile}
            onCancel={close}
            slip={slip}
            fileError={fileError}
            submitError={submitError}
            submitting={submitting}
            apiConfigured={isDonationApiConfigured()}
          />
        )}
      </dialog>
      <SubmissionRejection
        dialogRef={rejectionDialog}
        reason={rejectionReason}
      />
    </>
  );
}

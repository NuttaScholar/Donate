import type { RefObject } from "react";
import ActionButton from "../atoms/ActionButton";

type Props = { dialogRef: RefObject<HTMLDialogElement | null>; reason: string };

export default function SubmissionRejection({ dialogRef, reason }: Props) {
  return (
    <dialog
      ref={dialogRef}
      className="rejection-dialog"
      aria-labelledby="rejection-title"
      aria-describedby="rejection-description"
    >
      <div className="rejection-icon" aria-hidden="true">
        !
      </div>
      <h2 id="rejection-title">แจ้งบริจาคไม่สำเร็จ</h2>
      <p id="rejection-description">{reason}</p>
      <p className="rejection-hint">
        ข้อมูลที่กรอกยังอยู่ในแบบฟอร์ม คุณสามารถแก้ไขแล้วส่งอีกครั้ง
      </p>
      <ActionButton
        variant="dark"
        type="button"
        onClick={() => dialogRef.current?.close()}
      >
        กลับไปแก้ไข
      </ActionButton>
    </dialog>
  );
}

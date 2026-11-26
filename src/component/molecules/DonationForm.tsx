import type { ChangeEvent, FormEvent, RefObject } from "react";
import ActionButton from "../atoms/ActionButton";
import { projectOptions } from "../../config/projects";
import ProjectSelect from "./ProjectSelect";

type Props = {
  formRef: RefObject<HTMLFormElement | null>;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onCancel: () => void;
  slip: File | null;
  fileError: string;
  submitError: string;
  submitting: boolean;
  apiConfigured: boolean;
};

export default function DonationForm({
  formRef,
  onSubmit,
  onFileChange,
  onCancel,
  slip,
  fileError,
  submitError,
  submitting,
  apiConfigured,
}: Props) {
  return (
    <form ref={formRef} onSubmit={onSubmit}>
      <p className="dialog-intro">
        หลังโอนเงินผ่าน QR แล้ว กรุณาเลือกโปรเจกต์และแนบสลิปเพื่อแจ้งรายการ
        แอดมินจะตรวจสอบยอดจากสลิป
      </p>
      <label className="field">
        ชื่อที่ต้องการให้แสดง <span>(ไม่บังคับ)</span>
        <input
          name="donorName"
          type="text"
          maxLength={80}
          placeholder="ชื่อหรือชื่อเล่น"
        />
        <small>ชื่อนี้จะแสดงพร้อมยอดสะสมและโปรเจกต์ในส่วนขอบคุณผู้สนับสนุน หลังแอดมินตรวจสอบยอดแล้ว หากไม่ต้องการแสดงชื่อ เว้นว่างไว้ได้</small>
      </label>
      <label className="public-name-option"><input name="publicName" type="checkbox" /> แสดงชื่อและยอดสะสมในส่วนขอบคุณผู้สนับสนุน</label>
      <ProjectSelect options={projectOptions} />
      <label className="field">
        ข้อความติชม <span>(ไม่บังคับ)</span>
        <textarea
          name="message"
          rows={4}
          maxLength={1000}
          placeholder="ฝากข้อความหรือข้อเสนอแนะไว้ได้เลย"
        />
      </label>
      <label className="field">
        แนบสลิปการชำระเงิน <em>*</em>
        <input
          name="slip"
          type="file"
          accept="image/jpeg,image/png,image/webp"
          required
          onChange={onFileChange}
        />
        <small>JPG, PNG หรือ WebP ขนาดไม่เกิน 5 MB</small>
      </label>
      {slip && !fileError && (
        <p className="selected-file">ไฟล์ที่เลือก: {slip.name}</p>
      )}
      {fileError && (
        <p className="form-error" role="alert">
          {fileError}
        </p>
      )}
      {submitError && (
        <p className="form-error" role="alert">
          {submitError}
        </p>
      )}
      {!apiConfigured && (
        <p className="form-notice">แบบฟอร์มพร้อมใช้งานหลังตั้งค่า API บน VPS</p>
      )}
      <div className="dialog-actions">
        <button
          type="button"
          className="cancel-button"
          onClick={onCancel}
          disabled={submitting}
        >
          ยกเลิก
        </button>
        <ActionButton
          type="submit"
          disabled={!apiConfigured || submitting || !!fileError}
        >
          {submitting ? "กำลังส่ง..." : "ส่งข้อมูลการบริจาค"}
        </ActionButton>
      </div>
      <p className="dialog-privacy">
        สลิปและข้อความจะถูกส่งไปยังระบบบน VPS เพื่อใช้ตรวจสอบรายการบริจาค
      </p>
    </form>
  );
}

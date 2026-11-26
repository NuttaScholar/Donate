import ActionButton from "../atoms/ActionButton";

export default function SubmissionSuccess({
  onClose,
}: {
  onClose: () => void;
}) {
  return (
    <div className="success-state" role="status">
      <span aria-hidden="true">✓</span>
      <h3>ได้รับข้อมูลแล้ว</h3>
      <p>ขอบคุณสำหรับการสนับสนุน เราจะตรวจสอบหลักฐานการชำระเงินอีกครั้ง</p>
      <ActionButton variant="dark" type="button" onClick={onClose}>
        ปิดหน้าต่าง
      </ActionButton>
    </div>
  );
}

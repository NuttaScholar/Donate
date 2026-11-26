const qrUrl =
  import.meta.env.VITE_DONATION_QR_URL ||
  `${import.meta.env.BASE_URL}qr/ReceiveMoney_QR.png`;
const accountName = import.meta.env.VITE_ACCOUNT_NAME;

export default function QrDisplay() {
  return (
    <>
      <div className="qr-box">
        {qrUrl ? (
          <img
            src={qrUrl}
            alt="QR code สำหรับบริจาค กรุณาตรวจสอบชื่อบัญชีก่อนโอน"
          />
        ) : (
          <div className="placeholder">
            <span>▦</span>
            <strong>พื้นที่สำหรับ QR code</strong>
            <small>ยังไม่ได้ตั้งค่าข้อมูลรับบริจาค</small>
          </div>
        )}
      </div>
      {accountName && (
        <p className="account">
          ชื่อบัญชี: <strong>{accountName}</strong>
        </p>
      )}
      <p className="note">กรุณาตรวจสอบชื่อบัญชีในแอปธนาคารก่อนยืนยันการโอน</p>
    </>
  );
}

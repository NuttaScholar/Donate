const qrUrl = `${import.meta.env.BASE_URL}qr/ReceiveMoney_QR.png`;
const accountName = import.meta.env.VITE_ACCOUNT_NAME;

export default function QrDisplay() {
  return (
    <>
      <div className="qr-box">
        <img
          src={qrUrl}
          alt="QR code สำหรับบริจาค กรุณาตรวจสอบชื่อบัญชีก่อนโอน"
        />
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

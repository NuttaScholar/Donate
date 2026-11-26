import SectionKicker from "../atoms/SectionKicker";
import QrDisplay from "../molecules/QrDisplay";
import DonationDialog from "./DonationDialog";

export default function DonateSection() {
  return (
    <section className="donate" id="donate">
      <div className="donate-copy">
        <SectionKicker>02 / SAY HELLO</SectionKicker>
        <h2>
          ร่วมเป็นส่วนหนึ่ง
          <br />
          ของเรื่องราวนี้
        </h2>
        <p>เลือกสนับสนุนตามกำลังที่สะดวก ทุกยอดมีความหมาย ขอบคุณจากใจครับ</p>
      </div>
      <div className="donate-card">
        <div className="card-head">
          <strong>ช่องทางสนับสนุน</strong>
          <span>PROMPTPAY / QR</span>
        </div>
        <QrDisplay />
        <DonationDialog />
        <small className="privacy">
          ข้อมูลการแจ้งบริจาคจะส่งไปยังระบบบนเซิร์ฟเวอร์ที่แยกจาก GitHub Pages
        </small>
      </div>
    </section>
  );
}

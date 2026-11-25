import DonationDialog from './DonationDialog'

const qrUrl =
  import.meta.env.VITE_DONATION_QR_URL ||
  `${import.meta.env.BASE_URL}qr/ReceiveMoney_QR.png`;
const accountName = import.meta.env.VITE_ACCOUNT_NAME;

function App() {
  return (
    <div className="site">
      <header>
        <a className="brand" href="#top">
          <span className="mark">N</span>NuttaScholar
          <span className="dot">.</span>
        </a>
        <nav>
          <a href="#about">เกี่ยวกับ</a>
          <a href="#donate">ร่วมสนับสนุน</a>
          <a
            className="nav-github"
            href="https://github.com/NuttaScholar"
            target="_blank"
            rel="noreferrer"
          >
            GitHub ↗
          </a>
        </nav>
      </header>
      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow">
              <i /> OPEN FOR SUPPORT
            </div>
            <h1>
              ทุกการสนับสนุน
              <br />
              ช่วยให้<span>ไอเดีย</span>
              <br />
              เติบโตต่อไป
            </h1>
            <p>
              ขอบคุณที่แวะมา ผลงานและสิ่งที่เรียนรู้ถูกแบ่งปันไว้บน GitHub
              หากคุณชอบสิ่งที่ทำและอยากเป็นส่วนหนึ่งของการเดินทางนี้
              สามารถร่วมสนับสนุนได้ที่นี่
            </p>
            <div className="actions">
              <a className="button dark" href="#donate">
                ร่วมสนับสนุน <b>→</b>
              </a>
              <a
                className="text-link"
                href="https://github.com/NuttaScholar"
                target="_blank"
                rel="noreferrer"
              >
                ดูผลงานบน GitHub ↗
              </a>
            </div>
          </div>
          <div className="art" aria-hidden="true">
            <div className="orbit one" />
            <div className="orbit two" />
            <div className="art-card">
              <span className="spark">✳</span>
              <strong>&lt;/&gt;</strong>
              <small>keep creating</small>
            </div>
            <span className="star">✦</span>
          </div>
        </section>
        <section className="about" id="about">
          <div>
            <span className="kicker">01 / THE WHY</span>
            <h2>
              สร้าง เรียนรู้
              <br />
              และแบ่งปัน
            </h2>
          </div>
          <p>
            การสนับสนุนของคุณช่วยให้มีเวลาและทรัพยากรสำหรับพัฒนาโปรเจกต์
            ทดลองแนวคิดใหม่ ๆ และแบ่งปันสิ่งที่ได้เรียนรู้ต่อไป
          </p>
        </section>
        <section className="donate" id="donate">
          <div className="donate-copy">
            <span className="kicker">02 / SAY HELLO</span>
            <h2>
              ร่วมเป็นส่วนหนึ่ง
              <br />
              ของเรื่องราวนี้
            </h2>
            <p>
              เลือกสนับสนุนตามกำลังที่สะดวก ทุกยอดมีความหมาย ขอบคุณจากใจครับ
            </p>
          </div>
          <div className="donate-card">
            <div className="card-head">
              <strong>ช่องทางสนับสนุน</strong>
              <span>PROMPTPAY / QR</span>
            </div>
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
            <p className="note">
              กรุณาตรวจสอบชื่อบัญชีในแอปธนาคารก่อนยืนยันการโอน
            </p>
            <DonationDialog />
            <small className="privacy">
              ข้อมูลการแจ้งบริจาคจะส่งไปยังระบบบนเซิร์ฟเวอร์ที่แยกจาก GitHub
              Pages
            </small>
          </div>
        </section>
      </main>
      <footer>
        <span>© {new Date().getFullYear()} NuttaScholar</span>
        <span>Made with care · Hosted on GitHub Pages</span>
        <a
          href="https://github.com/NuttaScholar"
          target="_blank"
          rel="noreferrer"
        >
          GitHub ↗
        </a>
      </footer>
    </div>
  );
}
export default App;

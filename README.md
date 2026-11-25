# Donate

หน้า Donate ด้วย React + TypeScript + Vite สำหรับ GitHub Pages โดยให้การแจ้งบริจาคและการเก็บสลิปอยู่บน VPS

## พัฒนาในเครื่อง

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

ตรวจ TypeScript ด้วย `npm run typecheck` และสร้างไฟล์เผยแพร่ด้วย `npm run build`

หน้าเว็บใช้รูป QR ที่ `public/qr/ReceiveMoney_QR.png` โดยอัตโนมัติ แก้ `.env.local` เพื่อใส่ชื่อบัญชีและ URL API บน VPS (HTTPS) หากต้องการใช้รูป QR จาก URL อื่น สามารถตั้ง `VITE_DONATION_QR_URL` เพื่อแทนค่าเริ่มต้นได้

ปุ่มแจ้งบริจาคเปิด Dialog สำหรับกรอกชื่อ (ไม่บังคับ), ยอดบริจาค, ข้อความติชม และแนบสลิป JPG/PNG/WebP ขนาดไม่เกิน 5 MB ปุ่มส่งจะเปิดเมื่อกำหนด `VITE_DONATION_API_URL` เท่านั้น โดยส่ง `POST multipart/form-data` ไปยัง URL นี้ พร้อมฟิลด์ `donorName`, `amount`, `message`, `slip` ฝั่ง API ต้องตรวจสอบข้อมูลและไฟล์ซ้ำ จำกัดอัตราคำขอ และอนุญาต CORS จากโดเมนหน้าเว็บ


## เผยแพร่

1. Push โค้ดไปที่ repository `NuttaScholar/Donate` บน branch `main`
2. เข้า **Settings → Pages → Build and deployment → Source** แล้วเลือก **GitHub Actions**
3. ใน **Settings → Secrets and variables → Actions → Variables** ตั้ง `ACCOUNT_NAME` และ `DONATION_API_URL` ส่วน `DONATION_QR_URL` ใช้เฉพาะเมื่อต้องการใช้รูปอื่นแทนไฟล์ในโปรเจกต์
4. Workflow จะเผยแพร่ที่ `https://nuttascholar.github.io/Donate/`

หากเปลี่ยนชื่อ repository หรือใช้โดเมนส่วนตัว ให้แก้ `base` ใน `vite.config.ts` ให้ตรงกับ path ของเว็บ

ค่าที่ขึ้นต้นด้วย `VITE_` จะถูกฝังในหน้าเว็บและทุกคนมองเห็นได้ ห้ามใส่ API key, รหัสผ่าน หรือข้อมูลส่วนบุคคล และห้ามเก็บสลิปใน repository

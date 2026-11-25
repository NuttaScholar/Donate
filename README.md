# Donate

หน้า Donate ด้วย React + TypeScript + Vite สำหรับ GitHub Pages โดยให้การแจ้งบริจาคและการเก็บสลิปอยู่บน VPS

## พัฒนาในเครื่อง

```bash
npm install
Copy-Item .env.example .env.local
npm run dev
```

ตรวจ TypeScript ด้วย `npm run typecheck` และสร้างไฟล์เผยแพร่ด้วย `npm run build`

หน้าเว็บใช้รูป QR ที่ `public/qr/ReceiveMoney_QR.png` โดยอัตโนมัติ ในเครื่อง `npm run dev` จะส่ง `/api/donations` ผ่าน Vite proxy ไปยัง Docker API ที่ `http://127.0.0.1:18080/donations` จึงทดสอบได้โดยไม่ต้องตั้ง URL เพิ่ม หากต้องการใช้รูป QR จาก URL อื่น สามารถตั้ง `VITE_DONATION_QR_URL` ได้

ปุ่มแจ้งบริจาคเปิด Dialog สำหรับกรอกชื่อ (ไม่บังคับ), ยอดบริจาค, ข้อความติชม และแนบสลิป JPG/PNG/WebP ขนาดไม่เกิน 5 MB โดยส่ง `POST multipart/form-data` พร้อมฟิลด์ `donorName`, `amount`, `message`, `slip` ไปยัง Backend API

บน GitHub Pages ต้องตั้ง `DONATION_API_URL` เป็น URL **HTTPS สาธารณะ** ที่ลงท้าย `/donations` เช่น `https://api.example.com/donations` ชื่อ Docker Compose `webdonate` และพอร์ต loopback `127.0.0.1:18080` ใช้จากเบราว์เซอร์ผู้บริจาคไม่ได้ หากยังไม่ตั้ง URL ปุ่มส่งจะปิดไว้ Backend ต้องอนุญาต CORS จาก `https://nuttascholar.github.io`


## เผยแพร่

1. Push โค้ดไปที่ repository `NuttaScholar/Donate` บน branch `main`
2. เข้า **Settings → Pages → Build and deployment → Source** แล้วเลือก **GitHub Actions**
3. ใน **Settings → Secrets and variables → Actions → Variables** ตั้ง `ACCOUNT_NAME` และ `DONATION_API_URL` ส่วน `DONATION_QR_URL` ใช้เฉพาะเมื่อต้องการใช้รูปอื่นแทนไฟล์ในโปรเจกต์
4. Workflow จะเผยแพร่ที่ `https://nuttascholar.github.io/Donate/`

หากเปลี่ยนชื่อ repository หรือใช้โดเมนส่วนตัว ให้แก้ `base` ใน `vite.config.ts` ให้ตรงกับ path ของเว็บ

ค่าที่ขึ้นต้นด้วย `VITE_` จะถูกฝังในหน้าเว็บและทุกคนมองเห็นได้ ห้ามใส่ API key, รหัสผ่าน หรือข้อมูลส่วนบุคคล และห้ามเก็บสลิปใน repository

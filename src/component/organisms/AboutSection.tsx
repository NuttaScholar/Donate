import SectionKicker from "../atoms/SectionKicker";

export default function AboutSection() {
  return (
    <section className="about" id="about">
      <div>
        <SectionKicker>01 / THE WHY</SectionKicker>
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
  );
}

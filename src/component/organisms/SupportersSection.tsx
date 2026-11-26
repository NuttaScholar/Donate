import { projectOptions } from "../../config/projects";
import SectionKicker from "../atoms/SectionKicker";
import SupporterProjectGroup from "./SupporterProjectGroup";

export default function SupportersSection() {
  return (
    <section
      className="supporters"
      id="supporters"
      aria-labelledby="supporters-title"
    >
      <div className="supporters-heading">
        <div>
          <SectionKicker>03 / OUR SUPPORTERS</SectionKicker>
          <h2 id="supporters-title">ขอบคุณผู้สนับสนุน</h2>
        </div>
        <p>
          รายชื่อและยอดสะสมที่ตรวจสอบแล้ว แยกตามโปรเจกต์และเรียงจากยอดสูงสุด
          ผู้บริจาคที่ไม่ระบุชื่อจะไม่แสดงในรายการนี้
        </p>
      </div>
      <div className="supporters-categories">
        {projectOptions.map((project) => (
          <SupporterProjectGroup key={project.value} project={project} />
        ))}
      </div>
    </section>
  );
}

import { useEffect, useState } from "react";
import {
  getSupporters,
  isSupportersApiConfigured,
  type Supporter,
} from "../../API/supporters";
import type { ProjectOption } from "../../config/projects";
import SupporterRow from "../molecules/SupporterRow";

export default function SupporterProjectGroup({
  project,
}: {
  project: ProjectOption;
}) {
  const apiConfigured = isSupportersApiConfigured();
  const [supporters, setSupporters] = useState<Supporter[]>([]);
  const [loading, setLoading] = useState(apiConfigured);
  const [error, setError] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const [nextOffset, setNextOffset] = useState(0);

  async function load(offset: number) {
    if (loading && offset > 0) return;
    setLoading(true);
    setError(false);
    try {
      const page = await getSupporters(project.value, offset);
      setSupporters((previous) =>
        offset === 0 ? page.supporters : [...previous, ...page.supporters],
      );
      setHasMore(page.hasMore);
      setNextOffset(page.nextOffset);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (apiConfigured) void load(0);
  }, [project.value, apiConfigured]);

  return (
    <div
      className="supporters-category"
      aria-labelledby={`supporters-${project.value}`}
    >
      <h3 id={`supporters-${project.value}`}>{project.label}</h3>
      <div className="supporters-panel">
        {supporters.length > 0 && (
          <ol className="supporters-list">
            {supporters.map((supporter, index) => (
              <SupporterRow
                key={`${supporter.donor_name.toLocaleLowerCase()}-${supporter.project_key}`}
                supporter={supporter}
                rank={index + 1}
              />
            ))}
          </ol>
        )}
        {loading && (
          <p className="supporters-state" role="status">
            กำลังโหลดรายชื่อผู้สนับสนุน...
          </p>
        )}
        {!loading && error && (
          <div className="supporters-state" role="alert">
            <p>โหลดรายชื่อผู้สนับสนุนไม่สำเร็จ</p>
            <button type="button" onClick={() => void load(nextOffset)}>
              ลองอีกครั้ง
            </button>
          </div>
        )}
        {!apiConfigured && (
          <p className="supporters-state">
            รายชื่อผู้สนับสนุนจะแสดงหลังเชื่อมต่อ API
          </p>
        )}
        {apiConfigured && !loading && !error && !supporters.length && (
          <p className="supporters-state">
            ยังไม่มีรายชื่อผู้สนับสนุนที่ตรวจสอบแล้ว
          </p>
        )}
        {!loading && !error && hasMore && (
          <button
            className="supporters-more"
            type="button"
            onClick={() => void load(nextOffset)}
          >
            ดูผู้สนับสนุนเพิ่มเติม
          </button>
        )}
      </div>
    </div>
  );
}

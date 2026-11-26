import type { ProjectKey } from "../../config/projects";

type ProjectOption = { value: ProjectKey; label: string };

export default function ProjectSelect({
  options,
}: {
  options: readonly ProjectOption[];
}) {
  return (
    <label className="field">
      โปรเจกต์ที่ต้องการสนับสนุน <em>*</em>
      <select name="project" defaultValue="" required>
        <option value="" disabled>
          เลือกโปรเจกต์
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}

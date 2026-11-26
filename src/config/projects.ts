export const projectOptions = [
  { value: "all", label: "สนับสนุนทุกโปรเจกต์" },
  { value: "webdonate", label: "WebDonate" },
] as const;

export type ProjectKey = (typeof projectOptions)[number]["value"];
export type ProjectOption = (typeof projectOptions)[number];

export function isProjectKey(
  value: FormDataEntryValue | null,
): value is ProjectKey {
  return projectOptions.some((option) => option.value === value);
}

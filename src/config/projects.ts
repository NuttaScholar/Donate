export const projectOptions = [
  {
    value: "smartbiz",
    label: "SmartBiz",
    url: "https://github.com/NuttaScholar/SmartBiz",
  },
  {
    value: "openlinkiot",
    label: "OpenLinkIOT",
    url: "https://github.com/NuttaScholar/OpenLinkIoT",
  },
] as const;

export type ProjectKey = (typeof projectOptions)[number]["value"];
export type ProjectOption = (typeof projectOptions)[number];

export function isProjectKey(
  value: FormDataEntryValue | null,
): value is ProjectKey {
  return projectOptions.some((option) => option.value === value);
}

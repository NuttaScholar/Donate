import type { Supporter } from '../../API/supporters'
import { projectOptions } from '../../config/projects'

const money = new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' })

export default function SupporterRow({ supporter, rank }: { supporter: Supporter; rank: number }) {
  const project = projectOptions.find(option => option.value === supporter.project_key)?.label ?? supporter.project_key
  return <li className="supporter-row">
    <span className="supporter-rank">{String(rank).padStart(2, '0')}</span>
    <div className="supporter-person"><strong>{supporter.donor_name}</strong><span>{project}</span></div>
    <strong className="supporter-amount">{money.format(Number(supporter.total_satang) / 100)}</strong>
  </li>
}

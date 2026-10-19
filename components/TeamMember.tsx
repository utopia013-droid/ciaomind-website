import { useTranslations } from 'next-intl';
import { team } from '@/data/team';
export default function TeamMember({ id }: { id: string; locale: string }) {
  const t = useTranslations();
  const member = team.find(item => item.id === id);
  if (!member) return null;
  return <article className="card-modern h-full">
    <div aria-hidden="true" className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary-navy text-2xl text-white">{t(member.nameKey).charAt(0)}</div>
    <h3 className="text-xl font-bold mb-2">{t(member.nameKey)}</h3>
    <p className="font-semibold text-primary-navy mb-3">{t(member.roleKey)}</p>
    <p className="text-text-secondary leading-relaxed">{t(member.bioKey)}</p>
  </article>;
}

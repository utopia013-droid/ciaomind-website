'use client';

import { useTranslations } from 'next-intl';
import { team } from '@/data/team';
import Image from 'next/image';

interface TeamMemberProps {
  id: string;
}

export default function TeamMember({ id }: TeamMemberProps) {
  const t = useTranslations();
  const member = team.find(m => m.id === id);

  if (!member) return null;

  return (
    <div className="card">
      <div className="relative w-full h-64 mb-4 overflow-hidden rounded-lg bg-gray-200">
        {/* Placeholder for team member image */}
        <div className="w-full h-full flex items-center justify-center text-gray-400">
          <svg
            className="w-24 h-24"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
          </svg>
        </div>
      </div>
      <h3 className="text-xl font-bold text-primary-navy mb-2">
        {t(member.nameKey as any)}
      </h3>
      <p className="text-primary-coral font-semibold mb-3">
        {t(member.roleKey as any)}
      </p>
      <p className="text-text-secondary text-sm">
        {t(member.bioKey as any)}
      </p>
    </div>
  );
}

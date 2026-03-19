'use client';

import { useTranslations } from 'next-intl';
import { team } from '@/data/team';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Mail } from 'lucide-react';

interface TeamMemberProps {
  id: string;
  locale: string;
}

export default function TeamMember({ id, locale }: TeamMemberProps) {
  const t = useTranslations();
  const member = team.find(m => m.id === id);

  if (!member) return null;

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className="group relative bg-white rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      }}
    >
      {/* Image Container */}
      <div className="relative w-full h-72 overflow-hidden bg-gradient-to-br from-primary-navy to-primary-navy-light">
        {/* Avatar Placeholder */}
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-32 h-32 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border-2 border-white/20">
            <span className="text-4xl font-bold text-white">
              {t(member.nameKey as any).charAt(0)}
            </span>
          </div>
        </div>

        {/* Social Links Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary-navy/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
          <div className="flex gap-4">
            {member.linkedin && (
              <a
                href={member.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary-navy transition-all duration-300"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            )}
            {member.twitter && (
              <a
                href={member.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary-navy transition-all duration-300"
              >
                <Twitter className="w-5 h-5" />
              </a>
            )}
            <a
              href={`mailto:${member.email || 'contact@ciaomind.com'}`}
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white hover:text-primary-navy transition-all duration-300"
            >
              <Mail className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-text-main mb-1 group-hover:text-primary-coral transition-colors duration-300">
          {t(member.nameKey as any)}
        </h3>
        <p className="text-primary-coral font-semibold text-sm mb-3">
          {t(member.roleKey as any)}
        </p>
        <p className="text-text-secondary text-sm leading-relaxed">
          {t(member.bioKey as any)}
        </p>
      </div>
    </motion.div>
  );
}

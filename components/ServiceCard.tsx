'use client';

import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import * as Icons from 'lucide-react';
import { services } from '@/data/services';

interface ServiceCardProps {
  id: string;
}

export default function ServiceCard({ id }: ServiceCardProps) {
  const t = useTranslations();
  const service = services.find(s => s.id === id);

  if (!service) return null;

  const Icon = Icons[service.icon as keyof typeof Icons] as React.ComponentType<{ className?: string }>;

  return (
    <Card className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardHeader>
        {Icon && <Icon className="w-12 h-12 text-primary-coral mb-4" />}
        <CardTitle>{t(service.titleKey as any)}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{t(service.descriptionKey as any)}</CardDescription>
      </CardContent>
    </Card>
  );
}

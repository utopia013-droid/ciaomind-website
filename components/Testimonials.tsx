'use client';

import { useTranslations } from 'next-intl';
import { Quote, Star } from 'lucide-react';
import FadeIn from './animations/FadeIn';
import { motion } from 'framer-motion';

interface TestimonialsProps {
  locale: string;
}

const testimonials = [
  {
    id: 1,
    name: 'Marco Rossi',
    role: 'CEO, Italian Design Co.',
    content: 'CIAOMIND helped us establish a strong presence in the Chinese market. Their cultural insights and professional approach made all the difference.',
    rating: 5,
    avatar: 'MR',
  },
  {
    id: 2,
    name: '张伟',
    role: '创始人, 东方科技有限公司',
    content: '与CIAOMIND的合作让我们顺利进入意大利市场。他们不仅提供语言支持，更重要的是深度的文化理解和商业洞察。',
    rating: 5,
    avatar: 'ZW',
  },
  {
    id: 3,
    name: 'Giulia Bianchi',
    role: 'Marketing Director, Fashion Italia',
    content: 'The AI training services provided by CIAOMIND were exceptional. Our team now communicates effectively with Chinese partners.',
    rating: 5,
    avatar: 'GB',
  },
];

export default function Testimonials({ locale }: TestimonialsProps) {
  const t = useTranslations();

  return (
    <section className="section bg-gradient-hero relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary-coral/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-accent-purple/10 rounded-full blur-3xl" />
      </div>

      <div className="container-modern relative z-10">
        <FadeIn className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {t('testimonials.title')}
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </FadeIn>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.id} delay={index * 0.15}>
              <motion.div
                whileHover={{ y: -10 }}
                className="glass-card-dark p-8 h-full flex flex-col"
              >
                {/* Quote Icon */}
                <div className="mb-6">
                  <Quote className="w-10 h-10 text-primary-coral/50" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 fill-accent-gold text-accent-gold" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-white/80 text-lg leading-relaxed mb-6 flex-grow">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary-coral to-accent-purple flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-sm text-white/60">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

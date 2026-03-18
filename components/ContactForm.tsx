'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Send } from 'lucide-react';

interface ContactFormProps {
  locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations('contact');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    alert(locale === 'zh' ? '感谢您的留言!我们会尽快回复您。' : 'Grazie per il tuo messaggio! Ti risponderemo presto.');
    setFormData({ name: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Mail className="w-8 h-8 text-primary-coral mr-3" />
        <h2 className="text-2xl font-bold text-primary-navy">{t('message')}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-text-main mb-2">
            {t('your_name')}
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent transition-all"
            placeholder={t('your_name')}
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-main mb-2">
            {t('your_email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent transition-all"
            placeholder="your@email.com"
          />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-main mb-2">
            {t('your_message')}
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent transition-all resize-none"
            placeholder={t('your_message')}
          />
        </div>

        <button
          type="submit"
          className="btn-primary w-full inline-flex items-center justify-center gap-2"
        >
          {t('send')}
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

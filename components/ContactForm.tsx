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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setHasError(false);
    setIsSuccess(false);

    try {
      const response = await fetch('https://formspree.io/f/mqeojwnd', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setFormData({ name: '', email: '', message: '' });
        setIsSuccess(true);
      } else {
        setHasError(true);
      }
    } catch (error) {
      setHasError(true);
    } finally {
      setIsSubmitting(false);
    }
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

      {isSuccess && (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg mb-6">
          {locale === 'zh' ? '感谢您的留言！我们会尽快回复您。' : 'Grazie per il tuo messaggio! Ti risponderemo presto.'}
          <button onClick={() => { setIsSuccess(false); setHasError(false); }} className="text-sm text-green-800 hover:text-green-600 ml-2">
            {locale === 'zh' ? '关闭' : 'Chiudi'}
          </button>
        </div>
      )}

      {hasError && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          {locale === 'zh' ? '发送失败，请重试。' : 'Errore! Per favore riprova.'}
          <button onClick={() => { setHasError(false); setIsSuccess(false); }} className="text-sm text-red-800 hover:text-red-600 ml-2">
            {locale === 'zh' ? '重试' : 'Riprova'}
          </button>
        </div>
      )}

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
          disabled={isSubmitting}
          className="btn-primary w-full inline-flex items-center justify-center gap-2"
        >
          {isSubmitting ? (locale === 'zh' ? '发送中...' : 'Invio in corso...') : t('send')}
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

'use client';

import { useForm, ValidationError } from '@formspree/react';
import { useTranslations } from 'next-intl';
import { Mail, Send } from 'lucide-react';

interface ContactFormProps {
  locale: string;
}

export default function ContactForm({ locale }: ContactFormProps) {
  const t = useTranslations('contact');
  const [state, handleSubmit] = useForm('mqeojwnd');

  if (state.succeeded) {
    return (
      <div className="card max-w-2xl mx-auto text-center py-12">
        <div className="text-green-600 text-4xl mb-4">✓</div>
        <h3 className="text-xl font-bold text-primary-navy mb-2">
          {locale === 'zh' ? '感谢您的留言！' : 'Grazie per il tuo messaggio!'}
        </h3>
        <p className="text-text-main">
          {locale === 'zh' ? '我们会尽快回复您。' : 'Ti risponderemo il prima possibile.'}
        </p>
      </div>
    );
  }

  return (
    <div className="card max-w-2xl mx-auto">
      <div className="flex items-center mb-6">
        <Mail className="w-8 h-8 text-primary-coral mr-3" />
        <h2 className="text-2xl font-bold text-primary-navy">{t('message')}</h2>
      </div>

      {state.errors && (
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-6">
          {locale === 'zh' ? '发送失败，请重试。' : 'Errore! Per favore riprova.'}
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
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent transition-all"
            placeholder={t('your_name')}
          />
          <ValidationError field="name" errors={state.errors} className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-text-main mb-2">
            {t('your_email')}
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent transition-all"
            placeholder="your@email.com"
          />
          <ValidationError field="email" errors={state.errors} className="text-red-600 text-sm mt-1" />
        </div>

        <div>
          <label htmlFor="message" className="block text-sm font-medium text-text-main mb-2">
            {t('your_message')}
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-navy focus:border-transparent transition-all resize-none"
            placeholder={t('your_message')}
          />
          <ValidationError field="message" errors={state.errors} className="text-red-600 text-sm mt-1" />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="btn-primary w-full inline-flex items-center justify-center gap-2"
        >
          {state.submitting
            ? (locale === 'zh' ? '发送中...' : 'Invio in corso...')
            : t('send')}
          <Send size={20} />
        </button>
      </form>
    </div>
  );
}

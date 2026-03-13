'use client'

import { FiMapPin, FiPhone, FiMail, FiClock, FiMessageCircle } from 'react-icons/fi'
import { FaTelegram, FaWhatsapp } from 'react-icons/fa'
import { useState } from 'react'
import toast from 'react-hot-toast'

export default function ContactPage() {
    const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' })
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        await new Promise(r => setTimeout(r, 800))
        toast.success('Сообщение отправлено! Мы ответим в течение часа.')
        setForm({ name: '', phone: '', email: '', message: '' })
        setSubmitting(false)
    }

    return (
        <div className="bg-gray-50 min-h-screen py-10">
            <div className="container-custom">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Контакты</h1>
                <p className="text-gray-500 mb-10">Свяжитесь с нами любым удобным способом</p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left: Info */}
                    <div className="space-y-6">
                        {/* Contact Cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {[
                                { icon: FiPhone, label: 'Телефон', value: '+7 (700) 123-45-67', href: 'tel:+77001234567', color: 'bg-blue-50 text-blue-600' },
                                { icon: FiMail, label: 'Email', value: 'info@elements.kz', href: 'mailto:info@elements.kz', color: 'bg-green-50 text-green-600' },
                                { icon: FaTelegram, label: 'Telegram', value: '@elements_kz', href: 'https://t.me/elements_kz', color: 'bg-sky-50 text-sky-600' },
                                { icon: FaWhatsapp, label: 'WhatsApp', value: '+7 (700) 123-45-67', href: 'https://wa.me/77001234567', color: 'bg-emerald-50 text-emerald-600' },
                            ].map(({ icon: Icon, label, value, href, color }) => (
                                <a key={label} href={href} target="_blank" rel="noopener noreferrer" className="bg-white rounded-xl p-4 shadow-sm flex items-start gap-3 hover:shadow-md transition-shadow">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-400">{label}</p>
                                        <p className="text-sm font-semibold text-gray-900">{value}</p>
                                    </div>
                                </a>
                            ))}
                        </div>

                        {/* Address & Hours */}
                        <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
                            <div className="flex items-start gap-3">
                                <FiMapPin className="w-5 h-5 text-primary-600 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-900">Адрес</p>
                                    <p className="text-sm text-gray-600">г. Алматы, ул. Абая 123, офис 45</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <FiClock className="w-5 h-5 text-primary-600 mt-0.5" />
                                <div>
                                    <p className="font-semibold text-gray-900">Режим работы</p>
                                    <p className="text-sm text-gray-600">Пн-Пт: 9:00 – 20:00</p>
                                    <p className="text-sm text-gray-600">Сб-Вс: 10:00 – 18:00</p>
                                </div>
                            </div>
                        </div>

                        {/* Map */}
                        <div className="bg-white rounded-xl shadow-sm overflow-hidden h-56">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1456.5!2d76.9453!3d43.2381!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDPCsDE0JzE3LjIiTiA3NsKwNTYnNDMuMSJF!5e0!3m2!1sru!2skz!4v1"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            />
                        </div>
                    </div>

                    {/* Right: Form */}
                    <div className="bg-white rounded-xl shadow-sm p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-1">Написать нам</h2>
                        <p className="text-sm text-gray-500 mb-5">Ответим в течение 1 рабочего часа</p>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Ваше имя *</label>
                                <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="input-field" placeholder="Ерлан" />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                                    <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required type="tel" className="input-field" placeholder="+7 (777)..." />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                                    <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} type="email" className="input-field" placeholder="email@..." />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Сообщение *</label>
                                <textarea value={form.message} onChange={e => setForm(p => ({ ...p, message: e.target.value }))} required rows={5} className="input-field resize-none" placeholder="Опишите ваш вопрос..." />
                            </div>
                            <button type="submit" disabled={submitting} className="btn-primary w-full flex items-center justify-center gap-2">
                                <FiMessageCircle className="w-4 h-4" />
                                {submitting ? 'Отправляем...' : 'Отправить'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

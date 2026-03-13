'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
    FiUsers, FiFileText, FiDollarSign, FiHeadphones,
    FiAward, FiTruck, FiCheckCircle, FiArrowRight
} from 'react-icons/fi'
import toast from 'react-hot-toast'

const BENEFITS = [
    { icon: FiDollarSign, title: 'Оптовые цены', desc: 'Специальные партнёрские цены для юридических лиц. Скидки от объёма заказа.' },
    { icon: FiFileText, title: 'Все документы', desc: 'Выставляем ЭСФ, накладные, товарные чеки. Безналичный расчёт.' },
    { icon: FiHeadphones, title: 'Личный менеджер', desc: 'Персональный менеджер для помощи в подборе и оформлении заказов.' },
    { icon: FiTruck, title: 'Корпоративная доставка', desc: 'Доставка крупных партий товара. Договор на регулярные поставки.' },
    { icon: FiAward, title: 'Тендеры', desc: 'Участвуем в государственных и корпоративных закупках. Предоставляем КП.' },
    { icon: FiUsers, title: 'Рассрочка для бизнеса', desc: 'Отсрочка платежа для надёжных партнёров. Гибкие условия.' },
]

const STEPS = [
    { num: '01', title: 'Оставьте заявку', desc: 'Заполните форму ниже или позвоните нам' },
    { num: '02', title: 'Контакт менеджера', desc: 'Наш менеджер свяжется с вами в течение 1 часа' },
    { num: '03', title: 'Согласование условий', desc: 'Обсудим ценообразование, документы и доставку' },
    { num: '04', title: 'Начало работы', desc: 'Открываем B2B кабинет и начинаем сотрудничество' },
]

export default function B2BPage() {
    const [form, setForm] = useState({
        company: '', bin: '', name: '', phone: '', email: '', comment: ''
    })
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitting(true)
        // TODO: POST to backend B2B application endpoint
        await new Promise(r => setTimeout(r, 1000))
        toast.success('Заявка отправлена! Мы свяжемся с вами в течение 1 часа.')
        setForm({ company: '', bin: '', name: '', phone: '', email: '', comment: '' })
        setSubmitting(false)
    }

    return (
        <div className="min-h-screen">
            {/* Hero */}
            <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-20">
                <div className="container-custom text-center">
                    <span className="bg-white/20 px-4 py-1.5 rounded-full text-sm font-medium mb-6 inline-block">
                        Для бизнеса
                    </span>
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">B2B Сотрудничество</h1>
                    <p className="text-xl text-primary-100 max-w-2xl mx-auto mb-8">
                        Специальные условия для юридических лиц. Оптовые цены, документы, личный менеджер.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#form" className="bg-white text-primary-700 px-8 py-3 rounded-xl font-semibold hover:bg-primary-50 transition-colors flex items-center gap-2">
                            Стать партнёром <FiArrowRight />
                        </a>
                        <a href="tel:+77001234567" className="border border-white/30 px-8 py-3 rounded-xl font-medium hover:bg-white/10 transition-colors">
                            +7 (700) 123-45-67
                        </a>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section className="bg-white border-b">
                <div className="container-custom py-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                        {[
                            { num: '500+', label: 'B2B клиентов' },
                            { num: '10 000+', label: 'Товаров в каталоге' },
                            { num: '1-2 дня', label: 'Оформление документов' },
                            { num: '24 мес', label: 'Рассрочка Kaspi Red' },
                        ].map(({ num, label }) => (
                            <div key={label}>
                                <p className="text-3xl font-bold text-primary-600 mb-1">{num}</p>
                                <p className="text-sm text-gray-500">{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Преимущества для бизнеса</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                        {BENEFITS.map(({ icon: Icon, title, desc }) => (
                            <div key={title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4">
                                    <Icon className="w-6 h-6 text-primary-600" />
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                                <p className="text-sm text-gray-600">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How it works */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <h2 className="text-3xl font-bold text-center text-gray-900 mb-10">Как начать работу</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                        {STEPS.map(({ num, title, desc }) => (
                            <div key={num} className="text-center">
                                <div className="w-14 h-14 bg-primary-600 text-white rounded-2xl flex items-center justify-center text-xl font-bold mx-auto mb-4">
                                    {num}
                                </div>
                                <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
                                <p className="text-sm text-gray-500">{desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What we offer */}
            <section className="py-16 bg-primary-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900 mb-6">Что входит в B2B-пакет</h2>
                            <div className="space-y-3">
                                {[
                                    'Доступ к оптовым ценам (скрытым от розничных клиентов)',
                                    'Персональный менеджер',
                                    'ЭСФ, накладные, счёт-фактуры',
                                    'Безналичный расчёт (IBAN)',
                                    'Отсрочка платежа (для стабильных партнёров)',
                                    'Тендерная поддержка (КП, сертификаты)',
                                    'Приоритетная доставка',
                                    'Ранний доступ к новым поступлениям',
                                ].map((item) => (
                                    <div key={item} className="flex items-start gap-3">
                                        <FiCheckCircle className="w-5 h-5 text-primary-600 flex-shrink-0 mt-0.5" />
                                        <span className="text-gray-700 text-sm">{item}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div id="form" className="bg-white rounded-2xl shadow-sm p-8">
                            <h3 className="text-xl font-bold text-gray-900 mb-6">Оставить заявку</h3>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Название компании *</label>
                                    <input value={form.company} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} required className="input-field" placeholder="ТОО «Компания»" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">БИН *</label>
                                    <input value={form.bin} onChange={e => setForm(p => ({ ...p, bin: e.target.value }))} required minLength={12} maxLength={12} className="input-field" placeholder="123456789012" />
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Контактное лицо *</label>
                                        <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} required className="input-field" placeholder="ФИО" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Телефон *</label>
                                        <input value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} required type="tel" className="input-field" placeholder="+7 (777)..." />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                                    <input value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required type="email" className="input-field" placeholder="company@example.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Комментарий</label>
                                    <textarea value={form.comment} onChange={e => setForm(p => ({ ...p, comment: e.target.value }))} className="input-field resize-none" rows={3} placeholder="Опишите ваши потребности..." />
                                </div>
                                <button type="submit" disabled={submitting} className="btn-primary w-full">
                                    {submitting ? 'Отправляем...' : 'Отправить заявку'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

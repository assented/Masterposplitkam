import React, { useState } from 'react';
import { SiteContent } from '../data/initialData';
import { PhoneCall, ShieldCheck, Zap, ThumbsUp, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  content: SiteContent;
  isEditMode: boolean;
  onUpdateContent: (field: keyof SiteContent, value: any) => void;
  onSubmitPhoneRequest: (phone: string, appliance: string, problemText: string) => void;
}

export const Hero: React.FC<HeroProps> = ({
  content,
  isEditMode,
  onUpdateContent,
  onSubmitPhoneRequest,
}) => {
  const [inputPhone, setInputPhone] = useState('');
  const [selectedAppliance, setSelectedAppliance] = useState('Холодильник');
  const [problemDescription, setProblemDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [phoneError, setPhoneError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputPhone.trim()) {
      setPhoneError('Пожалуйста, введите ваш номер телефона');
      return;
    }

    // Basic quick validation
    if (inputPhone.trim().length < 6) {
      setPhoneError('Введите корректный номер телефона');
      return;
    }

    onSubmitPhoneRequest(inputPhone, selectedAppliance, problemDescription || 'Без детального описания');
    setIsSubmitted(true);
    setPhoneError('');
  };

  const resetForm = () => {
    setInputPhone('');
    setProblemDescription('');
    setIsSubmitted(false);
  };

  return (
    <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-950 text-white pt-12 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      
      {/* Abstract cooling graphic background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none transform translate-x-20 -translate-y-20"></div>
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none transform -translate-y-10"></div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* Left column: Value Proposition & Texts */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 text-blue-300 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium">
            <Zap className="w-4 h-4 text-amber-400 fill-amber-400" />
            <span>Выезд мастера без посредников</span>
          </div>

          <div>
            {isEditMode ? (
              <div className="space-y-2">
                <label className="block text-xs text-amber-300 font-bold uppercase">Редактировать заголовок:</label>
                <textarea
                  className="w-full bg-amber-50 text-gray-900 font-extrabold text-2xl sm:text-3xl rounded p-2 border-2 border-amber-400"
                  rows={2}
                  value={content.heroTitle}
                  onChange={(e) => onUpdateContent('heroTitle', e.target.value)}
                />
              </div>
            ) : (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
                {content.heroTitle}
              </h1>
            )}
          </div>

          <div>
            {isEditMode ? (
              <div className="space-y-2 mt-3">
                <label className="block text-xs text-amber-300 font-bold uppercase">Редактировать подзаголовок:</label>
                <textarea
                  className="w-full bg-amber-50 text-gray-800 text-sm rounded p-2 border-2 border-amber-400 font-medium"
                  rows={3}
                  value={content.heroSubtitle}
                  onChange={(e) => onUpdateContent('heroSubtitle', e.target.value)}
                />
              </div>
            ) : (
              <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {content.heroSubtitle}
              </p>
            )}
          </div>

          {/* Quick proof points */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 max-w-xl mx-auto lg:mx-0">
            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 text-left flex items-start gap-3">
              <Zap className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs text-gray-400">Прибытие</span>
                {isEditMode ? (
                  <input
                    type="text"
                    className="bg-amber-50 text-gray-900 font-bold rounded px-1 text-xs w-16"
                    value={content.arrivalMinutes}
                    onChange={(e) => onUpdateContent('arrivalMinutes', e.target.value)}
                  />
                ) : (
                  <span className="font-bold text-sm text-white">{content.arrivalMinutes} минут</span>
                )}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 text-left flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs text-gray-400">Гарантия</span>
                {isEditMode ? (
                  <input
                    type="text"
                    className="bg-amber-50 text-gray-900 font-bold rounded px-1 text-xs w-full"
                    value={content.warrantyText}
                    onChange={(e) => onUpdateContent('warrantyText', e.target.value)}
                  />
                ) : (
                  <span className="font-bold text-sm text-white text-ellipsis overflow-hidden block">До 3 лет</span>
                )}
              </div>
            </div>

            <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3.5 border border-white/10 text-left flex items-start gap-3">
              <ThumbsUp className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
              <div>
                <span className="block text-xs text-gray-400">Цены ниже</span>
                <span className="font-bold text-sm text-white">на 30-40%</span>
              </div>
            </div>
          </div>

          {/* Direct call banner */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 text-sm text-gray-300">
            <span>Нужна срочная консультация?</span>
            <a
              href={`tel:${content.phone}`}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg font-bold shadow transition-all"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Позвонить мастеру</span>
            </a>
          </div>

        </div>

        {/* Right column: Lead Capture Window / Request Form */}
        <div className="lg:col-span-5 w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100 text-gray-900 p-6 sm:p-8 relative">
            
            {/* Header decoration */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-amber-500"></div>

            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
              Оставить номер на связи
            </h3>
            <p className="text-xs text-gray-500 text-center mb-6">
              Мастер перезвонит в течение 5-10 минут для бесплатной диагностики по телефону
            </p>

            {isSubmitted ? (
              <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6 text-center space-y-4 my-4 animate-fade-in">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-7 h-7" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-900 text-lg">Номер успешно передан!</h4>
                  <p className="text-xs text-emerald-700 mt-1">
                    Ваша заявка мгновенно поступила в <b>панель контроля мастера</b>. Ожидайте звонка.
                  </p>
                </div>
                <button
                  onClick={resetForm}
                  className="text-xs text-blue-600 hover:text-blue-800 font-medium underline block mx-auto pt-2"
                >
                  Отправить еще один номер
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Appliance Type Selector */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Что требует ремонта?
                  </label>
                  <select
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-medium"
                    value={selectedAppliance}
                    onChange={(e) => setSelectedAppliance(e.target.value)}
                  >
                    <option value="Холодильник">Холодильник (Бытовой)</option>
                    <option value="Сплит-система / Кондиционер">Сплит-система / Кондиционер</option>
                    <option value="Торговая холодильная витрина">Торговая холодильная витрина</option>
                    <option value="Морозильный ларь / Камера">Морозильный ларь / Камера</option>
                    <option value="Промышленный холод">Промышленный холод</option>
                  </select>
                </div>

                {/* Phone Number Input */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Ваш номер телефона <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400 pointer-events-none font-bold text-sm">
                      ☎
                    </span>
                    <input
                      type="tel"
                      className={`w-full pl-9 pr-4 py-3 bg-gray-50 border rounded-lg text-base font-bold placeholder-gray-400 focus:outline-none focus:ring-2 ${
                        phoneError ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                      }`}
                      placeholder="+7 (___) ___-__-__"
                      value={inputPhone}
                      onChange={(e) => {
                        setInputPhone(e.target.value);
                        if (phoneError) setPhoneError('');
                      }}
                    />
                  </div>
                  {phoneError && (
                    <p className="text-xs text-red-600 mt-1 font-medium animate-shake">{phoneError}</p>
                  )}
                </div>

                {/* Problem Description Optional */}
                <div>
                  <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider mb-1.5">
                    Кратко о поломке (необязательно)
                  </label>
                  <textarea
                    className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400"
                    rows={2}
                    placeholder="Например: течет вода, не морозит, гудит, выдает ошибку..."
                    value={problemDescription}
                    onChange={(e) => setProblemDescription(e.target.value)}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white font-bold py-3.5 px-4 rounded-xl shadow-md transition-all flex items-center justify-center gap-2 tracking-wide text-sm sm:text-base mt-2"
                >
                  <span>Оставить номер на связи</span>
                  <PhoneCall className="w-4 h-4 animate-bounce" />
                </button>

                <p className="text-[11px] text-gray-400 text-center mt-3 leading-tight">
                  Нажимая кнопку, вы передаете данные напрямую частному мастеру для быстрой связи.
                </p>

              </form>
            )}

            {/* Hint about incoming panel */}
            <div className="mt-5 pt-4 border-t border-dashed border-gray-200 rounded-b-lg bg-slate-50 p-3 text-center">
              <p className="text-[11px] text-slate-600">
                💡 <b>Для владельца сайта:</b> Отправленные номера мгновенно отобразятся в верхней кнопке <b>«Заявки»</b>.
              </p>
            </div>

          </div>
        </div>

      </div>

    </section>
  );
};

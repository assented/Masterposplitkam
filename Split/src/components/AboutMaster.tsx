import React from 'react';
import { SiteContent } from '../data/initialData';
import { Award, ThumbsUp, Sparkles, Wrench, FileText } from 'lucide-react';

interface AboutMasterProps {
  content: SiteContent;
  isEditMode: boolean;
  onUpdateContent: (field: keyof SiteContent, value: any) => void;
}

export const AboutMaster: React.FC<AboutMasterProps> = ({
  content,
  isEditMode,
  onUpdateContent,
}) => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-slate-50 border-t border-gray-100" id="about">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Side: Avatar/Photo representation and Badges */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative mx-auto max-w-sm lg:max-w-none">
              
              {/* Decorative behind card frame */}
              <div className="absolute inset-0 bg-blue-600 rounded-3xl transform rotate-3 scale-102 opacity-10"></div>
              
              <div className="relative bg-white rounded-3xl p-6 shadow-xl border border-gray-100 space-y-4">
                
                <div className="w-20 h-20 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center font-black text-2xl mx-auto shadow-inner">
                  👨‍🔧
                </div>

                <div className="text-center">
                  <h3 className="font-extrabold text-xl text-gray-900">
                    {content.masterName}
                  </h3>
                  <p className="text-xs text-blue-600 font-bold uppercase mt-1">
                    Сертифицированный специалист
                  </p>
                </div>

                <div className="border-t border-b border-gray-100 py-3 space-y-2 text-xs text-gray-600">
                  <div className="flex justify-between font-medium">
                    <span>Стаж в профессии:</span>
                    <span className="font-bold text-gray-900 bg-amber-100 px-2 py-0.5 rounded">
                      {content.experienceYears} лет
                    </span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Выезд на адрес:</span>
                    <span className="font-bold text-gray-900">до {content.arrivalMinutes} минут</span>
                  </div>
                  <div className="flex justify-between font-medium">
                    <span>Агентские сборы:</span>
                    <span className="font-bold text-emerald-600">0% (Без посредников)</span>
                  </div>
                </div>

                <div className="bg-slate-50 rounded-xl p-3 flex items-start gap-2 text-[11px] text-slate-700">
                  <Award className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                  <span>
                    Выдаю официальный гарантийный талон с печатью и подписью на каждый установленный компрессор или плату.
                  </span>
                </div>

              </div>
            </div>
          </div>

          {/* Right Side: Editable About Text & Feature blocks */}
          <div className="lg:col-span-7 space-y-6">
            
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 block mb-1">
                Давайте знакомиться
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
                Почему ремонт у частного мастера выгоднее и надежнее?
              </h2>
            </div>

            {/* About text editable */}
            <div className="text-gray-700 leading-relaxed text-sm sm:text-base space-y-4">
              {isEditMode ? (
                <div>
                  <label className="block text-xs text-amber-800 font-bold uppercase mb-1">
                    Редактировать текст о мастере:
                  </label>
                  <textarea
                    className="w-full bg-amber-50 border-2 border-amber-400 rounded-lg p-3 text-sm text-gray-900 font-medium leading-relaxed"
                    rows={8}
                    value={content.aboutText}
                    onChange={(e) => onUpdateContent('aboutText', e.target.value)}
                  />
                  <p className="text-[10px] text-gray-400 mt-1">
                    Опишите свои сильные стороны, инструменты, гарантии и отношение к работе.
                  </p>
                </div>
              ) : (
                <p className="whitespace-pre-line">{content.aboutText}</p>
              )}
            </div>

            {/* Quick trust highlights grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              
              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-start gap-3">
                <div className="bg-emerald-50 text-emerald-600 p-2 rounded-lg mt-0.5">
                  <ThumbsUp className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">Оплата только за результат</h5>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    Никаких предоплат до завершения пусконаладочных работ.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-start gap-3">
                <div className="bg-blue-50 text-blue-600 p-2 rounded-lg mt-0.5">
                  <Wrench className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">Склад запчастей с собой</h5>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    90% поломок устраняются за 1 визит, вожу ходовые детали в машине.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-start gap-3">
                <div className="bg-purple-50 text-purple-600 p-2 rounded-lg mt-0.5">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">Чистота и аккуратность</h5>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    Использую бахилы и защитные коврики, чтобы не испачкать ваш пол.
                  </p>
                </div>
              </div>

              <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-2xs flex items-start gap-3">
                <div className="bg-amber-50 text-amber-600 p-2 rounded-lg mt-0.5">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="font-bold text-gray-900 text-sm">Честная квитанция</h5>
                  <p className="text-xs text-gray-500 mt-0.5 leading-snug">
                    Фиксирую замененные детали в акте, возвращаю старые запчасти.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

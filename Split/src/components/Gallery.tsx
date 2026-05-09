import React from 'react';
import { stockPhotos } from '../data/initialData';
import { Camera, CheckCircle } from 'lucide-react';

export const Gallery: React.FC = () => {
  return (
    <section className="py-16 bg-slate-50 border-t border-b border-gray-200" id="gallery">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 bg-slate-200 text-slate-800 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Camera className="w-3.5 h-3.5" />
            <span>Примеры из практики</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Фотографии работ и оборудования
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Использую только высокоточное оборудование: манометрические станции, электронные весы для дозировки фреона, течеискатели и профессиональный инструмент.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stockPhotos.map((photo, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-200 flex flex-col group"
            >
              <div className="relative h-48 w-full overflow-hidden bg-gray-200">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-end p-3">
                  <span className="text-xs font-bold text-white block">
                    ✓ Профессиональный подход
                  </span>
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between bg-white">
                <p className="text-xs sm:text-sm font-bold text-gray-800 leading-snug">
                  {photo.title}
                </p>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-emerald-600 font-semibold">
                  <CheckCircle className="w-3 h-3" />
                  <span>Соответствие стандартам</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Master's authentic pledge */}
        <div className="mt-10 bg-white rounded-xl p-4 border border-gray-200 text-center text-xs text-gray-500 max-w-xl mx-auto shadow-2xs">
          📸 Все работы проводятся с соблюдением техники безопасности и чистоты на рабочем месте. После окончания ремонта я всегда убираю за собой весь мусор.
        </div>

      </div>
    </section>
  );
};

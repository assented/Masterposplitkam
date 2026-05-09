import React, { useState } from 'react';
import { ServiceItem } from '../data/initialData';
import { Snowflake, Wind, Briefcase, Clock } from 'lucide-react';

interface ServicesListProps {
  services: ServiceItem[];
  isEditMode: boolean;
  onUpdateService: (id: string, field: keyof ServiceItem, value: string) => void;
  phone: string;
}

export const ServicesList: React.FC<ServicesListProps> = ({
  services,
  isEditMode,
  onUpdateService,
  phone,
}) => {
  const [filter, setFilter] = useState<'all' | 'fridge' | 'split' | 'commercial'>('all');

  const filteredServices = services.filter((s) => {
    if (filter === 'all') return true;
    return s.category === filter;
  });

  return (
    <section className="py-16 bg-white" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Цены на ремонт и обслуживание
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-600">
            Фиксированная стоимость работ, никаких скрытых накруток. Окончательная цена называется после диагностики.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'all'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Все услуги ({services.length})
          </button>
          
          <button
            onClick={() => setFilter('fridge')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'fridge'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Snowflake className="w-4 h-4" />
            <span>Холодильники</span>
          </button>

          <button
            onClick={() => setFilter('split')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'split'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Wind className="w-4 h-4" />
            <span>Сплит-системы</span>
          </button>

          <button
            onClick={() => setFilter('commercial')}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              filter === 'commercial'
                ? 'bg-blue-600 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>Торговый холод</span>
          </button>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              className={`rounded-2xl border transition-all duration-200 p-5 flex flex-col justify-between ${
                isEditMode ? 'bg-amber-50/40 border-amber-300 ring-1 ring-amber-200' : 'bg-slate-50 border-gray-200 hover:shadow-md'
              }`}
            >
              <div>
                {/* Category badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full ${
                    service.category === 'fridge' ? 'bg-cyan-100 text-cyan-800' :
                    service.category === 'split' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
                  }`}>
                    {service.category === 'fridge' ? 'Холодильник' : service.category === 'split' ? 'Сплит-система' : 'Торговое обор.'}
                  </span>

                  <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                    <Clock className="w-3.5 h-3.5 text-gray-400" />
                    {isEditMode ? (
                      <input
                        type="text"
                        className="bg-amber-100 text-gray-800 font-bold px-1 rounded w-16 text-right text-xs"
                        value={service.duration}
                        onChange={(e) => onUpdateService(service.id, 'duration', e.target.value)}
                        title="Время работы"
                      />
                    ) : (
                      <span>{service.duration}</span>
                    )}
                  </div>
                </div>

                {/* Title */}
                <div className="mb-4">
                  {isEditMode ? (
                    <div>
                      <label className="block text-[10px] text-amber-800 font-bold uppercase">Название услуги:</label>
                      <textarea
                        className="w-full bg-white border border-amber-400 rounded p-1 text-sm font-bold text-gray-900"
                        rows={2}
                        value={service.title}
                        onChange={(e) => onUpdateService(service.id, 'title', e.target.value)}
                      />
                    </div>
                  ) : (
                    <h4 className="font-bold text-gray-900 text-base leading-snug">
                      {service.title}
                    </h4>
                  )}
                </div>
              </div>

              {/* Price & Call action */}
              <div className="pt-4 border-t border-gray-200/80 mt-auto flex items-center justify-between gap-2">
                <div>
                  <span className="block text-[10px] uppercase text-gray-400 font-semibold tracking-wider">Стоимость</span>
                  {isEditMode ? (
                    <input
                      type="text"
                      className="bg-amber-100 border border-amber-400 rounded px-1 text-base font-extrabold text-blue-700 w-24"
                      value={service.price}
                      onChange={(e) => onUpdateService(service.id, 'price', e.target.value)}
                      title="Стоимость"
                    />
                  ) : (
                    <span className="text-lg font-extrabold text-blue-600 block">
                      {service.price}
                    </span>
                  )}
                </div>

                <a
                  href={`tel:${phone}`}
                  className="bg-white hover:bg-gray-50 text-gray-800 border border-gray-300 font-bold px-3 py-1.5 rounded-lg text-xs transition-colors"
                >
                  Заказать
                </a>
              </div>

            </div>
          ))}
        </div>

        {/* Disclaimer / Callout */}
        <div className="mt-12 bg-blue-50 border border-blue-100 rounded-2xl p-6 text-center max-w-2xl mx-auto">
          <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-medium">
            🔧 Внимание: Точная стоимость зависит от марки оборудования, сложности доступа к узлам и стоимости оригинальной запчасти. <b>Выезд и диагностика — бесплатно</b> при согласии на проведение ремонта.
          </p>
        </div>

      </div>
    </section>
  );
};

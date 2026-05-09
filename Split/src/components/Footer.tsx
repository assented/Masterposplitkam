import React from 'react';
import { SiteContent } from '../data/initialData';
import { ShieldAlert, Heart } from 'lucide-react';

interface FooterProps {
  content: SiteContent;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ content, onOpenAdmin }) => {
  return (
    <footer className="bg-slate-950 text-gray-400 pt-12 pb-24 sm:pb-16 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1 */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2 text-white font-bold text-lg">
              <span className="bg-blue-600 text-white px-2 py-0.5 rounded text-sm">PRO</span>
              <span>{content.masterName}</span>
            </div>
            <p className="text-xs text-gray-400 max-w-sm leading-relaxed">
              Профессиональный частный ремонт бытовых и промышленных холодильников, морозильных камер и сплит-систем на дому. Быстрый выезд в любой район города и пригорода.
            </p>
            <p className="text-[11px] text-gray-500">
              © {new Date().getFullYear()} Все права защищены. Сайт частного мастера. Не является публичной офертой.
            </p>
          </div>

          {/* Col 2 */}
          <div className="space-y-2 text-xs">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-3">Навигация</h4>
            <p><a href="#services" className="hover:text-white transition-colors">Цены на услуги</a></p>
            <p><a href="#about" className="hover:text-white transition-colors">О мастере и гарантиях</a></p>
            <p><a href="#gallery" className="hover:text-white transition-colors">Фотографии оборудования</a></p>
            <p><a href="#reviews" className="hover:text-white transition-colors">Отзывы клиентов</a></p>
          </div>

          {/* Col 3 */}
          <div className="space-y-3">
            <h4 className="font-bold text-white text-sm uppercase tracking-wider mb-2">Контакты</h4>
            <div className="bg-slate-900 p-3 rounded-xl border border-slate-800">
              <span className="block text-[10px] uppercase text-gray-500">Телефон мастера:</span>
              <a href={`tel:${content.phone}`} className="font-bold text-white text-base hover:text-blue-400 block mt-0.5">
                {content.phone}
              </a>
              <span className="block text-[10px] text-emerald-500 mt-1">✓ На связи сейчас</span>
            </div>

            <button
              onClick={onOpenAdmin}
              className="text-left text-[11px] text-slate-500 hover:text-slate-300 underline block pt-2 transition-colors"
            >
              Вход в панель контроля сообщений (Заявки)
            </button>
          </div>

        </div>

        {/* Bottom anti-fraud notification */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-gray-500 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start gap-1.5 max-w-2xl">
            <ShieldAlert className="w-4 h-4 text-amber-500 flex-shrink-0" />
            <span>
              <b>Остерегайтесь мошенников</b>: Настоящий частный мастер всегда называет точные пределы цен до разборки техники и оставляет старые запчасти клиенту.
            </span>
          </div>

          <div className="flex items-center gap-1 text-gray-600">
            <span>Создано с</span>
            <Heart className="w-3 h-3 text-red-500 fill-red-500 animate-pulse" />
            <span>для удобства клиентов</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

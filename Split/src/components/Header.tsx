import React from 'react';
import { Wrench, Phone, Clock, Edit3, MessageSquare } from 'lucide-react';
import { SiteContent } from '../data/initialData';

interface HeaderProps {
  content: SiteContent;
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  onOpenAdmin: () => void;
  unreadCount: number;
  onUpdateContent: (field: keyof SiteContent, value: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  content,
  isEditMode,
  setIsEditMode,
  onOpenAdmin,
  unreadCount,
  onUpdateContent,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 gap-4">
          
          {/* Logo & Master Info */}
          <div className="flex items-center gap-3">
            <div className="bg-blue-600 text-white p-2.5 rounded-xl shadow-md flex-shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              {isEditMode ? (
                <input
                  type="text"
                  className="font-bold text-lg text-gray-900 bg-amber-50 border border-amber-400 rounded px-1.5 py-0.5 w-full max-w-[200px]"
                  value={content.masterName}
                  onChange={(e) => onUpdateContent('masterName', e.target.value)}
                  title="Имя мастера"
                />
              ) : (
                <span className="font-bold text-lg text-gray-900 block">
                  {content.masterName}
                </span>
              )}
              <span className="text-xs text-blue-600 font-medium tracking-wide uppercase block">
                Частный мастер • Опыт {content.experienceYears} лет
              </span>
            </div>
          </div>

          {/* Contact & Hours Info (Hidden on very small screens) */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="w-5 h-5 text-blue-500 flex-shrink-0" />
              <div className="text-sm">
                <span className="block text-xs text-gray-400 uppercase tracking-wider">Режим работы</span>
                {isEditMode ? (
                  <input
                    type="text"
                    className="bg-amber-50 border border-amber-400 rounded px-1 text-xs font-medium text-gray-800"
                    value={content.workingHours}
                    onChange={(e) => onUpdateContent('workingHours', e.target.value)}
                  />
                ) : (
                  <span className="font-medium text-gray-800">{content.workingHours}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <div className="bg-blue-50 p-2 rounded-full text-blue-600">
                <Phone className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-xs text-gray-400 uppercase tracking-wider">Прямая связь</span>
                {isEditMode ? (
                  <input
                    type="text"
                    className="bg-amber-50 border border-amber-400 rounded px-1 font-bold text-sm text-gray-900"
                    value={content.phone}
                    onChange={(e) => onUpdateContent('phone', e.target.value)}
                  />
                ) : (
                  <a href={`tel:${content.phone}`} className="font-bold text-lg text-gray-900 hover:text-blue-600 transition-colors block">
                    {content.phone}
                  </a>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons: Admin Panel & Edit Mode */}
          <div className="flex items-center gap-2">
            
            {/* Admin Dashboard trigger button */}
            <button
              onClick={onOpenAdmin}
              className="relative inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-3.5 py-2 rounded-lg font-medium text-xs sm:text-sm shadow-sm transition-all"
              title="Панель контроля приходящих сообщений с номерами"
            >
              <MessageSquare className="w-4 h-4 text-blue-400" />
              <span className="hidden sm:inline">Заявки</span>
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center animate-pulse shadow">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Toggle Edit Mode button */}
            <button
              onClick={() => setIsEditMode(!isEditMode)}
              className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                isEditMode
                  ? 'bg-amber-500 text-white ring-2 ring-amber-300 shadow-md animate-pulse'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Включить/выключить редактирование текстов сайта"
            >
              <Edit3 className="w-4 h-4" />
              <span className="hidden sm:inline">{isEditMode ? 'Выйти из ред.' : 'Редактировать'}</span>
            </button>

            {/* Direct call icon for extreme mobile */}
            <a
              href={`tel:${content.phone}`}
              className="md:hidden bg-blue-600 text-white p-2 rounded-lg"
              title="Позвонить"
            >
              <Phone className="w-5 h-5" />
            </a>

          </div>

        </div>
      </div>

      {/* Active Edit Mode Alert Strip */}
      {isEditMode && (
        <div className="bg-amber-50 border-t border-b border-amber-200 py-1.5 px-4 text-center text-xs text-amber-900 font-medium flex items-center justify-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span>Включен <b>Режим редактирования</b>. Кликайте на желтые поля, чтобы изменять тексты и цены онлайн.</span>
        </div>
      )}
    </header>
  );
};

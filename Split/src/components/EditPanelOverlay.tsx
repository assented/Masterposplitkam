import React from 'react';
import { RefreshCw, Eye, Edit3 } from 'lucide-react';

interface EditPanelOverlayProps {
  isEditMode: boolean;
  setIsEditMode: (val: boolean) => void;
  onResetDefaults: () => void;
}

export const EditPanelOverlay: React.FC<EditPanelOverlayProps> = ({
  isEditMode,
  setIsEditMode,
  onResetDefaults,
}) => {
  if (!isEditMode) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md text-white border-t-2 border-amber-500 p-3 sm:p-4 shadow-2xl animate-slide-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        
        <div className="flex items-center gap-3">
          <div className="bg-amber-500 text-slate-950 p-2 rounded-full font-black animate-spin-slow">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-sm sm:text-base text-amber-400 flex items-center justify-center sm:justify-start gap-1.5">
              <span>Режим редактирования сайта включен</span>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400"></span>
            </h4>
            <p className="text-xs text-gray-300 mt-0.5">
              Все измененные тексты, имена и цены <b>сохраняются автоматически</b> в вашем браузере.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-2 w-full sm:w-auto">
          
          <button
            onClick={() => {
              if (confirm('Сбросить все тексты, цены и настройки сайта к исходным значениям по умолчанию?')) {
                onResetDefaults();
              }
            }}
            className="bg-slate-800 hover:bg-slate-700 text-gray-300 px-3 py-2 rounded-lg text-xs font-medium transition-colors inline-flex items-center gap-1.5 border border-slate-700"
            title="Вернуть исходные тексты и цены"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Сбросить настройки</span>
          </button>

          <button
            onClick={() => setIsEditMode(false)}
            className="bg-emerald-600 hover:bg-emerald-500 active:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md inline-flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4" />
            <span>Посмотреть сайт как клиент</span>
          </button>

        </div>

      </div>
    </div>
  );
};

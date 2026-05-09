import React, { useState } from 'react';
import { ClientMessage } from '../data/initialData';
import { 
  X, 
  PhoneCall, 
  Clock, 
  Trash2, 
  Search, 
  Plus,
  Filter,
  Layers
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  messages: ClientMessage[];
  onUpdateStatus: (id: string, status: ClientMessage['status']) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onDeleteMessage: (id: string) => void;
  onGenerateDemoMessage: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  messages,
  onUpdateStatus,
  onUpdateNotes,
  onDeleteMessage,
  onGenerateDemoMessage,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotes, setTempNotes] = useState<string>('');

  if (!isOpen) return null;

  // Filter messages based on search and status
  const filteredMessages = messages.filter((msg) => {
    const matchesStatus = statusFilter === 'all' || msg.status === statusFilter;
    const matchesSearch = 
      msg.phone.includes(searchTerm) || 
      msg.applianceType.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.problem.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (msg.notes && msg.notes.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesStatus && matchesSearch;
  });

  // Calculate statistics
  const totalCount = messages.length;
  const newCount = messages.filter(m => m.status === 'new').length;
  const inProgressCount = messages.filter(m => m.status === 'in_progress').length;
  const completedCount = messages.filter(m => m.status === 'completed').length;

  const handleStartEditNotes = (msg: ClientMessage) => {
    setEditingNotesId(msg.id);
    setTempNotes(msg.notes || '');
  };

  const handleSaveNotes = (id: string) => {
    onUpdateNotes(id, tempNotes);
    setEditingNotesId(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs flex justify-end animate-fade-in">
      
      {/* Clickable backdrop to close */}
      <div className="absolute inset-0" onClick={onClose}></div>

      {/* Main Slide-Over Panel */}
      <div className="relative w-full max-w-2xl bg-slate-50 h-full overflow-y-auto shadow-2xl flex flex-col z-10 animate-slide-left">
        
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 sticky top-0 z-20 shadow-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="bg-blue-600 text-white p-2 rounded-lg font-bold text-xs uppercase">
                Панель
              </div>
              <div>
                <h3 className="font-extrabold text-lg text-white">Контроль входящих сообщений</h3>
                <p className="text-xs text-gray-300">База номеров клиентов на связи</p>
              </div>
            </div>
            
            <button
              onClick={onClose}
              className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-colors"
              title="Закрыть панель"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Statistics Strip */}
          <div className="grid grid-cols-4 gap-2 mt-5 pt-4 border-t border-white/10 text-center">
            <div className="bg-white/5 rounded-lg p-2">
              <span className="block text-[10px] uppercase text-gray-400 font-medium">Всего</span>
              <span className="text-base font-bold text-white">{totalCount}</span>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-2">
              <span className="block text-[10px] uppercase text-red-300 font-medium">Новые</span>
              <span className="text-base font-bold text-red-400 animate-pulse">{newCount}</span>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-2">
              <span className="block text-[10px] uppercase text-amber-300 font-medium">В работе</span>
              <span className="text-base font-bold text-amber-400">{inProgressCount}</span>
            </div>
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-2">
              <span className="block text-[10px] uppercase text-emerald-300 font-medium">Готово</span>
              <span className="text-base font-bold text-emerald-400">{completedCount}</span>
            </div>
          </div>
        </div>

        {/* Toolbar & Filter Options */}
        <div className="p-4 bg-white border-b border-gray-200 space-y-3">
          
          {/* Simulation Injector */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 flex flex-col sm:flex-row items-center justify-between gap-2">
            <div className="text-xs text-blue-950 font-medium">
              💡 Хотите проверить прием заявок онлайн?
            </div>
            <button
              onClick={onGenerateDemoMessage}
              className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg text-xs shadow-xs transition-all inline-flex items-center justify-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Тестовая заявка с номером</span>
            </button>
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-2.5" />
              <input
                type="text"
                className="w-full pl-9 pr-3 py-1.5 bg-gray-50 border border-gray-300 rounded-lg text-xs font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Поиск по номеру, технике, проблеме..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Status Filter */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Filter className="w-3.5 h-3.5 text-gray-500" />
              <select
                className="bg-gray-50 border border-gray-300 rounded-lg py-1.5 px-2 text-xs font-medium focus:ring-2 focus:ring-blue-500"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="all">Все статусы</option>
                <option value="new">Новые</option>
                <option value="in_progress">В работе</option>
                <option value="completed">Выполнены</option>
                <option value="cancelled">Отменены</option>
              </select>
            </div>
          </div>

        </div>

        {/* Message Cards List */}
        <div className="p-4 flex-1 space-y-4">
          {filteredMessages.length === 0 ? (
            <div className="bg-white rounded-xl p-10 text-center border border-gray-200 my-8">
              <Layers className="w-10 h-10 text-gray-300 mx-auto mb-2" />
              <h4 className="font-bold text-gray-700 text-sm">Сообщений не найдено</h4>
              <p className="text-xs text-gray-400 mt-1">
                Попробуйте изменить параметры поиска или отправьте новый номер с формы на сайте.
              </p>
            </div>
          ) : (
            filteredMessages.map((msg) => {
              
              // Status Styling colors
              let statusBadgeBg = 'bg-gray-100 text-gray-800';
              let statusText = 'Неизвестно';
              if (msg.status === 'new') {
                statusBadgeBg = 'bg-red-100 text-red-800 border border-red-200 animate-pulse font-bold';
                statusText = '🔥 НОВОЕ';
              } else if (msg.status === 'in_progress') {
                statusBadgeBg = 'bg-amber-100 text-amber-800 border border-amber-200 font-bold';
                statusText = '⏳ В работе';
              } else if (msg.status === 'completed') {
                statusBadgeBg = 'bg-emerald-100 text-emerald-800 font-bold';
                statusText = '✓ Выполнено';
              } else if (msg.status === 'cancelled') {
                statusBadgeBg = 'bg-slate-200 text-slate-700 line-through';
                statusText = 'Отменено';
              }

              return (
                <div 
                  key={msg.id}
                  className={`bg-white rounded-xl p-4 shadow-xs border transition-all ${
                    msg.status === 'new' ? 'border-l-4 border-l-red-500 border-gray-200' : 
                    msg.status === 'in_progress' ? 'border-l-4 border-l-amber-500 border-gray-200' : 'border-gray-200'
                  }`}
                >
                  
                  {/* Top row: phone and status badge */}
                  <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-gray-100">
                    <div className="flex items-center gap-2">
                      <div className="bg-blue-50 text-blue-600 p-1.5 rounded-full">
                        <PhoneCall className="w-4 h-4" />
                      </div>
                      <a 
                        href={`tel:${msg.phone}`}
                        className="font-black text-base text-gray-900 hover:text-blue-600 tracking-wide block"
                      >
                        {msg.phone}
                      </a>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase px-2 py-0.5 rounded-full tracking-wider ${statusBadgeBg}`}>
                        {statusText}
                      </span>
                      
                      <span className="text-[11px] text-gray-400 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>

                  {/* Appliance details and problem description */}
                  <div className="py-3 space-y-1.5">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] bg-slate-100 font-bold px-2 py-0.5 rounded text-slate-700 uppercase">
                        {msg.applianceType}
                      </span>
                    </div>

                    <div className="bg-slate-50 rounded-lg p-2.5 text-xs text-gray-800 border border-slate-100 font-medium">
                      <span className="text-gray-400 block text-[10px] uppercase tracking-wide mb-0.5">Описанная поломка:</span>
                      {msg.problem}
                    </div>
                  </div>

                  {/* Master Notes Section */}
                  <div className="pt-1 pb-2">
                    <div className="text-[11px] font-bold text-gray-600 uppercase mb-1 flex items-center justify-between">
                      <span>✏️ Заметка мастера:</span>
                      {editingNotesId !== msg.id && (
                        <button
                          onClick={() => handleStartEditNotes(msg)}
                          className="text-blue-600 hover:underline text-[10px] font-normal lowercase"
                        >
                          {msg.notes ? 'изменить' : '+ добавить заметку'}
                        </button>
                      )}
                    </div>

                    {editingNotesId === msg.id ? (
                      <div className="space-y-2 mt-1">
                        <textarea
                          className="w-full bg-amber-50 border border-amber-300 rounded p-1.5 text-xs text-gray-900 focus:ring-1 focus:ring-amber-500"
                          rows={2}
                          placeholder="Договорились на вечер, требуется фильтр-осушитель..."
                          value={tempNotes}
                          onChange={(e) => setTempNotes(e.target.value)}
                        />
                        <div className="flex justify-end gap-1">
                          <button
                            onClick={() => setEditingNotesId(null)}
                            className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-[10px]"
                          >
                            Отмена
                          </button>
                          <button
                            onClick={() => handleSaveNotes(msg.id)}
                            className="px-2 py-1 bg-amber-600 text-white font-bold rounded text-[10px]"
                          >
                            Сохранить заметку
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div 
                        onClick={() => handleStartEditNotes(msg)}
                        className={`text-xs p-2 rounded cursor-pointer transition-colors ${
                          msg.notes ? 'bg-amber-50/80 text-amber-950 border border-amber-200 font-medium' : 'bg-gray-50 text-gray-400 italic text-[11px]'
                        }`}
                        title="Нажмите, чтобы редактировать заметку"
                      >
                        {msg.notes || 'Нажмите, чтобы написать личную заметку по этому клиенту...'}
                      </div>
                    )}
                  </div>

                  {/* Bottom row actions: Change status buttons & delete */}
                  <div className="mt-3 pt-2 border-t border-gray-100 flex flex-wrap items-center justify-between gap-1">
                    
                    <div className="flex items-center gap-1.5">
                      <span className="text-[10px] text-gray-400">Сменить статус:</span>
                      
                      {msg.status !== 'new' && (
                        <button
                          onClick={() => onUpdateStatus(msg.id, 'new')}
                          className="px-2 py-1 bg-red-50 hover:bg-red-100 text-red-700 rounded text-[10px] font-bold transition-colors"
                        >
                          Новое
                        </button>
                      )}

                      {msg.status !== 'in_progress' && (
                        <button
                          onClick={() => onUpdateStatus(msg.id, 'in_progress')}
                          className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded text-[10px] font-bold transition-colors"
                        >
                          В работу
                        </button>
                      )}

                      {msg.status !== 'completed' && (
                        <button
                          onClick={() => onUpdateStatus(msg.id, 'completed')}
                          className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded text-[10px] font-bold transition-colors"
                        >
                          Выполнено
                        </button>
                      )}

                      {msg.status !== 'cancelled' && (
                        <button
                          onClick={() => onUpdateStatus(msg.id, 'cancelled')}
                          className="px-2 py-1 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded text-[10px] transition-colors"
                        >
                          Отмена
                        </button>
                      )}
                    </div>

                    <button
                      onClick={() => {
                        if (confirm('Вы уверены, что хотите удалить эту заявку с номером?')) {
                          onDeleteMessage(msg.id);
                        }
                      }}
                      className="text-gray-400 hover:text-red-600 p-1 rounded transition-colors"
                      title="Удалить номер из базы"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                  </div>

                </div>
              );
            })
          )}
        </div>

        {/* Footer info banner */}
        <div className="p-4 bg-slate-100 text-center border-t border-gray-200 mt-auto">
          <p className="text-[11px] text-slate-500">
            🔒 <b>Конфиденциально</b>. Эта панель предназначена только для частного мастера. Номера защищены локальным хранилищем.
          </p>
        </div>

      </div>

    </div>
  );
};

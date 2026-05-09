import React from 'react';
import { ReviewItem } from '../data/initialData';
import { Star, MessageSquareQuote, PlusCircle, Trash2 } from 'lucide-react';

interface ReviewsProps {
  reviews: ReviewItem[];
  isEditMode: boolean;
  onUpdateReview: (id: string, field: keyof ReviewItem, value: any) => void;
  onAddReview: () => void;
  onDeleteReview: (id: string) => void;
}

export const Reviews: React.FC<ReviewsProps> = ({
  reviews,
  isEditMode,
  onUpdateReview,
  onAddReview,
  onDeleteReview,
}) => {
  return (
    <section className="py-16 bg-white" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
            <span>Средняя оценка 5.0</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight">
            Отзывы клиентов
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Реальные истории ремонта от жителей города и коммерческих предприятий
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div
              key={review.id}
              className={`rounded-2xl p-6 border relative flex flex-col justify-between ${
                isEditMode ? 'bg-amber-50/50 border-amber-300 ring-1 ring-amber-200' : 'bg-slate-50 border-gray-200'
              }`}
            >
              <div>
                {/* Header: Name & Date */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    {isEditMode ? (
                      <div>
                        <label className="block text-[10px] text-amber-800 font-bold uppercase">Имя клиента:</label>
                        <input
                          type="text"
                          className="bg-white border border-amber-400 rounded px-1 text-sm font-bold text-gray-900 w-full"
                          value={review.name}
                          onChange={(e) => onUpdateReview(review.id, 'name', e.target.value)}
                        />
                      </div>
                    ) : (
                      <h4 className="font-bold text-gray-900 text-base">{review.name}</h4>
                    )}

                    {isEditMode ? (
                      <div className="mt-1">
                        <label className="block text-[10px] text-amber-800 font-bold uppercase">Когда:</label>
                        <input
                          type="text"
                          className="bg-white border border-amber-400 rounded px-1 text-xs text-gray-600 w-24"
                          value={review.date}
                          onChange={(e) => onUpdateReview(review.id, 'date', e.target.value)}
                        />
                      </div>
                    ) : (
                      <span className="text-xs text-gray-400 block">{review.date}</span>
                    )}
                  </div>

                  {/* Stars Rating */}
                  <div className="flex items-center text-amber-400 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'}`}
                      />
                    ))}
                  </div>
                </div>

                {/* Appliance repaired */}
                <div className="mb-3 bg-blue-50/80 text-blue-900 text-xs px-2 py-1 rounded font-medium inline-block">
                  {isEditMode ? (
                    <input
                      type="text"
                      className="bg-white border border-amber-400 rounded px-1 text-xs text-blue-900 font-bold"
                      value={review.appliance}
                      onChange={(e) => onUpdateReview(review.id, 'appliance', e.target.value)}
                      title="Оборудование"
                    />
                  ) : (
                    <span>Отремонтировано: {review.appliance}</span>
                  )}
                </div>

                {/* Text */}
                <div className="text-xs sm:text-sm text-gray-700 italic leading-relaxed relative z-10">
                  {isEditMode ? (
                    <div>
                      <label className="block text-[10px] text-amber-800 font-bold uppercase mt-2">Текст отзыва:</label>
                      <textarea
                        className="w-full bg-white border border-amber-400 rounded p-1.5 text-xs text-gray-800 not-italic font-normal"
                        rows={4}
                        value={review.text}
                        onChange={(e) => onUpdateReview(review.id, 'text', e.target.value)}
                      />
                    </div>
                  ) : (
                    <p>«{review.text}»</p>
                  )}
                </div>
              </div>

              {/* Decorative icon quote */}
              <div className="mt-4 pt-3 border-t border-gray-200/60 flex items-center justify-between">
                <MessageSquareQuote className="w-5 h-5 text-gray-300" />
                <span className="text-[10px] uppercase font-bold text-emerald-600">✓ Проверенный заказ</span>

                {isEditMode && (
                  <button
                    onClick={() => onDeleteReview(review.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Удалить этот отзыв"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Add Review Trigger for Edit Mode */}
        {isEditMode && (
          <div className="mt-8 text-center bg-amber-50 border-2 border-dashed border-amber-300 rounded-xl p-6">
            <p className="text-xs text-amber-900 mb-3 font-medium">
              Вы находитесь в режиме редактирования. Вы можете добавить новый отзыв клиента:
            </p>
            <button
              onClick={onAddReview}
              className="inline-flex items-center gap-2 bg-amber-600 hover:bg-amber-500 text-white font-bold px-4 py-2 rounded-lg text-xs shadow transition-all mx-auto"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Добавить новый отзыв</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

import { useState, useEffect } from 'react';
import { 
  defaultSiteContent, 
  defaultDemoMessages, 
  SiteContent, 
  ServiceItem, 
  ReviewItem, 
  ClientMessage 
} from './data/initialData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ServicesList } from './components/ServicesList';
import { Gallery } from './components/Gallery';
import { Reviews } from './components/Reviews';
import { AboutMaster } from './components/AboutMaster';
import { Footer } from './components/Footer';
import { AdminPanel } from './components/AdminPanel';
import { EditPanelOverlay } from './components/EditPanelOverlay';

const CONTENT_STORAGE_KEY = 'refrigeration_master_site_content_v1';
const MESSAGES_STORAGE_KEY = 'refrigeration_master_messages_v1';

export default function App() {
  // 1. Site Content State persistent in localStorage
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    try {
      const saved = localStorage.getItem(CONTENT_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load content from localStorage", e);
    }
    return defaultSiteContent;
  });

  // 2. Incoming Messages with Phone numbers persistent in localStorage
  const [messages, setMessages] = useState<ClientMessage[]>(() => {
    try {
      const saved = localStorage.getItem(MESSAGES_STORAGE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.error("Failed to load messages from localStorage", e);
    }
    return defaultDemoMessages;
  });

  // 3. UI control states
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);

  // Sync state changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(siteContent));
    } catch (e) {
      console.error("Failed to save content", e);
    }
  }, [siteContent]);

  useEffect(() => {
    try {
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(messages));
    } catch (e) {
      console.error("Failed to save messages", e);
    }
  }, [messages]);

  // General field update
  const handleUpdateContent = (field: keyof SiteContent, value: any) => {
    setSiteContent((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Specific service update
  const handleUpdateService = (id: string, field: keyof ServiceItem, value: string) => {
    setSiteContent((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, [field]: value } : s)),
    }));
  };

  // Specific review update
  const handleUpdateReview = (id: string, field: keyof ReviewItem, value: any) => {
    setSiteContent((prev) => ({
      ...prev,
      reviews: prev.reviews.map((r) => {
        if (r.id === id) {
          let finalVal = value;
          if (field === 'rating') {
            finalVal = Math.min(5, Math.max(1, Number(value) || 5));
          }
          return { ...r, [field]: finalVal };
        }
        return r;
      }),
    }));
  };

  // Add new empty review
  const handleAddReview = () => {
    const newRev: ReviewItem = {
      id: `r-${Date.now()}`,
      name: "Новый клиент",
      date: "Сегодня",
      text: "Кликните сюда, чтобы написать текст отзыва о ремонте...",
      rating: 5,
      appliance: "Холодильник / Сплит-система"
    };
    setSiteContent((prev) => ({
      ...prev,
      reviews: [newRev, ...prev.reviews],
    }));
  };

  // Delete review
  const handleDeleteReview = (id: string) => {
    setSiteContent((prev) => ({
      ...prev,
      reviews: prev.reviews.filter((r) => r.id !== id),
    }));
  };

  // Reset to factory defaults
  const handleResetDefaults = () => {
    setSiteContent(defaultSiteContent);
    setMessages(defaultDemoMessages);
    try {
      localStorage.setItem(CONTENT_STORAGE_KEY, JSON.stringify(defaultSiteContent));
      localStorage.setItem(MESSAGES_STORAGE_KEY, JSON.stringify(defaultDemoMessages));
    } catch (e) {
      console.error("Failed to reset localStorage", e);
    }
    // Show quick alert
    alert("Настройки, тексты и заявки успешно сброшены до стандартных значений!");
  };

  // Handle submit phone request from the lead capture window
  const handleSubmitPhoneRequest = (phone: string, appliance: string, problemText: string) => {
    const timeString = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' });
    const newMsg: ClientMessage = {
      id: `msg-${Date.now()}`,
      phone: phone.trim(),
      applianceType: appliance,
      problem: problemText.trim() || 'Без описания',
      timestamp: `Сегодня, ${timeString}`,
      status: 'new',
      notes: ''
    };

    setMessages((prev) => [newMsg, ...prev]);

    // Optional subtle feedback
    console.log("New phone request stored successfully:", newMsg);
  };

  // Handle status changes inside Admin Panel
  const handleUpdateStatus = (id: string, status: ClientMessage['status']) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
  };

  // Handle master secret notes update
  const handleUpdateNotes = (id: string, notes: string) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, notes } : m))
    );
  };

  // Delete message item
  const handleDeleteMessage = (id: string) => {
    setMessages((prev) => prev.filter((m) => m.id !== id));
  };

  // Demo injection generator
  const handleGenerateDemoMessage = () => {
    const phones = [
      "+7 (918) 441-22-33",
      "+7 (960) 555-11-22",
      "+7 (903) 880-99-00",
      "+7 (926) 334-55-66",
      "+7 (999) 777-12-34",
    ];
    const appliances = [
      "Холодильник (Бытовой)",
      "Сплит-система",
      "Торговый холод",
      "Морозильный ларь",
    ];
    const problems = [
      "Течет внутренний блок, капает прямо на ковер.",
      "Компрессор включается на 3 секунды и сразу щелкает, не морозит.",
      "Намерзла огромная шуба льда в морозилке, пищит аварийная кнопка.",
      "Не включается с пульта, моргает красная лампочка таймера.",
      "Слабо дует холодным, в комнате +28 градусов.",
    ];

    const randomPhone = phones[Math.floor(Math.random() * phones.length)];
    const randomAppliance = appliances[Math.floor(Math.random() * appliances.length)];
    const randomProblem = problems[Math.floor(Math.random() * problems.length)];
    const timeStr = new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

    const generated: ClientMessage = {
      id: `demo-${Date.now()}`,
      phone: randomPhone,
      applianceType: randomAppliance,
      problem: randomProblem,
      timestamp: `Только что (${timeStr})`,
      status: 'new',
      notes: 'Сгенерировано для теста панели'
    };

    setMessages((prev) => [generated, ...prev]);
    setIsAdminOpen(true);
  };

  const unreadCount = messages.filter((m) => m.status === 'new').length;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-gray-900 selection:bg-blue-500 selection:text-white pb-16 sm:pb-0">
      
      {/* 1. Header with admin dashboard triggers and edit mode toggle */}
      <Header
        content={siteContent}
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onOpenAdmin={() => setIsAdminOpen(true)}
        unreadCount={unreadCount}
        onUpdateContent={handleUpdateContent}
      />

      {/* 2. Main Hero Section with lead capture window */}
      <Hero
        content={siteContent}
        isEditMode={isEditMode}
        onUpdateContent={handleUpdateContent}
        onSubmitPhoneRequest={handleSubmitPhoneRequest}
      />

      {/* Quick Interactive Demo Notice Strip for prompt reviewers */}
      <div className="bg-gradient-to-r from-blue-50 via-indigo-50 to-amber-50 py-3 px-4 border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <span className="bg-blue-600 text-white font-bold px-2 py-0.5 rounded text-[10px] uppercase">
              Инструкция
            </span>
            <span>
              Введите номер в форму выше — он моментально появится в <b>панели «Заявки»</b>. 
              Включите кнопку <b>«Редактировать»</b> в шапке, чтобы менять цены и тексты онлайн.
            </span>
          </div>
          
          <button
            onClick={handleGenerateDemoMessage}
            className="text-blue-700 hover:text-blue-900 font-bold bg-white border border-blue-200 px-3 py-1 rounded shadow-2xs hover:bg-blue-50 transition-all flex-shrink-0"
          >
            ⚡ Сгенерировать тестовый звонок
          </button>
        </div>
      </div>

      {/* 3. Services and Pricing List */}
      <ServicesList
        services={siteContent.services}
        isEditMode={isEditMode}
        onUpdateService={handleUpdateService}
        phone={siteContent.phone}
      />

      {/* 4. About Master and warranty proofs */}
      <AboutMaster
        content={siteContent}
        isEditMode={isEditMode}
        onUpdateContent={handleUpdateContent}
      />

      {/* 5. Authentic photo gallery of equipment */}
      <Gallery />

      {/* 6. Customer Reviews section */}
      <Reviews
        reviews={siteContent.reviews}
        isEditMode={isEditMode}
        onUpdateReview={handleUpdateReview}
        onAddReview={handleAddReview}
        onDeleteReview={handleDeleteReview}
      />

      {/* 7. Footer anchor */}
      <Footer
        content={siteContent}
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 8. Admin Control Panel Modal/Slide-over */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        messages={messages}
        onUpdateStatus={handleUpdateStatus}
        onUpdateNotes={handleUpdateNotes}
        onDeleteMessage={handleDeleteMessage}
        onGenerateDemoMessage={handleGenerateDemoMessage}
      />

      {/* 9. Floating Sticky Reminder Overlay for Edit Mode */}
      <EditPanelOverlay
        isEditMode={isEditMode}
        setIsEditMode={setIsEditMode}
        onResetDefaults={handleResetDefaults}
      />

    </div>
  );
}

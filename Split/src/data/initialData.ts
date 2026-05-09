export interface ServiceItem {
  id: string;
  title: string;
  price: string;
  category: 'fridge' | 'split' | 'commercial';
  duration: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  date: string;
  text: string;
  rating: number;
  appliance: string;
}

export interface ClientMessage {
  id: string;
  phone: string;
  applianceType: string;
  problem: string;
  timestamp: string;
  status: 'new' | 'in_progress' | 'completed' | 'cancelled';
  notes?: string;
}

export interface SiteContent {
  masterName: string;
  experienceYears: string;
  heroTitle: string;
  heroSubtitle: string;
  phone: string;
  workingHours: string;
  warrantyText: string;
  arrivalMinutes: string;
  aboutText: string;
  services: ServiceItem[];
  reviews: ReviewItem[];
}

export const defaultSiteContent: SiteContent = {
  masterName: "Алексей Смирнов",
  experienceYears: "12",
  heroTitle: "Частный мастер по ремонту холодильников и сплит-систем",
  heroSubtitle: "Срочный выезд за 45 минут. Ремонт любой сложности на дому с гарантией до 3 лет. Без посредников и переплат агентствам!",
  phone: "+7 (999) 123-45-67",
  workingHours: "Ежедневно с 8:00 до 22:00",
  warrantyText: "Официальная гарантия до 3 лет на все детали",
  arrivalMinutes: "45",
  aboutText: "Здравствуйте! Меня зовут Алексей, я профессиональный инженер-холодильщик. Уже более 12 лет занимаюсь установкой, обслуживанием и сложным ремонтом бытовых холодильников, сплит-систем и торгового холодильного оборудования. Работаю сам на себя, поэтому мои цены на 30-40% ниже, чем в сервисных центрах. Использую только оригинальные запчасти и профессиональный инструмент.",
  services: [
    {
      id: "s1",
      title: "Заправка фреоном (R410A, R22, R600a)",
      price: "от 1 200 ₽",
      category: "split",
      duration: "30-40 мин"
    },
    {
      id: "s2",
      title: "Чистка и антибактериальная обработка сплит-системы",
      price: "от 1 500 ₽",
      category: "split",
      duration: "45 мин"
    },
    {
      id: "s3",
      title: "Устранение течи кондиционера / дренажа",
      price: "от 1 000 ₽",
      category: "split",
      duration: "30 мин"
    },
    {
      id: "s4",
      title: "Замена компрессора холодильника",
      price: "от 3 500 ₽",
      category: "fridge",
      duration: "1.5-2 часа"
    },
    {
      id: "s5",
      title: "Замена термостата / датчиков температуры",
      price: "от 1 200 ₽",
      category: "fridge",
      duration: "30 мин"
    },
    {
      id: "s6",
      title: "Ремонт платы управления (электроники)",
      price: "от 2 500 ₽",
      category: "fridge",
      duration: "1 час"
    },
    {
      id: "s7",
      title: "Ремонт торговых холодильных витрин и шкафов",
      price: "от 2 000 ₽",
      category: "commercial",
      duration: "от 1 часа"
    },
    {
      id: "s8",
      title: "Замена пускозащитного реле",
      price: "от 900 ₽",
      category: "fridge",
      duration: "20 мин"
    }
  ],
  reviews: [
    {
      id: "r1",
      name: "Екатерина В.",
      date: "Вчера",
      text: "Перестал морозить холодильник Indesit, все продукты начали таять. Алексей приехал через 40 минут, быстро нашел утечку фреона, запаял и заправил. Очень вежливый и аккуратный мастер, спасибо огромное!",
      rating: 5,
      appliance: "Холодильник Indesit"
    },
    {
      id: "r2",
      name: "Михаил Дмитриевич",
      date: "4 дня назад",
      text: "Обращался по поводу обслуживания двух сплит-систем перед сезоном. Мастер промыл всё керхером, обработал химией от плесени. Кондиционеры стали дуть как новые, запаха сырости больше нет. Рекомендую!",
      rating: 5,
      appliance: "Сплит-системы LG"
    },
    {
      id: "r3",
      name: "ООО «Продукты у Дома»",
      date: "На прошлой неделе",
      text: "Сломалась холодильная витрина с молочкой. Алексей спас товар! Заменил сгоревший вентилятор и настроил контроллер. Оплата по факту, выдал гарантийную квитанцию.",
      rating: 5,
      appliance: "Торговая витрина"
    }
  ]
};

export const defaultDemoMessages: ClientMessage[] = [
  {
    id: "msg-1",
    phone: "+7 (926) 555-32-10",
    applianceType: "Холодильник (Бытовой)",
    problem: "Сильно шумит компрессор и намерзает лед на задней стенке.",
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    status: 'new',
    notes: 'Позвонить за 10 минут до выезда'
  },
  {
    id: "msg-2",
    phone: "+7 (903) 112-88-77",
    applianceType: "Сплит-система",
    problem: "Капает вода из внутреннего блока прямо на обои, дует теплым воздухом.",
    timestamp: new Date(Date.now() - 1000 * 60 * 180).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    status: 'in_progress',
    notes: 'Требуется чистка дренажа и дозаправка'
  },
  {
    id: "msg-3",
    phone: "+7 (915) 890-44-55",
    applianceType: "Морозильный ларь",
    problem: "Не включается после скачка напряжения в сети.",
    timestamp: "Вчера, 16:40",
    status: 'completed',
    notes: 'Заменено пусковое реле, клиент доволен'
  }
];

export const stockPhotos = [
  {
    url: "https://images.pexels.com/photos/27354189/pexels-photo-27354189.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Диагностика и ремонт внешних блоков сплит-систем",
    category: "split"
  },
  {
    url: "https://images.unsplash.com/photo-1581094288338-2314dddb7ece?auto=format&fit=crop&w=1200&q=80",
    title: "Профессиональные инструменты и точная заправка фреоном",
    category: "tools"
  },
  {
    url: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=1200&q=80",
    title: "Ремонт электронных модулей и систем No Frost",
    category: "fridge"
  },
  {
    url: "https://images.pexels.com/photos/27354192/pexels-photo-27354192.jpeg?auto=compress&cs=tinysrgb&fit=crop&h=627&w=1200",
    title: "Обслуживание магистралей и проверка герметичности",
    category: "split"
  }
];

type Story = {
  id: number | string;
  preview: string;
  desc?: string;
  logo?: string;
  isNew?: boolean;
  slides?: StorySlide[];
};

type StorySlide = {
  id: number | string;
  image: string;
  video?: string;
};

const stories: Story[] = [
  {
    id: 1,
    preview:
      "https://markweber.ru/wp-content/uploads/2025/03/iskstorypreview.jpg",

    desc: "ИСК &quot;Стройинжиниринг&quot; — крупный генеральный подрядчик при строительстве объектов различной сложности по всей России",
    logo: "https://markweber.ru/wp-content/uploads/2025/03/group-2085662481.webp",
    isNew: true,
    slides: [
      {
        id: 1,
        image:
          "https://markweber.ru/wp-content/uploads/2025/03/isk_1_stories_preview.webp",
        video:
          "https://markweber.ru/wp-content/uploads/2025/03/isk-reels-compressed.mp4",
      },
      {
        id: 2,
        image: "https://markweber.ru/wp-content/uploads/2025/03/02@2x-1.jpg",
      },
      {
        id: 3,
        image: "https://markweber.ru/wp-content/uploads/2025/03/01@2x-1.jpg",
      },
    ],
  },
  {
    id: 2,
    preview: "https://markweber.ru/wp-content/uploads/2025/04/aida2005-1.webp",
    desc: " Российский бренд компьютерной техники компании ICL-Техно, создающий современные и доступные устройства для работы, творчества и развлечений. Мы разработали современный информационный сайт, провели серию имиджевых фотосъемок и создали key-visual для линеек продуктов.",
    logo: "https://markweber.ru/wp-content/uploads/2025/04/dropped-image-1.webp",
    isNew: true,
    slides: [
      {
        id: 1,
        image:
          "https://markweber.ru/wp-content/uploads/2025/04/snimok-ekrana-2025-04-15-v-12.42.03.webp",
        video: "https://markweber.ru/wp-content/uploads/2025/04/osio-1.mp4",
      },
      {
        id: 2,
        image:
          "https://markweber.ru/wp-content/uploads/2025/04/aida2005-1.webp",
      },
      {
        id: 3,
        image:
          "https://markweber.ru/wp-content/uploads/2025/04/photo_2025-04-13-12.47.33.jpeg",
      },
      {
        id: 4,
        image:
          "https://markweber.ru/wp-content/uploads/2025/04/photo_2025-04-13-12.47.38.jpeg",
      },
    ],
  },
  {
    id: 3,
    preview: "https://markweber.ru/wp-content/uploads/2025/04/img_4056.webp",
    desc: "Брендинг для жилого комплекса бизнес-класса в г. Тверия Израиль",
    logo: "https://markweber.ru/wp-content/uploads/2025/04/group-2085662484.webp",
    slides: [
      {
        id: 1,
        image: "https://markweber.ru/wp-content/uploads/2025/04/img_4056.webp",
        video:
          "https://markweber.ru/wp-content/uploads/2025/04/6277510149033956670.mp4",
      },
      {
        id: 2,
        image: "https://markweber.ru/wp-content/uploads/2025/04/img_4056.webp",
      },
      {
        id: 3,
        image: "https://markweber.ru/wp-content/uploads/2025/04/img_4043.webp",
      },
      {
        id: 4,
        image: "https://markweber.ru/wp-content/uploads/2025/04/img_4045.webp",
      },
      {
        id: 5,
        image: "https://markweber.ru/wp-content/uploads/2025/04/img_4047.webp",
      },
    ],
  },
  {
    id: 4,
    preview: "https://markweber.ru/wp-content/uploads/2025/04/frame-6716-1.jpg",
    desc: "Сайт для резидента Skolkovo Fintech Hub, крупного интегратора и разработчика — компании iFellow",
    logo: "https://markweber.ru/wp-content/uploads/2025/04/group-2085662486.webp",
    slides: [
      {
        id: 1,
        image:
          "https://markweber.ru/wp-content/uploads/2025/04/ifellow_1st_preview.webp",
        video: "https://markweber.ru/wp-content/uploads/2025/04/v3.1.mp4",
      },
    ],
  },
  {
    id: 5,
    preview:
      "https://markweber.ru/wp-content/uploads/2025/03/frame-63567822-1.jpg",
    logo: "https://markweber.ru/wp-content/uploads/2025/03/pevek_1s_preview.png",
    slides: [
      {
        id: 1,
        image:
          "https://markweber.ru/wp-content/uploads/2025/03/pevek_1st_preview.webp",
        video: "https://markweber.ru/wp-content/uploads/2025/03/pevek-1.mp4",
      },
    ],
  },
  {
    id: 6,
    preview:
      "https://markweber.ru/wp-content/uploads/2025/03/group-6356363-1.jpg",
    logo: "https://markweber.ru/wp-content/uploads/2025/03/va_1st_preview.png",
    slides: [
      {
        id: 1,
        image:
          "https://markweber.ru/wp-content/uploads/2025/03/vipavenue_1st_preview.webp",
        video:
          "https://markweber.ru/wp-content/uploads/2025/03/vipavenue-reels-compressed.mp4",
      },
      {
        id: 2,
        image:
          "https://markweber.ru/wp-content/uploads/2025/03/group-6356363-1.webp",
      },
    ],
  },
  {
    id: 7,
    preview:
      "https://markweber.ru/wp-content/uploads/2025/04/frame-6356661.webp",
    logo: "https://markweber.ru/wp-content/uploads/2025/04/hv_preview.webp",
    desc: "Создание портала отзывов на автошколы России",
    slides: [
      {
        id: 1,
        image:
          "https://markweber.ru/wp-content/uploads/2025/04/hv_1st_preview-1-1.webp",
        video:
          "https://markweber.ru/wp-content/uploads/2025/04/hochu_vodit2.mp4",
      },
    ],
  },
];

export type { Story, StorySlide };

export default stories;

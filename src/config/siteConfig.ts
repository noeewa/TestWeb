// Site Configuration - All content and settings in one file
export const siteConfig = {
  // Basic Info
  siteName: "ALTHA.CRA",
  author: "Altha.cra",
  tagline: "Seorang Menjurian Spesialisais",
  
  // Profile
  profile: {
    name: "Altha.cra",
    role: "WEB & MATH",
    tagline: "Code Artist",
    description: "Digital diver that missing consciousness in the flow of AI distruption",
    location: "Indonesia, East Java",
    email: "fawgrahpics@gmail.com",
    profileImage: "/public/patung.jpg", // placeholder for now
    bannerImage: "/public/BG.jpg", // placeholder banner
  },

  // Scrolling Quotes
  quotes: [
    `🗝️"Mind is both prison and key."`,
    `⚡"Progress is swift, wisdom is slow."`,
    `🌐"Code is the poetry of logic."`,
    `🕊️"The canvas remembers what the heart forgets."`,
    `🪶"Imagination is timeless ink."`,
    `🔮 "The self awakens when silence speaks.`,
    `🌹 "Beauty is truth made visible."`,
    `🌙 "Dreams are whispers of the soul."`,
  ],

  // Mindscape Content
  mindscape: {
    title: "Mindscape",
    subtitle: "A collection of thoughts, experiences, and reflections from my journey in technology and life",
    sections: [
      {
        title: "Hi There",
        content: 
        [
          "Sedikit Basa-basi. Ada banyak pertanyaan ketika aku memasuki studi sistem informasi S1 bidang sistem informasi. sebelumnya, pada dasarnya aku tidak memiliki latar belakang Eksak sama sekali, hanya modal sekolah, dan suka gambar. Tidak kepikiran sama sekali rencana untuk masuk sistem informasi (waktu itu).", 
          "Tidak lama setelah akhir jenjang SMA, dengan waktu yang sedikit aku menetapkan sistem informasi pilihan pertama, dan itu konsisten sampai aku diterima univ.",
        ],
      },
      {
        title: "Why?",
        content: 
        [
          "Kenapa ambil sistem informasi? waktu itu terlalu abstraktif untuk bisa tau sistem informasi itu seperti apa. Tapi semakin memikirkan dan mencari tau, dunia IT itu lebih luas dibanding yang kubayangkan dulunya. Ini membuat dilema setelahnya karena aku juga tertarik pada dunia seni seperti Art, Grafis, 3D, dll. Ini membuat kepikiran apakah masih bisa mempertahankan keduanya? menjadi sedikit generalist misalnya?.",
          "Ketika semakin mecari tau seperti mencoba mempelajari coding, aku jadi semakin tau, pada akhirnya kita sendirilah yang menentukan frekuensinya, dan aspek skill yang ingin kita kuasai. kenyataan kalau kita memang tidak bisa melakukan semuanya.",
        ],
      },
      {
        title: "About A",
        content: [
          "Aku membagi dua hal untuk hal yang ingin kukuasai yaitu: seni dan teknologi. Aku mengambil gambar, lukisan dan grafis adalah hal yang paling dominan dari seni yang ingin kukusai. Lalu teknologi, sebenarnya banyak hal yang menarik, tapi untuk sekarang aku mengambil bidang 3D Enginer (Sebutan sendiri), sedikit Website Debelopment,  dan sekitarnya. ",
        ]
      },
      {
        title: "About B",
        content: 
        [
          "Ada satu pertanyaan lagi yaitu alasan kenapa aku tidak mengambil bidang seni yang notabennya juga sesuai minatku?",
          "Pertama adalah pekerjaan, membayangkan menggambar, desain, dll sebagai pekerjaan mungkin sedikit tidak sesuai, karena aku lebih menyukai menggambar sebagai hobi, dan terkadang melakukannya sesuai mood. Mungkin saja mendapatkan pekerjaan, atau proyek besar dengan uang banyak. Tapi, tidak ada bedanya dengan IT kalau diliat dari sisi nilai uangnya. Tapi sebenarnya alasan kedua-lah membuat pilihan-ku menjadi berimbang.",
          "Melihat perembangan Teknologi selalu menarik ketertarikan-ku. Tapi bukan berarti seni tidak ada aritnya menarik juga. Seni dan Teknologi adalah dunianya sendiri.",
          "Alasan kedua adalah lebih ke perencaan kedepannya. Untuk sekarang setidaknya ada beberapa gambaran untuk perencaanku. 1. Mendalami ranah WEB development, IT, yang secara umum menjadi Enginer, 2. Leading proyek dan bisinis, atau 3. Akdemisi.",
          "Yang terakhir adalah yang paling tidak diminati, tapi setidaknya seperti itulah expektasi yang menurutku ranah yang sudah memiliki dunianya masing-masing.",
          "Meski bagi diriku sebenarnnya dunia ini sangat relaitf, flexible, dan kita bisa jadi apa yang kita mau, dan tidak terpaut hal-hal seperti itu.",
          "2025-08-02 17:24",
          "Kesimpulannya?? Ada banyak hal yang tidak bisa kujelaskan dalam perencaanku.",
        ],
      }
    ]
  },

  // Gallery Content
  gallery: {
    title: "Portfolio Gallery",
    subtitle: "Seni menginspirasi teknologi, teknologi menginspirasi seni.",
    categories: ["All", "Art", "Web Design", "Algorithm", "UI/UX" ],
    projects: [
      // Frame Layout projects - will be populated with placeholder content
      
      {
        id: 1,
        title: "UI/UX",
        alt: "Gambarnya blm di pasang",
        category: "UI/UX", 
        type: "triple",
        placeholder: "/api/placeholder/800/500",
        description: "Clean and organized dashboard for data visualization",
        link:"https://drive.google.com/file/d/1-2ZHGdpWQlKOxTmmnWhQCcEc9kcRpzPF/view?usp=sharing",
        items: [
          { 
            id: "3a", 
            title: "Gambar 1",
            alt: "Timoria",
            placeholder: "/Image/Part1.png",
            description: "x",
            link: undefined,
          },
          { 
            id: "3b", 
            title: "Gambar 2",
            alt: "Himpoen", 
            placeholder: "/Image/Part2.png",
            description: "y",
            link: undefined,
          },
          { 
            id: "3c", 
            title: "Gambar 3",
            alt: "Lumia", 
            placeholder: "/Image/Part3.png",
            description: "z",
            link: undefined,
          }
        ]
      },
      {
        id: 2,
        title: "Logo Design",
        alt: "Gambarnya blm di pasang",
        category: "UI/UX",
        type: "triple",
        link: "https://www.behance.net/gallery/229689595/My-Portofolio",
        items: [
          { 
            id: "5a", 
            title: "El.Rey",
            alt: "Gambarnya blm di pasang",
            placeholder: "/Image/PF2.png",
            description: "Modern logo design with brand guidelines",
            link: undefined,
          },
          { 
            id: "5b", 
            title: "Head Logo",
            alt: "Gambarnya blm di pasang", 
            placeholder: "/Image/PF11.png",
            description: "Color palette and brand identity system",
            link: undefined,
          },
          { 
            id: "5c", 
            title: "Box Logo",
            alt: "Gambarnya blm di pasang", 
            placeholder: "/Image/PF14.jpg",
            description: "Typography system and font selection",
            link: undefined,
          }
        ]
      },
      {
        id: 3,
        title: "Portfolio Website",
        alt: "My Previous Project with AI",
        category: "Web Design",
        type: "single",
        placeholder: "Web.jpg",
        description: "My Previous Project with AI Generated",
        link: "https://drive.google.com/file/d/1-2ZHGdpWQlKOxTmmnWhQCcEc9kcRpzPF/view?usp=sharing",
      },
      {
        id: 4,
        alt: "Gambarnya blm di pasang",
        title: "Art",
        category: "Art",
        type: "single",
        placeholder: "/api/placeholder/800/600",
        description: "A sleek and modern web application with responsive design",
        link: "https://www.instagram.com/altha.cra/",
      },
      {
        id: 5,
        title: "Graphic Art",
        alt: "Gambarnya blm di pasang", 
        category: "Art",
        type: "single",
        placeholder: "/api/placeholder/400/600",
        description: "Gratefull poster",
        link: undefined,
      },
      {
        id: 6,
        title: "E-commerce Platform",
        alt: "Gambarnya blm di pasang",
        category: "Web Design",
        type: "single",
        placeholder: "/api/placeholder/800/600",
        description: "Complete e-commerce solution with modern design",
        link: undefined,
      },
      {
        id: 7,
        title: "Web System",
        alt: "Gambarnya blm di pasang",
        category: "Algorithm", 
        type: "double",
        items: [
          { 
            id: "6a",
            alt: "Gambarnya blm di pasang",
            title: "iOS Version", 
            placeholder: "/api/placeholder/300/600",
            description: "iOS application design with native elements",
            link: undefined,
          },
          { 
            id: "6b",
            alt: "Gambarnya blm di pasang", 
            title: "Android Version", 
            placeholder: "/api/placeholder/300/600",
            description: "Android application with material design",
            link: undefined,
          }
        ]
      },
      {
        id: 8,
        title: "Social Media App",
        alt: "Gambarnya blm di pasang",
        category: "UI/UX",
        type: "single",
        placeholder: "/api/placeholder/400/600",
        description: "Social media application with engaging user experience",
        link: undefined,
      }
    ]
  },

  // About Me
  about: {
    title: "About Me",
    description: "Atensi terhadap Seni, Teknologi, dan Matematika.",
    details: "Digital diver that missing consciousness in the flow of AI distruption",
    currentWork: "Currently based in Indonesia, work with Laptop and Internet",
    skills: {
      frontend: {
        title: "Frontend Development",
        expert: ["Irelia in League of Legends"],
        intermediate: [ "Affinity Designer"],
        beginner: ["Typescript", "Javascript Beginner", "Python Beginner", "Babylon.JS", "Figma", "Vite", "React", "Tailwind CSS"]
      },
      backend: {
        title: "Backend Development", 
        skills: ["Firebase Beginner",]
      }
    }
  },

  // Workflow
  workflow: {
    title: "Work Flow",
    subtitle: "What can I do?",
    items: [
      {
        title: "Handle Website Building wiht AI Generator",
        description: "I have an experienced in building and making using Javascript and some litte Typescript. I can handle code and dealing with stuff code that AI generated."
      },
      {
        title: "This, intended to be blank", 
        description: "Maybe I will fill it with something useful later"
      },
      {
        title: "Art & Graphics",
        description: "Digital art creation, and visual design work."
      }
    ]
  },

  // Timeline
  timeline: {
    title: "TIMELINE",
    subtitle: "My professional journey",
    items: [
      {
        year: "2022",
        title: "Started Learning",
        description: "Coming Soon"
      },
      {
        year: "2025", 
        title: "First Projects",
        description: "Coming Soon"
      },
      {
        year: "2025",
        title: "Expanding Skills",
        description: "Coming Soon"
      },
      {
        year: "2025",
        title: "Professional Growth",
        description: "Coming Soon"
      },
      {
        year: "2025",
        title: "Current Focus",
        description: "Coming Soon"
      }
    ]
  },

  // Contact
  contact: {
    title: "Let's Work Together",
    description: "I'm always interested in new opportunities and interesting projects. Whether you have a question or just want to say hi, feel free to reach out.",
    cta: "Start a Conversation"
  },

  // Navigation
  navigation: [
    { name: "Mindscape", href: "/mindscape" },
    { name: "Gallery", href: "/gallery" }
  ],

  // Footer
  footer: {
    copyright: "© 2025 Altha.cra. All rights reserved.",
    note: "Mansuia Dunia"
  }
};
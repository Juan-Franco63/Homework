// src/menuData.js

const menuData = [
  {
    title: "Home",
    link: "/home",
    component: "HomePage",
    icon: "home",  // Icono Font Awesome
    subMenus: [],
  },
  {
    title: "About",
    link: "/about",
    component: "AboutPage",
    icon: "info-circle",  // Icono Font Awesome
    subMenus: [
      {
        title: "Team",
        link: "/about/team",
        component: "TeamPage",
        icon: "users",  // Icono Font Awesome
        subMenus: [],
      },
      {
        title: "Company",
        link: "/about/company",
        component: "CompanyPage",
        icon: "building",  // Icono Font Awesome
        subMenus: [],
      },
    ],
  },
  {
    title: "Services",
    link: "/services",
    component: "ServicesPage",
    icon: "cogs",  // Icono Font Awesome
    subMenus: [
      {
        title: "Web Development",
        link: "/services/web",
        component: "WebDevPage",
        icon: "laptop-code",  // Icono Font Awesome
        subMenus: [],
      },
      {
        title: "App Development",
        link: "/services/app",
        component: "AppDevPage",
        icon: "mobile-alt",  // Icono Font Awesome
        subMenus: [
          {
            title: "Android",
            link: "/services/app/android",
            component: "AndroidPage",
            icon: "android",  // Icono Font Awesome
            subMenus: [],
          },
          {
            title: "iOS",
            link: "/services/app/ios",
            component: "IOSPage",
            icon: "apple",  // Icono Font Awesome
            subMenus: [],
          },
        ],
      },
    ],
  },
];

export default menuData;

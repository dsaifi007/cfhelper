module.exports = {
  // i18n: {
  //   locales: ['en', 'uk', 'de'],
  //   defaultLocale: 'en',
  // },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },

  //  i18n: {

  //   locales: ['en', 'uk', 'de'],
  //   defaultLocale: 'en',
  //   domains: [
  //     {
  //       domain: 'localhost',
  //       defaultLocale: 'en',
  //     },
  //     {
  //       domain: 'localhost',
  //       defaultLocale: 'uk',
  //     },
  //     {
  //       domain: 'localhost',
  //       defaultLocale: 'de',
  //       http: false,
  //     },
  //   ],
  // },
}
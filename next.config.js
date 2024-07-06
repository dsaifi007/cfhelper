module.exports = {
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
  i18n: {
    locales: ['en-US', 'ru', 'uk'],
    defaultLocale: 'en-US',
    domains: [
      {
        domain: 'localhost.com',
        defaultLocale: 'en-US',
        http: true,
      },
      {
        domain: 'localhost.ru',
        defaultLocale: 'ru',
        http: true,
      },
      {
        domain: 'localhost.uk',
        defaultLocale: 'uk',
        http: true,
      },
      // {
      //   domain: 'cfhelper.com',
      //   defaultLocale: 'en-US',
      // },
      // {
      //   domain: 'cfhelper.com',
      //   defaultLocale: 'ru',
      // },
      // {
      //   domain: 'cfhelper.com',
      //   defaultLocale: 'uk',
      // },
    ]
  }
}
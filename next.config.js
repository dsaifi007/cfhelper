module.exports = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'backend.dealsquad.pics',
        port: '',
        pathname: '/storage/uploads/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8001',
        pathname: '/storage/uploads/**',
      },
    ],
  },
}
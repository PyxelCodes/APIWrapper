module.exports = {
  reactStrictMode: true,
  webpack5: true,
  async rewrites () {
    return [
      {
        source: '/api/:path*',
        destination: 'https://status.pyxel.ml/:path*'
      }
    ]
  }
};

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  experimental: {
    appDir: true,
  },
  redirects: () => [
    {
      source: '/resources/:path',
      destination: '/toolkit/:path',
      permanent: true,
    },
  ],
  rewrites: async () => {
    // Take care to escape these for RegExp use
    const domains = [
      'localhost',
      'enterpriseinnovationtoolkit.com',
      'ajsdx.com',
      'vercel.app',
    ]
    return [
      {
        source: '/',
        has: [
          {
            type: 'host',
            value: `(?<organization>.+?)(\.(${domains.join('|')}))?$`,
          },
        ],
        destination: '/:organization',
      },
      {
        source: '/api/:path*',
        has: [
          {
            type: 'host',
            value: `(?<organization>.+?)(\.(${domains.join('|')}))?$`,
          },
        ],
        destination: '/api/:organization/:path*',
      },
      {
        source: '/:path((?!sysadmin).+)*',
        has: [
          {
            type: 'host',
            value: `(?<organization>.+?)(\.(${domains.join('|')}))?$`,
          },
        ],
        destination: '/:organization/:path*',
      },
    ]
  },
}

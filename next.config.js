// next.config.js

const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ['cook.fnr.sndimg.com', 'images.unsplash.com', 'plus.unsplash.com'],
        // Add other image domains as needed
        // remotePatterns: [
        //   {
        //     protocol: 'https',
        //     hostname: 'images.unsplash.com',
        //   },
        // ],
    },
}

module.exports = nextConfig

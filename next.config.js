const withPlugins = require("next-compose-plugins");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

const withTM = require("next-transpile-modules")(["gsap"]);

/** @type {import('next/dist/next-server/server/config').NextConfig} */
let nextConfig = {
  // https://reactjs.org/docs/strict-mode.html
  reactStrictMode: true,

  experimental: {
    esmExternals: true,
  },

  // https://nextjs.org/docs/messages/webpack5
  webpack5: true,

  images: {
    domains: [process.env.ASSETS_DOMAIN],
    minimumCacheTTL: 31536000,
  },

  webpack: (config, options) => {
    // https://react-svgr.com/
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  removeViewBox: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

nextConfig = withTM(nextConfig);

module.exports = withPlugins([withBundleAnalyzer], nextConfig);

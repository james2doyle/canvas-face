/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: {
      url: '/',
      static: true
    },
    src: { url: '/dist' },
  },
  plugins: [
    [
      '@snowpack/plugin-typescript',
      {
        /* Yarn PnP workaround: see https://www.npmjs.com/package/@snowpack/plugin-typescript */
        ...(process.versions.pnp ? { tsc: 'yarn pnpify tsc' } : {}),
      },
    ],
  ],
  routes: [
    /* Enable an SPA Fallback in development: */
    // {"match": "routes", "src": ".*", "dest": "/index.html"},
  ],
  optimize: {
    /* Example: Bundle your final build: */
    // bundle: true,
    // minify: true,
    target: 'es2018',
  },
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    out: 'docs',
    baseUrl: process.env.NODE_ENV === 'development' ? '/' : '/canvas-face',
    metaUrlPath: './',
  },
};

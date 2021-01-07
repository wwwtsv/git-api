module.exports = {
  experiments: {
    routes: [
      {"src": ".*", "dest": "/index.html", "match": "routes"}
    ]
  },
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  alias: {
    "@components": "./src/components",
    "@app": "./src",
  },
  plugins: ["@snowpack/plugin-typescript", "@snowpack/plugin-vue", "@snowpack/plugin-sass"],
};

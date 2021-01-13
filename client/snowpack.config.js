module.exports = {
  alias: {
    "@components": "./src/components",
    "@app": "./src",
  },
  experiments: {
    routes: [{ src: ".*", dest: "/index.html", match: "routes" }],
  },
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  plugins: ["@snowpack/plugin-typescript", "@snowpack/plugin-vue", "@snowpack/plugin-sass", "@snowpack/plugin-dotenv"],
};

module.exports = {
  mount: {
    public: { url: "/", static: true },
    src: { url: "/dist" },
  },
  alias: {
    components: "./src/components",
    "@app": "./src",
  },
  plugins: ["@snowpack/plugin-typescript", "@snowpack/plugin-vue"],
};

module.exports = {
  spec: "tests/**/*.ts",
  require: "ts-node/register",
  diff: true,
  extension: ["ts"],
  package: "./package.json",
  reporter: "spec",
  timeout: 11000,
  "watch-files": ["src", "tests/**/*.ts"],
  "watch-ignore": ["node_modules"],
};

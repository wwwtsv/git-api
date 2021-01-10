import * as path from "path";
import { expect } from "chai";
import {
  getRepos,
  getCommits,
  getDiff,
  getRepositoryContent,
  getFileContent,
  deleteRepository,
  downloadRepository,
  getLogForRepositoryContent,
} from "../../src/services/git";

describe("Service Git", () => {
  const pathToRepo = path.resolve(__dirname, "../../repos");
  describe("getRepos", () => {
    it("Should return repo files", async () => {
      const files = await getRepos(pathToRepo);
      expect(files).to.be.an("array").that.does.include("preact");
    });
  });
  describe("getCommits", () => {
    it("Should return commit list with date and name", async () => {
      const commits = await getCommits(pathToRepo, "preact", "cdb709e7");
      expect(commits)
        .to.be.an("string")
        .that.does.include(
          '{"hash":"9a422017fec6dab287c77c3aef63c7b2fef0c7e1","message":"🏌️‍♂️ rAF check","date":"Tue May 26 09:38:28 2020 -0400"}'
        );
    });
  });
  describe("getDiff", () => {
    it("Should return diff in one line", async () => {
      const diff = await getDiff(pathToRepo, "preact", "cdb709e7");
      expect(diff).to.have.string("!onChangeInputType(props.type)");
    });
  });
  describe("getRepositoryContent", () => {
    it("Should return file list", async () => {
      const files = await getRepositoryContent(pathToRepo, "preact", "f955cfcc:src/");
      expect(files).to.be.an("array").that.does.include("create-element.js");
    });
  });
  describe("getLogForRepositoryContent", () => {
    it("Should return git log for repository content", async () => {
      const logForRepo = await getLogForRepositoryContent(pathToRepo, "preact", "src", ["options.js"]);
      expect(logForRepo).to.be.an("array").to.deep.include({
        name: "options.js",
        meta:
          '{"hash":"6e6bf387","message":"refactor vnodeId to live on options","committer":"Jovi De Croock","date":"Sun Nov 1 22:28:50 2020 +0100"}',
      });
    });
  });
  describe("getFileContent", () => {
    it("Should return file content", async () => {
      const content = await getFileContent(pathToRepo, "preact", "f955cfcc", "src/component.js");
      expect(content).to.have.string("export function Component(props, context) {");
    });
  });
  /*describe("deleteRepository", () => {
    it("Should return delete repository name", async () => {
      const deleteRepo = await deleteRepository(pathToRepo, "preact");
      expect(deleteRepo).to.have.string("Repository 'preact' delete");
    });
  });
  describe("downloadRepository", () => {
    it("Should return download repository name", async () => {
      const downloadRepo = await downloadRepository(pathToRepo, "https://github.com/preactjs/preact.git");
      expect(downloadRepo).to.have.string("Repository 'preact' download");
    });
  });*/
});

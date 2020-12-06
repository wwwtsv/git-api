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
          '{"hash":"b9d457f9fc54881de4dfbc86287cd3487d468597","message":"🏌️‍♂️ rAF check","date":"Tue May 26 15:50:20 2020 +0200"}'
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
      const files = await getRepositoryContent(pathToRepo, "preact", "f955cfcc", "src/");
      expect(files).to.be.an("array").that.does.include("create-element.js");
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

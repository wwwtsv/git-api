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
      const commits = await getCommits(pathToRepo, "preact", "master", "", "40");
      expect(commits)
        .to.be.an("string")
        .that.does.include(
          '{"hash":"f955cfcceb50d504faa7c05a95065512cf900e57","message":"Adding defaultValue support in select tag","date":"Wed Nov 25 16:18:58 2020 +0100"'
        );
    });
  });
  describe("getDiff", () => {
    it("Should return diff in one line", async () => {
      const diff = await getDiff(pathToRepo, "preact", "master");
      expect(diff).to.have.string("b/benches/src/03_update10th1k_x16.html");
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
  describe("deleteRepository", () => {
    it("Should return delete repository name", async () => {
      // @ts-ignore
      const deleteRepository = await deleteRepository(pathToRepo, "preact");
      expect(deleteRepository).to.have.string("Repository 'preact' delete");
    });
  });
  describe("downloadRepository", () => {
    it("Should return download repository name", async () => {
      // @ts-ignore
      const downloadRepository = await downloadRepository(pathToRepo, "react");
      expect(downloadRepository).to.have.string("Repository 'react' download");
    });
  });
});

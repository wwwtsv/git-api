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
    it("Should return commit list with date and name", () => {
      const commits = await getCommits(pathToRepo, "preact", "master");
      expect(commits).to.deep.include({
        commit: "0fc3b21acc5f044e0e676d3be547313b026beded",
        abbreviated_commit: "0fc3b21a",
        tree: "70271733e28c0b35eefa3829a4c69a49d99b64ce",
        abbreviated_tree: "70271733",
        parent: "a6e15286ca845491c6c942bbea1104acde8ecff4",
        abbreviated_parent: "a6e15286",
        refs: "",
        encoding: "",
        subject: "Checking for null explicitly",
        sanitized_subject_line: "Checking-for-null-explicitly",
        body: "",
        commit_notes: "",
        verification_flag: "N",
        signer: "",
        signer_key: "",
        author: {
          name: "rafi993",
          email: "rafi993@protonmail.com",
          date: "Wed, 25 Nov 2020 17:36:07 +0530",
        },
        commiter: {
          name: "rafi993",
          email: "rafi993@protonmail.com",
          date: "Wed, 25 Nov 2020 17:36:07 +0530",
        },
      });
    });
  });
  describe("getDiff", () => {
    it("Should return diff in one line", () => {
      const diff = getDiff(pathToRepo, "preact", "master");
      expect(diff).to.have.string("b/benches/src/03_update10th1k_x16.html");
    });
  });
  describe("getRepositoryContent", () => {
    it("Should return file list", () => {
      const files = getRepositoryContent();
    });
  });
});

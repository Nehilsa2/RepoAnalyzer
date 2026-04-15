import { getSessionToken } from "./auth";

export const BASE_URL = "http://localhost:5000/api";

const buildHeaders = () => {
  const token = getSessionToken();

  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
};

const parseJsonOrThrow = async (res) => {
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const error = new Error(data.error || "Request failed");
    error.code = data.code;
    error.status = res.status;
    throw error;
  }

  return data;
};

export const startGithubLogin = (redirectPath = "/") => {
  window.location.href = `${BASE_URL}/auth/github?redirect=${encodeURIComponent(redirectPath)}`;
};

export const getCurrentUser = async () => {
  const res = await fetch(`${BASE_URL}/auth/me`, {
    method: "GET",
    headers: buildHeaders(),
  });

  return parseJsonOrThrow(res);
};

export const logout = async () => {
  const res = await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    headers: buildHeaders(),
  });

  return parseJsonOrThrow(res);
};

export const getMyRepos = async () => {
  const res = await fetch(`${BASE_URL}/repo/my-repos`, {
    method: "GET",
    headers: buildHeaders(),
  });

  return parseJsonOrThrow(res);
};

export const getRepoFiles = async (repoUrl) => {
  const res = await fetch(`${BASE_URL}/repo/get-repo-files`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ repoUrl }),
  });

  return parseJsonOrThrow(res);
};

export const analyzeFiles = async (repoUrl, selectedFiles) => {
  const res = await fetch(`${BASE_URL}/analysis/analyze-files`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ repoUrl, selectedFiles }),
  });

  return parseJsonOrThrow(res);
};

export const raiseIssues = async (repoUrl, analysisResults) => {
  const res = await fetch(`${BASE_URL}/analysis/raise-issues`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({ repoUrl, analysisResults }),
  });

  return parseJsonOrThrow(res);
};

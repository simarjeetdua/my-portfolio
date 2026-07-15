// GitHub API types and fetch helpers

export interface GitHubUser {
  login: string;
  name: string;
  bio: string;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  topics: string[];
  updated_at: string;
  created_at: string;
  open_issues_count: number;
  watchers_count: number;
  default_branch: string;
  languages_url: string;
}

export interface GitHubLanguages {
  [language: string]: number;
}

const GITHUB_USERNAME = "simarjeetdua";
const BASE_URL = "https://api.github.com";

const headers: HeadersInit = {
  Accept: "application/vnd.github+json",
};

export async function fetchGitHubUser(): Promise<GitHubUser | null> {
  try {
    const res = await fetch(`${BASE_URL}/users/${GITHUB_USERNAME}`, {
      headers,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export async function fetchSingleRepo(repoName: string): Promise<GitHubRepo | null> {
  try {
    const res = await fetch(
      `${BASE_URL}/repos/${GITHUB_USERNAME}/${repoName}`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

export async function fetchRepoLanguages(repoName: string): Promise<GitHubLanguages> {
  try {
    const res = await fetch(
      `${BASE_URL}/repos/${GITHUB_USERNAME}/${repoName}/languages`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return {};
    return res.json();
  } catch {
    return {};
  }
}

export async function fetchRepoCommits(repoName: string) {
  try {
    const res = await fetch(
      `${BASE_URL}/repos/${GITHUB_USERNAME}/${repoName}/commits?per_page=5`,
      { headers, next: { revalidate: 3600 } }
    );
    if (!res.ok) return [];
    return res.json();
  } catch {
    return [];
  }
}

export function getTopLanguages(repos: GitHubRepo[]): Record<string, number> {
  const langCount: Record<string, number> = {};
  repos.forEach((repo) => {
    if (repo.language) {
      langCount[repo.language] = (langCount[repo.language] || 0) + 1;
    }
  });
  return Object.fromEntries(
    Object.entries(langCount)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
  );
}

export const GITHUB_USERNAME_CONST = GITHUB_USERNAME;

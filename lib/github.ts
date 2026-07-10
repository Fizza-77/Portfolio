import { siteConfig } from "@/lib/site-config";

const GITHUB_API = "https://api.github.com";
const REVALIDATE_SECONDS = 3600;

export interface GitHubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  fork: boolean;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  owner_login: string;
  isCollaboration?: boolean;
}

interface GitHubApiRepo extends GitHubRepo {
  owner: {
    login: string;
  };
}

export type GitHubErrorCode = "rate_limit" | "not_found" | "network" | "unknown";

export interface GitHubProfileData {
  repos: GitHubRepo[];
}

export type GitHubFetchResult =
  | { success: true; data: GitHubProfileData }
  | { success: false; error: GitHubErrorCode; message: string };

function getHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  return headers;
}

type GithubRequestResult<T> = {
  data: T | null;
  error: GitHubErrorCode | null;
  message: string;
};

async function githubFetch<T>(path: string): Promise<GithubRequestResult<T>> {
  try {
    const response = await fetch(`${GITHUB_API}${path}`, {
      headers: getHeaders(),
      next: { revalidate: REVALIDATE_SECONDS, tags: ["github"] },
    });

    if (response.status === 403) {
      const remaining = response.headers.get("x-ratelimit-remaining");
      if (remaining === "0") {
        return {
          data: null,
          error: "rate_limit",
          message:
            "GitHub API rate limit reached. Data will refresh automatically soon.",
        };
      }
    }

    if (response.status === 404) {
      return {
        data: null,
        error: "not_found",
        message: "GitHub profile not found.",
      };
    }

    if (!response.ok) {
      return {
        data: null,
        error: "unknown",
        message: `GitHub API responded with status ${response.status}.`,
      };
    }

    const data = (await response.json()) as T;
    return { data, error: null, message: "" };
  } catch {
    return {
      data: null,
      error: "network",
      message: "Unable to reach GitHub. Please try again later.",
    };
  }
}

interface GitHubReadme {
  content: string;
  encoding: string;
}

function decodeReadmeContent(readme: GitHubReadme): string {
  if (readme.encoding !== "base64") {
    return "";
  }

  return Buffer.from(readme.content, "base64").toString("utf8");
}

function extractReadmeDescription(content: string): string | null {
  const lines = content.split(/\r?\n/);
  const paragraphs: string[] = [];
  let current = "";

  for (const line of lines) {
    const trimmed = line.trim();

    if (!trimmed) {
      if (current) {
        paragraphs.push(current.trim());
        current = "";
      }
      continue;
    }

    if (
      trimmed.startsWith("#") ||
      trimmed.startsWith("```") ||
      trimmed.startsWith("![") ||
      trimmed.startsWith("[") ||
      trimmed.startsWith("|") ||
      trimmed.startsWith("- ") ||
      trimmed.startsWith("* ")
    ) {
      if (current) {
        paragraphs.push(current.trim());
        current = "";
      }
      continue;
    }

    current = current ? `${current} ${trimmed}` : trimmed;
  }

  if (current) {
    paragraphs.push(current.trim());
  }

  const description = paragraphs.find((paragraph) => paragraph.length > 20);
  if (!description) {
    return null;
  }

  return description
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/\*([^*]+)\*/g, "$1")
    .trim();
}

async function getReadmeDescription(
  owner: string,
  repo: string,
): Promise<string | null> {
  const result = await githubFetch<GitHubReadme>(`/repos/${owner}/${repo}/readme`);

  if (result.error || !result.data) {
    return null;
  }

  return extractReadmeDescription(decodeReadmeContent(result.data));
}

async function enrichReposWithReadmeDescriptions(
  repos: GitHubRepo[],
): Promise<GitHubRepo[]> {
  return Promise.all(
    repos.map(async (repo) => {
      if (repo.description?.trim()) {
        return repo;
      }

      const readmeDescription = await getReadmeDescription(
        repo.owner_login,
        repo.name,
      );

      if (!readmeDescription) {
        return repo;
      }

      return {
        ...repo,
        description: readmeDescription,
      };
    }),
  );
}

function normalizeRepo(
  repo: GitHubApiRepo,
  isCollaboration = false,
): GitHubRepo {
  return {
    id: repo.id,
    name: repo.name,
    description: repo.description,
    html_url: repo.html_url,
    fork: repo.fork,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    updated_at: repo.updated_at,
    owner_login: repo.owner.login,
    isCollaboration,
  };
}

async function getCollaborativeRepos(): Promise<GitHubRepo[]> {
  const repos = await Promise.all(
    siteConfig.collaborativeRepos.map(async ({ owner, repo }) => {
      const result = await githubFetch<GitHubApiRepo>(`/repos/${owner}/${repo}`);
      if (result.error || !result.data) {
        return null;
      }

      return normalizeRepo(result.data, true);
    }),
  );

  return repos.filter((repo): repo is GitHubRepo => repo !== null);
}

function normalizeRepoName(name: string): string {
  return name.toLowerCase().replace(/[\s/_-]+/g, "");
}

function findRepoByName(
  name: string,
  repos: GitHubRepo[],
): GitHubRepo | undefined {
  const target = normalizeRepoName(name);
  return repos.find((repo) => normalizeRepoName(repo.name) === target);
}

async function getFeaturedRepos(
  username: string,
  eligibleRepos: GitHubRepo[],
): Promise<GitHubRepo[]> {
  const repos = await Promise.all(
    siteConfig.featuredRepos.map(async (featuredName) => {
      const existing = findRepoByName(featuredName, eligibleRepos);
      if (existing) {
        return existing;
      }

      const result = await githubFetch<GitHubApiRepo>(
        `/repos/${username}/${featuredName}`,
      );
      if (result.error || !result.data) {
        return null;
      }

      return normalizeRepo(result.data);
    }),
  );

  return repos.filter((repo): repo is GitHubRepo => repo !== null);
}

export async function getGitHubProfileData(
  username: string = siteConfig.githubUsername,
): Promise<GitHubFetchResult> {
  const reposResult = await githubFetch<GitHubApiRepo[]>(
    `/users/${username}/repos?sort=updated&per_page=100`,
  );

  if (reposResult.error || !reposResult.data) {
    return {
      success: false,
      error: reposResult.error ?? "unknown",
      message: reposResult.message || "Failed to fetch GitHub repositories.",
    };
  }

  const collaborativeRepos = await getCollaborativeRepos();
  const collaborativeIds = new Set(collaborativeRepos.map((repo) => repo.id));

  const excludedNames = new Set(
    siteConfig.excludedRepos.map((name) => name.toLowerCase()),
  );
  const featuredNames = new Set(
    siteConfig.featuredRepos.map((name) => normalizeRepoName(name)),
  );

  const eligibleRepos = reposResult.data
    .filter(
      (repo) =>
        !repo.fork &&
        !collaborativeIds.has(repo.id) &&
        !excludedNames.has(repo.name.toLowerCase()),
    )
    .map((repo) => normalizeRepo(repo));

  const featuredRepos = await getFeaturedRepos(username, eligibleRepos);
  const featuredIds = new Set(featuredRepos.map((repo) => repo.id));

  const ownRepos = [
    ...featuredRepos,
    ...eligibleRepos
      .filter((repo) => !featuredIds.has(repo.id))
      .sort(
        (a, b) =>
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
      )
      .slice(0, Math.max(0, 6 - featuredRepos.length)),
  ];

  const repos = await enrichReposWithReadmeDescriptions(
    [...collaborativeRepos, ...ownRepos].sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime(),
    ),
  );

  return {
    success: true,
    data: {
      repos,
    },
  };
}

export function formatRepoUpdatedDate(updatedAt: string): string {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(updatedAt));
}

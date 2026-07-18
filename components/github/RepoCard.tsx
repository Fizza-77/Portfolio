import { ExternalLink, GitFork, Star } from "lucide-react";
import { formatRepoUpdatedDate, type GitHubRepo } from "@/lib/github";

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  Python: "#3572a5",
  Java: "#b07219",
  Go: "#00add8",
  Rust: "#dea584",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Vue: "#41b883",
  PHP: "#4f5d95",
  Ruby: "#701516",
  Swift: "#f05138",
  Kotlin: "#a97bff",
  C: "#555555",
  "C++": "#f34b7d",
  "C#": "#178600",
};

type RepoCardProps = {
  repo: GitHubRepo;
};

export default function RepoCard({ repo }: RepoCardProps) {
  const languageColor = repo.language
    ? (LANGUAGE_COLORS[repo.language] ?? "#a855f7")
    : null;

  return (
    <article className="group flex h-full flex-col rounded-xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-purple-500/30 hover:bg-white/[0.05]">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div className="min-w-0">
          {repo.isCollaboration && (
            <p className="mb-1 text-xs font-medium uppercase tracking-wide text-purple-400">
              Collaborator · @{repo.owner_login}
            </p>
          )}
          <h3 className="text-lg font-semibold tracking-tight text-white group-hover:text-purple-200">
            {repo.name}
          </h3>
        </div>
        <ExternalLink
          className="size-4 shrink-0 text-white/30 transition-colors duration-300 group-hover:text-purple-400"
          strokeWidth={1.5}
          aria-hidden
        />
      </div>

      <p className="mb-4 line-clamp-2 flex-1 text-sm leading-relaxed text-white/60">
        {repo.description ?? "No description provided."}
      </p>

      <div className="mb-4 flex flex-wrap items-center gap-4 text-sm text-white/50">
        {repo.language && (
          <span className="inline-flex items-center gap-1.5">
            <span
              className="size-2.5 rounded-full"
              style={{ backgroundColor: languageColor ?? "#a855f7" }}
              aria-hidden
            />
            {repo.language}
          </span>
        )}
        <span className="inline-flex items-center gap-1">
          <Star className="size-3.5" strokeWidth={1.5} aria-hidden />
          <span aria-label={`${repo.stargazers_count} stars`}>
            {repo.stargazers_count}
          </span>
        </span>
        <span className="inline-flex items-center gap-1">
          <GitFork className="size-3.5" strokeWidth={1.5} aria-hidden />
          <span aria-label={`${repo.forks_count} forks`}>
            {repo.forks_count}
          </span>
        </span>
      </div>

      <div className="mt-auto flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-4">
        <time
          className="text-xs text-white/40"
          dateTime={repo.updated_at}
        >
          Updated {formatRepoUpdatedDate(repo.updated_at)}
        </time>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-lg border border-white/15 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors duration-300 hover:border-purple-500/40 hover:bg-purple-500/10 hover:text-white"
        >
          View on GitHub
        </a>
      </div>
    </article>
  );
}

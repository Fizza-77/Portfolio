import { getGitHubProfileData } from "@/lib/github";
import { siteConfig } from "@/lib/site-config";
import RepoCard from "@/components/github/RepoCard";

function GithubFallback({ message }: { message: string }) {
  return (
    <div
      className="rounded-xl border border-white/10 bg-white/[0.03] px-6 py-10 text-center"
      role="alert"
    >
      <p className="text-base text-white/70">{message}</p>
      <a
        href={`https://github.com/${siteConfig.githubUsername}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 inline-flex text-sm font-medium text-purple-400 transition-colors duration-300 hover:text-purple-300"
      >
        Visit @{siteConfig.githubUsername} on GitHub
      </a>
    </div>
  );
}

export default async function GithubSection() {
  const result = await getGitHubProfileData();

  return (
    <section
      id="github"
      className="relative bg-black px-4 py-20 text-white sm:px-6 sm:py-24 md:px-10 md:py-32 lg:px-16"
      aria-labelledby="github-activity-heading"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <h2
            id="github-activity-heading"
            className="text-3xl font-bold tracking-tight md:text-4xl"
          >
            GitHub Activity
          </h2>
          <a
            href={`https://github.com/${siteConfig.githubUsername}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-400 transition-colors duration-300 hover:text-purple-300"
          >
            @{siteConfig.githubUsername}
          </a>
        </header>

        {!result.success ? (
          <GithubFallback message={result.message} />
        ) : (
          <div>
            <h3 className="mb-6 text-xl font-semibold tracking-tight md:text-2xl">
              Latest Repositories
            </h3>

            {result.data.repos.length === 0 ? (
              <p className="text-sm text-white/50">
                No public non-fork repositories found.
              </p>
            ) : (
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {result.data.repos.map((repo) => (
                  <li key={repo.id}>
                    <RepoCard repo={repo} />
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </section>
  );
}

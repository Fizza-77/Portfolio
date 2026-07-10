export default function GithubSectionSkeleton() {
  return (
    <section
      className="relative bg-black px-6 py-24 text-white md:px-10 md:py-32 lg:px-16"
      aria-busy="true"
      aria-label="Loading GitHub activity"
    >
      <div className="mx-auto max-w-7xl animate-pulse">
        <div className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="h-9 w-56 rounded-lg bg-white/10 md:h-10" />
          <div className="h-4 w-24 rounded bg-white/10" />
        </div>

        <div className="mb-6 h-6 w-44 rounded bg-white/10" />
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
            >
              <div className="mb-3 h-5 w-2/3 rounded bg-white/10" />
              <div className="mb-2 h-4 w-full rounded bg-white/10" />
              <div className="mb-4 h-4 w-4/5 rounded bg-white/10" />
              <div className="mb-4 flex gap-4">
                <div className="h-4 w-16 rounded bg-white/10" />
                <div className="h-4 w-10 rounded bg-white/10" />
                <div className="h-4 w-10 rounded bg-white/10" />
              </div>
              <div className="flex justify-between border-t border-white/10 pt-4">
                <div className="h-3 w-24 rounded bg-white/10" />
                <div className="h-7 w-28 rounded-lg bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

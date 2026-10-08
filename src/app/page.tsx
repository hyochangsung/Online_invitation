export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-xl space-y-6">
        <h1 className="text-4xl font-semibold tracking-tight">Huddling</h1>
        <p className="text-lg text-foreground/70">
          Next.js + TypeScript 5 + Tailwind CSS v4
        </p>
        <p className="text-sm text-foreground/60">
          <code className="rounded bg-foreground/5 px-2 py-1">
            src/app/page.tsx
          </code>
          에서 개발을 시작하세요.
        </p>
      </div>
    </main>
  );
}

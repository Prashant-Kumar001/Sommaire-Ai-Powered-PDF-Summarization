import { getPdfSummaries } from "@/actions/getPdfSummaries";
import { GradientBackground1 } from "@/components/common/gradient";
import SummaryCard, { Summary } from "@/components/dashboard/Summary-card";
import { Button } from "@/components/ui/button";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function Page() {
  const user = await currentUser();
  if (!user) return redirect("/sign-in");

  const summaries = await getPdfSummaries(user.id);

  const isSubscribed = summaries.limit === Infinity;

  const pdfCount = summaries?.data?.length ?? 0;
  const isFreeLimitReached = !isSubscribed && pdfCount >= summaries.limit;

  const hasSummaries = pdfCount > 0;

  return (
    <main className="relative min-h-screen">
      <GradientBackground1 />

      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 py-10 sm:py-14">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              Your Summaries
            </h2>
            {!isSubscribed && (
              <p className="text-sm text-gray-500 mt-1">
                {pdfCount}/{isSubscribed ? "∞" : summaries.limit} PDFs used
              </p>
            )}
          </div>

          {isFreeLimitReached ? (
            <Link href="/pricing">
              <Button variant="default">Upgrade to Pro</Button>
            </Link>
          ) : (
            <Link href="/upload">
              <Button
                variant="aiSoft"
                className="text-white bg-linear-to-r from-rose-700 via-rose-600 to-rose-400 hover:from-rose-600 hover:via-rose-500 hover:to-rose-400 animate-gradient-x"
              >
                Upload PDF
              </Button>
            </Link>
          )}
        </div>

        {isFreeLimitReached && (
          <div className="mb-6 p-4 rounded-lg bg-amber-50 border border-amber-200">
            <p className="text-sm text-amber-700">
              You reached the free limit of {summaries.limit} PDFs. Upgrade to
              Pro to upload unlimited PDFs.
            </p>
          </div>
        )}

        {hasSummaries ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {summaries.data &&
              summaries.data.map((summary: Summary) => (
                <SummaryCard key={summary.id} summary={summary} />
              ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center bg-white/70 backdrop-blur-md border border-gray-200 rounded-xl shadow-sm">
            <div className="text-5xl mb-4">📄</div>

            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              No summaries yet
            </h3>

            <p className="text-gray-500 mb-6 max-w-sm">
              Upload your first PDF and let AI generate a structured summary.
            </p>

            <Link href="/upload">
              <Button
                variant="aiSoft"
                className="text-white bg-linear-to-r from-rose-700 via-rose-600 to-rose-400"
              >
                Upload your first PDF
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

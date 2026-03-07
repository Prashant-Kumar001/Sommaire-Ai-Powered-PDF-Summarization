import { getSummaryById } from "@/actions/getSummary";
import { notFound } from "next/navigation";

import SummaryHeader from "@/components/summaries/summary-header";
import SummaryViewer from "@/components/summaries/Summary-viewer";
import { formatFileTitle } from "@/components/dashboard/Summary-card";



const Page = async (props: { params: { id: string } }) => {
  const prams = await props.params;
  const { id } = prams;
  if (!id) return notFound();

  const summary = await getSummaryById(id);

  if (!summary) return notFound();

  const formattedTitle = formatFileTitle(
    summary.title || summary.fileName || "Untitled",
  );

  const {  summaryText, createdAt, originalFileUrl } = summary;

  return (
    <main
      className="
      min-h-screen
    "
    >
      <div
        className="
        max-w-5xl
        mx-auto
      "
      >
        <section>
          <SummaryHeader
            createdAt={createdAt}
            originalFileUrl={originalFileUrl}
            formattedTitle={formattedTitle}
          />
        </section>

        <section className=" bg-rose-50/25 rounded-4xl">
          <SummaryViewer summaryText={summaryText} title={formattedTitle} />
        </section>
      </div>
    </main>
  );
};

export default Page;

import React from "react";
import Link from "next/link";
import { Card } from "../ui/card";
import DeleteButton from "./DeleteButton";
import { FileText } from "lucide-react";
import { formatDistanceToNow } from "date-fns";

export interface Summary {
  id: string;
  summaryText: string;
  title: string | null;
  fileName: string | null;
  status: string | null;
  createdAt: Date | null;
  originalFileUrl: string;
}

export const formatFileTitle = (title: string): string => {
  return title
    .replace(/\.[^/.]+$/, "")
    .replace(/[_-]+/g, " ")
    .replace(/\(\d+\)/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const formatText = (text: string): string => {
  return text
    .replace(/[_-]+/g, " ")
    .replace(/\(\d+\)/g, "")
    .replace(/#+/g, "")
    .replace(/[^\w\s.,!?]/g, "")
    .replace(/\s+/g, " ")
    .trim();
};

const SummaryCard = ({ summary }: { summary: Summary }) => {
  return (
    <Card className="relative h-full">
      <div className="absolute top-2 right-2 ">
        <DeleteButton id={summary.id} />
      </div>

      <Link href={`/summary/${summary.id}`} className="block p-5 h-full">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100">
            <FileText className="w-5 h-5 text-rose-500  " />
          </div>

          <div className="flex flex-col">
            <h3 className="font-semibold text-gray-900 text-base line-clamp-1">
              {formatFileTitle(summary.title!) || "Untitled"}
            </h3>

            <p className="text-xs text-gray-500 line-clamp-1 ">
              {summary.fileName}
            </p>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-4 mb-5 leading-relaxed">
          {formatText(summary.summaryText).slice(0, 100)}
        </p>

        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            {formatDistanceToNow(new Date(summary.createdAt!), {
              addSuffix: true,
            })}
          </span>

          <span className="text-xs px-2 py-1 rounded-md bg-green-50 text-green-600 font-medium">
            {summary.status}
          </span>
        </div>
      </Link>
    </Card>
  );
};

export default SummaryCard;

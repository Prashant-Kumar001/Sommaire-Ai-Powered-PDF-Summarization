import React from "react";
import { Badge } from "../ui/badge";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Download,
  ExternalLink,
  File,
  Sparkles,
} from "lucide-react";

import { format } from "date-fns";
import Link from "next/link";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";

const SummaryHeader = ({
  createdAt,
  originalFileUrl,
  formattedTitle,
}: {
  createdAt: Date | string | null;
  originalFileUrl: string;
  formattedTitle: string;
}) => {
  return (
    <Card className="border-none shadow-none ">
      <CardContent>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-1">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <Badge
              variant="secondary"
              className="bg-pink-50 text-pink-600 border border-pink-100 flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Summary
            </Badge>

            {createdAt && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4 opacity-70" />
                {format(new Date(createdAt), "MMM dd, yyyy")}
              </div>
            )}

            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4 opacity-70" />1 min read
            </div>
          </div>

          <Link href="/dashboard">
            <Button
              variant="outline"
              size="sm"
              className="gap-2 border-pink-200 text-pink-600 hover:bg-pink-50"
            >
              <ArrowLeft className="w-4 h-4" />
              Back
            </Button>
          </Link>
        </div>

        <h1 className="text-xl mb-2 sm:text-2xl md:text-3xl font-semibold text-gray-900 leading-tight  wrap-break-word">
          {formattedTitle}
        </h1>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 rounded-lg border bg-muted/40">
          <div className="flex items-center gap-3 min-w-0">
            <div className="p-2 rounded-md bg-pink-100 text-pink-600">
              <File className="w-4 h-4" />
            </div>

            <div className="flex flex-col min-w-0">
              <span className="text-sm font-medium text-gray-900">
                Source File
              </span>
              <span className="text-xs text-muted-foreground truncate max-w-60">
                Original uploaded document
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2 w-full sm:w-auto">
            <a
              href={originalFileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-none"
            >
              <Button
                variant="outline"
                size="sm"
                className="w-full sm:w-auto gap-2"
              >
                <ExternalLink className="w-4 h-4" />
                View
              </Button>
            </a>

            <a href={originalFileUrl} download className="flex-1 sm:flex-none">
              <Button
                size="sm"
                className="w-full sm:w-auto gap-2 bg-pink-600 hover:bg-pink-700 text-white"
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </a>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SummaryHeader;

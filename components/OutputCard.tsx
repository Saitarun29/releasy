"use client";

import { useState, memo } from "react";
import { Copy, Check, Download, FileText, MessageSquareText, Hash, Mail, Camera, Video, ScrollText, Tag, MessageCircle, Rocket, Newspaper } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { ASSET_LABELS } from "@/constants";
import type { GeneratedAsset, AssetType } from "@/types";

interface OutputCardProps {
  asset: GeneratedAsset;
}

const ASSET_ICONS: Record<AssetType, typeof FileText> = {
  changelog: FileText,
  linkedin: MessageSquareText,
  twitter: Hash,
  email: Mail,
  instagram: Camera,
  reel: Video,
  "instagram-caption": Camera,
  "instagram-reel-script": Video,
  "release-notes": ScrollText,
  "github-release": Tag,
  threads: MessageCircle,
  "product-hunt": Rocket,
  newsletter: Newspaper,
};

export const OutputCard = memo(function OutputCard({ asset }: OutputCardProps) {
  const [copied, setCopied] = useState(false);
  const Icon = ASSET_ICONS[asset.type] || FileText;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(asset.content);
      setCopied(true);
      toast({ title: "Copied to clipboard", variant: "success" });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: "Failed to copy", variant: "error" });
    }
  }

  function handleDownload() {
    const blob = new Blob([asset.content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${asset.type}-${asset.title.replace(/\s+/g, "-").toLowerCase()}.md`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded as Markdown", variant: "success" });
  }

  return (
    <div className="rounded-xl border border-border/50 bg-black/20 overflow-hidden">
      <div className="flex items-center justify-between gap-3 px-5 py-3 border-b border-border/40 bg-white/[0.02]">
        <div className="flex items-center gap-3 min-w-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center shrink-0 border border-border/50">
            <Icon className="h-4 w-4 text-primary" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-medium truncate">{asset.title}</p>
            <p className="text-[11px] text-muted-foreground">{ASSET_LABELS[asset.type]}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <div className="hidden sm:flex items-center gap-1.5 mr-1">
            <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5">
              {asset.characterCount.toLocaleString()} chars
            </Badge>
            <Badge variant="outline" className="text-[10px] font-medium px-2 py-0.5">
              {asset.wordCount.toLocaleString()} words
            </Badge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2.5 text-xs gap-1.5 bg-white/[0.04] border border-border/50 hover:bg-white/[0.08]"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-success" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8 px-2.5 text-xs gap-1.5 bg-white/[0.04] border border-border/50 hover:bg-white/[0.08]"
          >
            <Download className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">MD</span>
          </Button>
        </div>
      </div>
      <div className="relative">
        <pre className="overflow-auto p-5 text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap font-mono max-h-80 scrollbar-thin">
          {asset.content}
        </pre>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
      </div>
    </div>
  );
});

"use client";

import { useCallback, memo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Archive, FileText, MessageSquareText, Hash, Mail, Camera, Video, ScrollText, Tag, MessageCircle, Rocket, Newspaper, Code2, Megaphone, Users, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OutputCard } from "@/components/OutputCard";
import { ASSET_LABELS } from "@/constants";
import { downloadAllAsZip } from "@/lib/zip";
import { toast } from "@/hooks/use-toast";
import type { GeneratedAsset, AssetType } from "@/types";

interface AssetTabsProps {
  assets: GeneratedAsset[];
  repoName: string;
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

interface Category {
  name: string;
  icon: typeof Code2;
  types: AssetType[];
}

const CATEGORIES: Category[] = [
  {
    name: "Developer",
    icon: Code2,
    types: ["release-notes", "github-release", "changelog"],
  },
  {
    name: "Marketing",
    icon: Megaphone,
    types: ["linkedin", "email", "newsletter", "product-hunt"],
  },
  {
    name: "Social",
    icon: Users,
    types: ["twitter", "instagram", "instagram-caption", "threads"],
  },
  {
    name: "Video",
    icon: Play,
    types: ["reel", "instagram-reel-script"],
  },
];

export const AssetTabs = memo(function AssetTabs({ assets, repoName }: AssetTabsProps) {
  const [activeTab, setActiveTab] = useState(assets[0]?.type);

  const handleDownloadAll = useCallback(async () => {
    try {
      const entries = assets.map((a) => ({
        name: `${a.type}-${repoName.replace("/", "-")}.md`,
        content: a.content,
      }));
      await downloadAllAsZip(entries, `releasy-${repoName.replace("/", "-")}.zip`);
      toast({ title: "All assets downloaded as ZIP", variant: "success" });
    } catch {
      toast({ title: "Failed to create ZIP", variant: "error" });
    }
  }, [assets, repoName]);

  if (assets.length === 0) return null;

  const activeAsset = assets.find((a) => a.type === activeTab) || assets[0];

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="space-y-4"
    >
      <div className="rounded-2xl border border-border/50 bg-card overflow-hidden">
        <div className="p-5 pb-0">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/20 flex items-center justify-center">
                <Rocket className="h-3.5 w-3.5 text-primary" />
              </div>
              <h3 className="text-base font-semibold">AI Launch Kit</h3>
              <span className="text-xs text-muted-foreground bg-white/[0.04] px-2 py-0.5 rounded-full">
                {assets.length}
              </span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleDownloadAll}
              className="gap-1.5 text-xs bg-white/[0.04] border border-border/50 hover:bg-white/[0.08] h-8"
            >
              <Archive className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Download All</span>
            </Button>
          </div>

          <div className="space-y-4">
            {CATEGORIES.map((category) => {
              const categoryAssets = assets.filter((a) =>
                category.types.includes(a.type)
              );
              if (categoryAssets.length === 0) return null;
              const CatIcon = category.icon;
              return (
                <div key={category.name}>
                  <div className="flex items-center gap-1.5 mb-2">
                    <CatIcon className="h-3.5 w-3.5 text-muted-foreground" />
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wider font-medium">
                      {category.name}
                    </span>
                    <div className="h-px flex-1 bg-border/40 ml-2" />
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {categoryAssets.map((asset) => {
                      const isActive = asset.type === activeTab;
                      const Icon = ASSET_ICONS[asset.type] || FileText;
                      return (
                        <motion.button
                          key={asset.type}
                          layout
                          onClick={() => setActiveTab(asset.type)}
                          className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all duration-200 ${
                            isActive
                              ? "bg-primary/10 text-primary border border-primary/20 shadow-sm"
                              : "text-muted-foreground hover:text-foreground hover:bg-white/[0.04] border border-transparent"
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />
                          {ASSET_LABELS[asset.type] || asset.type}
                        </motion.button>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="border-t border-border/40 mt-5">
          <div className="p-5">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAsset.type}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <OutputCard asset={activeAsset} />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </motion.div>
  );
});

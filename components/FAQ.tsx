"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const faqs = [
  {
    question: "What do I need to use Releasy?",
    answer: "A public GitHub repository and a Mistral AI API key (free tier available). No account sign-up required.",
  },
  {
    question: "Which GitHub repositories work?",
    answer: "Any public repository on GitHub. Enter the full URL (github.com/owner/repo) or shorthand (owner/repo).",
  },
  {
    question: "What kind of content does it generate?",
    answer: "Customer-facing changelogs, LinkedIn posts, X (Twitter) threads, launch emails, Instagram captions, and AI video scripts — all from one repository analysis.",
  },
  {
    question: "Can I customize the output?",
    answer: "The AI tailors content to your repository's language and updates. You can copy, edit, and download each asset individually or export all as a ZIP.",
  },
  {
    question: "Do you store my data?",
    answer: "No. Repository data is fetched in real-time and only used to generate content during your session. Nothing is stored on our servers.",
  },
  {
    question: "Is there a free tier?",
    answer: "Yes. Releasy uses Mistral AI by default. You just need a free Mistral AI API key to get started.",
  },
  {
    question: "Can I use this for private repositories?",
    answer: "Currently Releasy supports public repositories. Private repository support is on the roadmap.",
  },
  {
    question: "What languages does the AI support?",
    answer: "The AI generates content in English. Commit messages and repository descriptions in other languages may affect output quality.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div className="mx-auto max-w-3xl space-y-3">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="glass rounded-2xl overflow-hidden transition-all duration-200"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between px-6 py-4 text-left transition-colors hover:bg-glass-hover"
              >
                <span className="text-sm font-medium pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-200",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-6 pb-4 text-sm text-muted leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

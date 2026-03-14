import ReactMarkdown, { type Components } from "react-markdown";

import { cn } from "@/lib/utils";

const inlineMarkdownComponents: Components = {
  p: ({ children }) => <>{children}</>,
};

const listMarkdownComponents: Components = {
  p: ({ children }) => <>{children}</>,
  ul: ({ children }) => (
    <ul className="flex list-inside list-disc flex-col gap-1.5 print:block print:list-outside print:pl-5">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="relative m-0 list-none indent-3 before:absolute before:left-0 before:top-[8px] before:block before:size-[5px] before:bg-black print:list-item print:list-disc print:indent-0 print:before:hidden">
      {children}
    </li>
  ),
};

interface ResumeInlineMarkdownProps {
  className?: string;
  markdown: string;
}

export function ResumeInlineMarkdown({
  className,
  markdown,
}: ResumeInlineMarkdownProps) {
  return (
    <p className={cn(className)}>
      <ReactMarkdown components={inlineMarkdownComponents}>{markdown}</ReactMarkdown>
    </p>
  );
}

interface ResumeListMarkdownProps {
  markdown: string;
}

export function ResumeListMarkdown({ markdown }: ResumeListMarkdownProps) {
  return <ReactMarkdown components={listMarkdownComponents}>{markdown}</ReactMarkdown>;
}

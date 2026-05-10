import ReactMarkdown, { type Components } from "react-markdown";
import { TextShimmer } from "@/components/ui/text-shimmer";

import { cn } from "@/lib/utils";

const inlineMarkdownComponents: Components = {
  p: ({ children }) => <>{children}</>,
  strong: ({ children }) => (
    <TextShimmer as="span" className="font-semibold">
      {String(children)}
    </TextShimmer>
  ),
};

const listMarkdownComponents: Components = {
  p: ({ children }) => <>{children}</>,
  strong: ({ children }) => (
    <TextShimmer as="span">{String(children)}</TextShimmer>
  ),
  ul: ({ children }) => (
    <ul className="flex list-inside flex-col gap-1.5 print:block print:list-outside print:pl-5">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="relative m-0 indent-3 before:absolute before:left-0 before:top-[8px] before:block before:size-[5px] before:bg-black print:list-item print:indent-0 print:before:hidden">
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
      <ReactMarkdown components={inlineMarkdownComponents}>
        {markdown}
      </ReactMarkdown>
    </p>
  );
}

interface ResumeListMarkdownProps {
  markdown: string;
  disableBullet?: boolean;
}

export function ResumeListMarkdown({
  markdown,
  disableBullet,
}: ResumeListMarkdownProps) {
  return (
    <ReactMarkdown
      components={{
        ...listMarkdownComponents,
        li: ({ children }) => (
          <li
            className={cn("relative m-0 print:list-item print:indent-0", {
              "indent-3 before:absolute before:left-0 before:top-[8px] before:block before:size-[5px] before:bg-black":
                !disableBullet,
            })}
          >
            {children}
          </li>
        ),
      }}
    >
      {markdown}
    </ReactMarkdown>
  );
}

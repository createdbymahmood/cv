import "server-only";

import { cache } from "react";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";

import matter from "gray-matter";

import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";

const RESUME_CONTENT_DIR = path.join(process.cwd(), "content", "resume");
const WORK_CONTENT_DIR = path.join(RESUME_CONTENT_DIR, "work");
const PROJECT_CONTENT_DIR = path.join(RESUME_CONTENT_DIR, "projects");

const SOCIAL_ICONS = {
  GitHub: GitHubIcon,
  LinkedIn: LinkedInIcon,
  X: XIcon,
} as const;

type SocialIconName = keyof typeof SOCIAL_ICONS;

export interface ResumeSocialLink {
  name: string;
  url: string;
  icon: (typeof SOCIAL_ICONS)[SocialIconName];
}

export interface ResumeEducationItem {
  school: string;
  degree: string;
  start: string;
  end: string;
}

export interface ResumeSkillGroup {
  title: string;
  skills: string[];
}

export interface ResumeWorkItem {
  company: string;
  link: string;
  badges: string[];
  title: string;
  start: string;
  end?: string;
  achievementsMarkdown: string;
}

export interface ResumeProjectItem {
  name: string;
  link: string;
  repo?: string;
  descriptionMarkdown: string;
}

export interface ResumeData {
  name: string;
  initials: string;
  location: string;
  locationLink: string;
  about: string;
  aboutMarkdown: string;
  summary: string;
  summaryMarkdown: string;
  avatarUrl: string;
  contact: {
    email: string;
    tel: string;
    social: ResumeSocialLink[];
  };
  skillGroups: ResumeSkillGroup[];
  education: ResumeEducationItem[];
  skills: string[];
  work: ResumeWorkItem[];
  projects: ResumeProjectItem[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function expectString(value: unknown, field: string): string {
  if (typeof value !== "string") {
    throw new Error(`Expected "${field}" to be a string.`);
  }

  return value;
}

function expectStringArray(value: unknown, field: string): string[] {
  if (!Array.isArray(value) || value.some((item) => typeof item !== "string")) {
    throw new Error(`Expected "${field}" to be an array of strings.`);
  }

  return value;
}

function expectOptionalString(value: unknown, field: string): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  return expectString(value, field);
}

function stripMarkdown(markdown: string) {
  return markdown
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/(\*\*|__)(.*?)\1/g, "$2")
    .replace(/[*_`>#]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function parseMarkdownSections(markdown: string) {
  const sections: Record<string, string> = {};

  const rawSections = markdown
    .split(/^##\s+/m)
    .map((section) => section.trim())
    .filter(Boolean);

  rawSections.forEach((section) => {
    const [heading, ...contentLines] = section.split("\n");
    sections[heading.trim().toLowerCase()] = contentLines.join("\n").trim();
  });

  return sections;
}

function parseMarkdownBulletList(markdown: string) {
  return markdown
    .split("\n")
    .map((line) => line.match(/^\s*-\s+(.*)$/)?.[1]?.trim())
    .filter((item): item is string => Boolean(item));
}

function parseSkillGroups(markdown: string): ResumeSkillGroup[] {
  const rawGroups = markdown
    .split(/^###\s+/m)
    .map((section) => section.trim())
    .filter(Boolean);

  if (rawGroups.length === 1 && !markdown.trim().startsWith("### ")) {
    return [{ title: "Skills", skills: parseMarkdownBulletList(markdown) }];
  }

  return rawGroups.map((group) => {
    const [title, ...contentLines] = group.split("\n");
    const skills = parseMarkdownBulletList(contentLines.join("\n"));

    if (!skills.length) {
      throw new Error(`Expected skills under "${title.trim()}" in profile.md.`);
    }

    return {
      title: title.trim(),
      skills,
    };
  });
}

function parseSocialLinks(value: unknown) {
  if (!Array.isArray(value)) {
    throw new Error('Expected "social" to be an array.');
  }

  return value.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`Expected "social[${index}]" to be an object.`);
    }

    const iconName = expectString(entry.icon, `social[${index}].icon`);
    const icon = SOCIAL_ICONS[iconName as SocialIconName];

    if (!icon) {
      throw new Error(`Unsupported social icon "${iconName}".`);
    }

    return {
      name: expectString(entry.name, `social[${index}].name`),
      url: expectString(entry.url, `social[${index}].url`),
      icon,
    };
  });
}

function parseEducation(value: unknown) {
  if (!Array.isArray(value)) {
    throw new Error('Expected "education" to be an array.');
  }

  return value.map((entry, index) => {
    if (!isRecord(entry)) {
      throw new Error(`Expected "education[${index}]" to be an object.`);
    }

    return {
      school: expectString(entry.school, `education[${index}].school`),
      degree: expectString(entry.degree, `education[${index}].degree`),
      start: expectString(entry.start, `education[${index}].start`),
      end: expectString(entry.end, `education[${index}].end`),
    };
  });
}

async function readDirIfExists(dir: string) {
  try {
    return await readdir(dir);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }

    throw error;
  }
}

async function loadProfileContent() {
  const source = await readFile(path.join(RESUME_CONTENT_DIR, "profile.md"), "utf8");
  const { content, data } = matter(source);

  if (!isRecord(data)) {
    throw new Error("Expected profile frontmatter to be an object.");
  }

  const sections = parseMarkdownSections(content);
  const aboutMarkdown = sections.about;
  const summaryMarkdown = sections.summary;
  const skillsMarkdown = sections.skills;

  if (!aboutMarkdown || !summaryMarkdown || !skillsMarkdown) {
    throw new Error('Expected "About", "Summary", and "Skills" sections in profile.md.');
  }

  const contact = data.contact;

  if (!isRecord(contact)) {
    throw new Error('Expected "contact" to be an object.');
  }

  const skillGroups = parseSkillGroups(skillsMarkdown);

  return {
    name: expectString(data.name, "name"),
    initials: expectString(data.initials, "initials"),
    location: expectString(data.location, "location"),
    locationLink: expectString(data.locationLink, "locationLink"),
    about: stripMarkdown(aboutMarkdown),
    aboutMarkdown,
    summary: stripMarkdown(summaryMarkdown),
    summaryMarkdown,
    avatarUrl: expectString(data.avatarUrl, "avatarUrl"),
    contact: {
      email: expectString(contact.email, "contact.email"),
      tel: expectString(contact.tel, "contact.tel"),
      social: parseSocialLinks(data.social),
    },
    skillGroups,
    education: parseEducation(data.education),
    skills: skillGroups.flatMap((group) => group.skills),
  };
}

async function loadWorkItem(filename: string): Promise<ResumeWorkItem> {
  const source = await readFile(path.join(WORK_CONTENT_DIR, filename), "utf8");
  const { content, data } = matter(source);

  if (!isRecord(data)) {
    throw new Error(`Expected frontmatter in "${filename}" to be an object.`);
  }

  return {
    company: expectString(data.company, `${filename}.company`),
    link: expectString(data.link, `${filename}.link`),
    badges: expectStringArray(data.badges, `${filename}.badges`),
    title: expectString(data.title, `${filename}.title`),
    start: expectString(data.start, `${filename}.start`),
    end:
      data.end === undefined ? undefined : expectString(data.end, `${filename}.end`),
    achievementsMarkdown: content.trim(),
  };
}

async function loadProjectItem(filename: string): Promise<ResumeProjectItem> {
  const source = await readFile(path.join(PROJECT_CONTENT_DIR, filename), "utf8");
  const { content, data } = matter(source);

  if (!isRecord(data)) {
    throw new Error(`Expected frontmatter in "${filename}" to be an object.`);
  }

  return {
    name: expectString(data.name, `${filename}.name`),
    link: expectString(data.link, `${filename}.link`),
    repo: expectOptionalString(data.repo, `${filename}.repo`),
    descriptionMarkdown: content.trim(),
  };
}

export const getResumeData = cache(async (): Promise<ResumeData> => {
  const [profile, workFiles, projectFiles] = await Promise.all([
    loadProfileContent(),
    readdir(WORK_CONTENT_DIR),
    readDirIfExists(PROJECT_CONTENT_DIR),
  ]);

  const work = await Promise.all(
    workFiles
      .filter((filename) => filename.endsWith(".md"))
      .sort((left, right) => left.localeCompare(right))
      .map((filename) => loadWorkItem(filename)),
  );

  const projects = await Promise.all(
    projectFiles
      .filter((filename) => filename.endsWith(".md"))
      .sort((left, right) => left.localeCompare(right))
      .map((filename) => loadProjectItem(filename)),
  );

  return {
    ...profile,
    work,
    projects,
  };
});

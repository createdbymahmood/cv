import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ResumeInlineMarkdown,
  ResumeListMarkdown,
} from "@/components/resume-markdown";
import { Metadata } from "next";
import { Section } from "@/components/ui/section";
import { GlobeIcon, MailIcon, PhoneIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Href } from "@/components/ui/href";
import { getResumeData } from "@/lib/resume-content";
import { cn, getDateRangeWithDurationParts } from "@/lib/utils";

export async function generateMetadata(): Promise<Metadata> {
  const resumeData = await getResumeData();

  return {
    title: `${resumeData.name} | ${resumeData.about}`,
    description: resumeData.summary,
  };
}

export default async function Page() {
  const resumeData = await getResumeData();

  return (
    <main className="relative mx-auto scroll-my-12 overflow-auto p-4 print:p-12 md:p-16">
      <section className="mx-auto w-full max-w-2xl space-y-8 bg-white print:space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex-1 space-y-1.5">
            <h1 className="text-2xl font-bold">{resumeData.name}</h1>
            <ResumeInlineMarkdown
              className="text-muted-foreground max-w-md text-pretty font-mono text-base"
              markdown={resumeData.aboutMarkdown}
            />
            <p className="text-muted-foreground max-w-md items-center text-pretty font-mono text-sm">
              <Href
                className="mt-2 inline-flex gap-x-1.5 align-baseline leading-none hover:underline"
                href={resumeData.locationLink}
              >
                <GlobeIcon className="size-3" />
                {resumeData.location}
              </Href>
            </p>
            <div className="text-muted-foreground flex gap-x-1 pt-1 font-mono text-base print:hidden">
              {resumeData.contact.email ? (
                <Button className="size-8" size="icon" asChild>
                  <Href href={`mailto:${resumeData.contact.email}`}>
                    <MailIcon className="size-4" />
                  </Href>
                </Button>
              ) : null}
              {resumeData.contact.tel ? (
                <Button className="size-8" size="icon" asChild>
                  <Href href={`tel:${resumeData.contact.tel}`}>
                    <PhoneIcon className="size-4" />
                  </Href>
                </Button>
              ) : null}
              {resumeData.contact.social.map((social) => (
                <Button
                  key={social.name}
                  className="size-8"
                  size="icon"
                  asChild
                >
                  <Href href={social.url}>
                    <social.icon className="size-4" />
                  </Href>
                </Button>
              ))}
            </div>
            <div className="text-muted-foreground hidden flex-col gap-x-1 font-mono text-base print:flex">
              {resumeData.contact.email ? (
                <Href href={`mailto:${resumeData.contact.email}`}>
                  <span className="underline">{resumeData.contact.email}</span>
                </Href>
              ) : null}
              {resumeData.contact.tel ? (
                <Href href={`tel:${resumeData.contact.tel}`}>
                  <span className="underline">{resumeData.contact.tel}</span>
                </Href>
              ) : null}
            </div>
          </div>

          <Avatar className="size-28">
            <AvatarImage alt={resumeData.name} src={resumeData.avatarUrl} />
            <AvatarFallback>{resumeData.initials}</AvatarFallback>
          </Avatar>
        </div>
        <Section>
          <h2 className="text-xl font-bold">About</h2>

          <ResumeInlineMarkdown
            className="text-muted-foreground text-pretty font-mono text-base"
            markdown={resumeData.summaryMarkdown}
          />
        </Section>

        <Section>
          <h2 className="text-xl font-bold">Skills</h2>
          <div className="space-y-4">
            {resumeData.skillGroups.map((group) => (
              <div className="space-y-1" key={group.title}>
                <h3 className="text-base font-semibold leading-none">
                  {group.title}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {group.skills.map((skill) => (
                    <Badge key={`${group.title}-${skill}`}>{skill}</Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <h2 className="text-xl font-bold">Work Experience</h2>
          {resumeData.work.map((work) => {
            const { dateRange, duration } = getDateRangeWithDurationParts(
              work.start,
              work.end,
            );

            return (
              <Card key={`${work.title}-${work.start}`}>
                <CardHeader>
                  <div className="flex flex-col gap-2 text-base sm:flex-row sm:items-start sm:justify-between">
                    <h3 className="font-semibold leading-none">{work.title}</h3>

                    <div className="text-base tabular-nums sm:text-right">
                      <span>{dateRange}</span>
                      {duration ? (
                        <span className="text-muted-foreground">
                          {" "}
                          ({duration})
                        </span>
                      ) : null}
                    </div>
                  </div>

                  <div className="inline-flex flex-wrap items-center justify-start gap-1 font-mono text-base leading-none">
                    <Href
                      className={cn("hover:underline", {
                        "pointer-events-none": !work.link,
                      })}
                      href={work?.link}
                    >
                      {work.company}
                    </Href>

                    <span className="inline-flex flex-wrap gap-1">
                      {work.badges.map((badge) => (
                        <Badge className="align-middle text-sm" key={badge}>
                          {badge}
                        </Badge>
                      ))}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="mt-2 text-base">
                  <ResumeListMarkdown markdown={work.achievementsMarkdown} />
                </CardContent>
              </Card>
            );
          })}
        </Section>

        <Section>
          <h2 className="text-xl font-bold">Education</h2>
          {resumeData.education.map((education) => {
            return (
              <Card key={education.school}>
                <CardHeader className="pb-1 pt-4">
                  <div className="flex items-center justify-between gap-x-2 text-base">
                    <h3 className="text-base font-semibold leading-none">
                      {education.school}
                    </h3>
                    <div className="text-base tabular-nums text-gray-500">
                      {education.start} - {education.end}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="mt-2 text-base">
                  {education.degree}
                </CardContent>
              </Card>
            );
          })}
        </Section>
      </section>
    </main>
  );
}

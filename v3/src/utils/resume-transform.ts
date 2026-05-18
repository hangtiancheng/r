import {
  resumeDraftSchema,
  resumeSchema,
  type Resume,
  type ResumeDraft,
} from "@/schema";

function cleanText(value: string | undefined): string | undefined {
  const trimmed = (value ?? "").trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function cleanStringList(list: (string | undefined)[] | undefined): string[] {
  return (list ?? [])
    .map((value): string => (value ?? "").trim())
    .filter((value): boolean => value.length > 0);
}

function hasAnyValue(record: Record<string, unknown>): boolean {
  return Object.values(record).some((value): boolean => {
    if (typeof value === "string") {
      return value.trim().length > 0;
    }
    if (Array.isArray(value)) {
      return value.length > 0;
    }
    return value !== null && value !== undefined;
  });
}

export function toPersistedResume(draft: ResumeDraft): Resume {
  const basics = {
    name: cleanText(draft.basics.name),
    headline: cleanText(draft.basics.headline),
    email: cleanText(draft.basics.email),
    phone: cleanText(draft.basics.phone),
    location: cleanText(draft.basics.location),
    links: (draft.basics.links ?? [])
      .map((link) => ({
        label: cleanText(link.label),
        url: cleanText(link.url),
      }))
      .filter((link): boolean => link.url !== undefined),
  };
  const experiences = draft.experiences
    .map((item) => ({
      company: cleanText(item.company),
      title: cleanText(item.title),
      location: cleanText(item.location),
      startDate: cleanText(item.startDate),
      endDate: cleanText(item.endDate),
      highlights: cleanStringList(item.highlights),
    }))
    .filter(hasAnyValue);
  const projects = draft.projects
    .map((item) => ({
      name: cleanText(item.name),
      role: cleanText(item.role),
      startDate: cleanText(item.startDate),
      endDate: cleanText(item.endDate),
      highlights: cleanStringList(item.highlights),
      link: cleanText(item.link),
    }))
    .filter(hasAnyValue);
  const education = draft.education
    .map((item) => ({
      school: cleanText(item.school),
      degree: cleanText(item.degree),
      major: cleanText(item.major),
      startDate: cleanText(item.startDate),
      endDate: cleanText(item.endDate),
      highlights: cleanStringList(item.highlights),
    }))
    .filter(hasAnyValue);

  return resumeSchema.parse({
    schemaVersion: 1,
    basics,
    summary: (draft.summary ?? "").trim(),
    skills: cleanStringList(draft.skills),
    experiences,
    projects,
    education,
  });
}

export function toResumeDraft(resume: Resume): ResumeDraft {
  return resumeDraftSchema.parse({
    schemaVersion: 1,
    basics: {
      name: resume.basics.name ?? "",
      headline: resume.basics.headline ?? "",
      email: resume.basics.email ?? "",
      phone: resume.basics.phone ?? "",
      location: resume.basics.location ?? "",
      links: resume.basics.links.map((link) => ({
        label: link.label ?? "",
        url: link.url,
      })),
    },
    summary: resume.summary,
    skills: resume.skills,
    experiences: resume.experiences.map((item) => ({
      company: item.company ?? "",
      title: item.title ?? "",
      location: item.location ?? "",
      startDate: item.startDate ?? "",
      endDate: item.endDate ?? "",
      highlights: item.highlights,
    })),
    projects: resume.projects.map((item) => ({
      name: item.name ?? "",
      role: item.role ?? "",
      startDate: item.startDate ?? "",
      endDate: item.endDate ?? "",
      highlights: item.highlights,
      link: item.link ?? "",
    })),
    education: resume.education.map((item) => ({
      school: item.school ?? "",
      degree: item.degree ?? "",
      major: item.major ?? "",
      startDate: item.startDate ?? "",
      endDate: item.endDate ?? "",
      highlights: item.highlights,
    })),
  });
}

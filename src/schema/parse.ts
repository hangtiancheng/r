import { marked, type Token, type Tokens } from "marked";

import type { Lang, Resume, ResumeBlock, TitledItem } from "./resume";

/**
 * Parse a resume markdown document into the structured {@link Resume} shape.
 *
 * The markdown layout is fixed:
 *
 * ```md
 * # Name
 * Phone: .. | Email: .. | GitHub: ..
 * about line
 * ## Education      -> bullet list, each "period · school · track"
 * ## Skills         -> bullet list
 * ## Work Experience-> ### Title + body blocks
 * ## Projects       -> ### Title + body blocks
 * ## Research       -> paragraph(s)
 * ```
 *
 * Section headings are mapped positionally (the document always declares the
 * five `##` sections in this order); the heading text itself becomes the
 * localized display header. Markdown links are reduced to their `href` so the
 * plain-text rendering keeps full URLs.
 */
export function parseResume(md: string, locale: Lang): Resume {
  const tokens = marked.lexer(md);

  let name = "";
  let tel = "";
  let email = "";
  let github = "";
  let about = "";
  const labels = {
    tel: "",
    email: "",
    github: "",
    // UI chrome only — not present in the markdown source.
    switch: locale === "en" ? "中文" : "EN",
  };

  const headers = {
    edu: "",
    skills: "",
    works: "",
    projects: "",
    research: "",
  };
  let edu: string[][] = [];
  let skills: string[] = [];
  const works: TitledItem[] = [];
  const projects: TitledItem[] = [];
  let research = "";

  // Index of the next `##` section to fill (positional mapping).
  const sectionKeys = [
    "edu",
    "skills",
    "works",
    "projects",
    "research",
  ] as const;
  let sectionIndex = -1;
  // Body blocks accumulated for the current `###` subsection (works/projects).
  let currentTitled: { title: string; blocks: Token[] } | null = null;
  // Body blocks accumulated for a section without `###` subsections.
  let sectionBlocks: Token[] = [];
  // Paragraphs seen between the H1 and the first H2 (contact line + about).
  const preamble: string[] = [];

  const flushTitled = (): void => {
    if (!currentTitled) return;
    const item: TitledItem = {
      title: currentTitled.title,
      blocks: toBlocks(currentTitled.blocks),
    };
    if (sectionKeys[sectionIndex] === "projects") projects.push(item);
    else works.push(item);
    currentTitled = null;
  };

  const flushSection = (): void => {
    flushTitled();
    const key = sectionKeys[sectionIndex];
    if (key === "edu") edu = parseEdu(sectionBlocks);
    else if (key === "skills") skills = parseList(sectionBlocks);
    else if (key === "research") research = flatten(sectionBlocks);
    sectionBlocks = [];
  };

  for (const token of tokens) {
    if (token.type === "space") continue;

    if (token.type === "heading") {
      const heading = token as Tokens.Heading;
      if (heading.depth === 1) {
        name = toText(heading.tokens).trim();
      } else if (heading.depth === 2) {
        // Close the previous section before starting a new one.
        if (sectionIndex >= 0) flushSection();
        sectionIndex += 1;
        const key = sectionKeys[sectionIndex];
        if (key) headers[key] = toText(heading.tokens).trim();
      } else if (heading.depth === 3) {
        // Works/Projects subsection title.
        flushTitled();
        currentTitled = { title: toText(heading.tokens).trim(), blocks: [] };
      }
      continue;
    }

    if (sectionIndex < 0) {
      // Preamble (contact line, about) — only paragraphs expected.
      if (token.type === "paragraph") {
        preamble.push(toText((token as Tokens.Paragraph).tokens).trim());
      }
      continue;
    }

    // Inside a `##` section.
    if (currentTitled) currentTitled.blocks.push(token);
    else sectionBlocks.push(token);
  }
  // Close the last open section.
  if (sectionIndex >= 0) flushSection();

  // Preamble: first paragraph is the contact line, second is the about line.
  if (preamble.length > 0) {
    const contact = parseContact(preamble[0]);
    tel = contact.tel;
    email = contact.email;
    github = contact.github;
    if (contact.labels) Object.assign(labels, contact.labels);
  }
  if (preamble.length > 1) about = preamble[1];

  return {
    headers,
    labels,
    name,
    tel,
    email,
    github,
    about,
    edu,
    skills,
    works,
    projects,
    research,
  };
}

/**
 * Render a run of (block or inline) tokens to plain text. Markdown links are
 * reduced to their `href` so the plain-text resume keeps full URLs (and stays
 * independent of link label typos). Autolinks (bare email/URL) already have
 * `href === text`, so they round-trip unchanged.
 */
function toText(tokens: Token[] | undefined): string {
  if (!tokens) return "";
  let out = "";
  for (const tk of tokens) {
    const t = tk as Token & { href?: string; text?: string; tokens?: Token[] };
    if (t.type === "link" || t.type === "image") {
      // Email autolinks carry a synthetic `mailto:` prefix in `href`; keep
      // the visible address so the contact line round-trips unchanged.
      if (t.href && t.text === t.href.replace(/^mailto:/, "")) {
        out += t.text;
        continue;
      }
      out += t.href || toText(t.tokens) || t.text || "";
      continue;
    }
    if (t.type === "br") {
      out += " ";
      continue;
    }
    if (t.type === "codespan") {
      out += t.text ?? "";
      continue;
    }
    if (Array.isArray(t.tokens) && t.tokens.length > 0) {
      out += toText(t.tokens);
      continue;
    }
    if (typeof t.text === "string") out += t.text;
  }
  return out;
}

/** Parse "Phone: X | Email: Y | GitHub: Z" positionally into contact fields. */
function parseContact(line: string): {
  tel: string;
  email: string;
  github: string;
  labels?: { tel: string; email: string; github: string };
} {
  const parts = line.split("|").map((p) => p.trim());
  const split = (part: string | undefined): [string, string] => {
    if (!part) return ["", ""];
    const idx = part.indexOf(":");
    if (idx === -1) return ["", part.trim()];
    return [part.slice(0, idx).trim(), part.slice(idx + 1).trim()];
  };
  const [telLabel, tel] = split(parts[0]);
  const [emailLabel, email] = split(parts[1]);
  const [githubLabel, github] = split(parts[2]);
  return {
    tel,
    email,
    github,
    labels: { tel: telLabel, email: emailLabel, github: githubLabel },
  };
}

/**
 * Convert a run of block tokens into structured {@link ResumeBlock}s,
 * preserving paragraphs (`text`) and bullet lists (`list`) as distinct blocks
 * so lists can be rendered as a real `<ul>`.
 */
function toBlocks(blocks: Token[]): ResumeBlock[] {
  const out: ResumeBlock[] = [];
  for (const block of blocks) {
    if (block.type === "paragraph") {
      const text = toText((block as Tokens.Paragraph).tokens).trim();
      if (text) out.push({ kind: "text", text });
    } else if (block.type === "list") {
      const items: string[] = [];
      for (const item of (block as Tokens.List).items) {
        const text = toText(item.tokens).trim();
        if (text) items.push(text);
      }
      if (items.length > 0) out.push({ kind: "list", items });
    } else if (block.type === "text") {
      const text = toText((block as Tokens.Text).tokens).trim();
      if (text) out.push({ kind: "text", text });
    }
  }
  return out;
}

/** Flatten a run of block tokens into a single "; "-joined string. */
function flatten(blocks: Token[]): string {
  return toBlocks(blocks)
    .map((b) => (b.kind === "text" ? b.text : b.items.join("; ")))
    .join("; ");
}

/** Extract plain bullet strings from a section's block tokens. */
function parseList(blocks: Token[]): string[] {
  const out: string[] = [];
  for (const block of blocks) {
    if (block.type === "list") {
      for (const item of (block as Tokens.List).items) {
        const text = toText(item.tokens).trim();
        if (text) out.push(text);
      }
    } else if (block.type === "paragraph") {
      const text = toText((block as Tokens.Paragraph).tokens).trim();
      if (text) out.push(text);
    }
  }
  return out;
}

/** Education rows: split each bullet on the "·" separator into 3 columns. */
function parseEdu(blocks: Token[]): string[][] {
  return parseList(blocks).map((row) => {
    const cols = row.split("·").map((c) => c.trim());
    while (cols.length < 3) cols.push("");
    return cols.slice(0, 3) as [string, string, string];
  });
}

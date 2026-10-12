import { Fragment } from "react";

import { LINK } from "@/components/paper/paper-tokens";

const URL_RE = /https?:\/\/[^\s<>"'，。；、）)】]+/g;

export function PaperLinkText({ text }: { text: string }) {
  const parts = text.split(URL_RE);
  const urls = text.match(URL_RE) ?? [];
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {part}
          {urls[i] && (
            <a
              href={urls[i]}
              target="_blank"
              rel="noopener noreferrer"
              className={`${LINK} hover:underline`}
            >
              {urls[i]}
            </a>
          )}
        </Fragment>
      ))}
    </>
  );
}

/**
 * Copyright (c) 2026 hangtiancheng
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import { z } from "zod";

const headersSchema = z.object({
  edu: z.string(),
  skills: z.string(),
  works: z.string(),
  projects: z.string(),
  research: z.string(),
});

// Locale-aware UI chrome labels (contact chips, language toggle button)
const labelsSchema = z.object({
  tel: z.string(),
  email: z.string(),
  github: z.string(),
  switch: z.string(),
});

const eduSchema = z.tuple([z.string(), z.string(), z.string()]);

const titledItemSchema = z.object({
  title: z.string(),
  content: z.string(),
});

const resumeSchema = z.object({
  headers: headersSchema,
  labels: labelsSchema,
  name: z.string(),
  tel: z.string(),
  email: z.string(),
  github: z.string(),
  about: z.string(),
  edu: z.array(eduSchema),
  skills: z.array(z.string()),
  works: z.array(titledItemSchema),
  projects: z.array(titledItemSchema),
  research: z.string(),
});

export type Resume = z.infer<typeof resumeSchema>;
export type Headers = z.infer<typeof headersSchema>;
export type Labels = z.infer<typeof labelsSchema>;
export type edu = z.infer<typeof eduSchema>;
export type TitledItem = z.infer<typeof titledItemSchema>;

export { resumeSchema };

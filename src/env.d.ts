/// <reference types="vite/client" />

declare module "*.html" {
  const template:
    import("@lark.js/mvc").ViewTemplate | import("@lark.js/mvc").VDomTemplate;
  export default template;
}

declare module "*.css" {
  const content: string;
  export default content;
}

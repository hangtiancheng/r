import postcssColorMixFunction from "@csstools/postcss-color-mix-function";
import postcssOklabFunction from "@csstools/postcss-oklab-function";

// cSpell: words Oklab oklab oklch

// Examples of color syntaxes that html2canvas cannot parse from Tailwind output:
// color: oklch(70% 0.15 250);
// color: oklab(70% 0.05 -0.08);
// background-color: color-mix(in oklab, var(--color-white) 80%, transparent);
// color: color(display-p3 0.93622 0.94862 0.99562);
// background-image: linear-gradient(in lab, red, blue);
// @supports (color: color-mix(in lab, red, red)) { ... }
// @supports (color: color(display-p3 0 0 0%)) { ... }
// @supports (background-image: linear-gradient(in lab, red, red)) { ... }

const unsupportedColorFeaturePattern =
  /color-mix\(|color\(display-p3|linear-gradient\(in lab/;

const discardUnsupportedColorSupports = {
  postcssPlugin: "discard-unsupported-color-supports",
  AtRule: {
    supports(rule) {
      if (unsupportedColorFeaturePattern.test(rule.params)) {
        rule.remove();
      }
    },
  },
};

export default {
  plugins: [
    // Erase color-mix(...) by converting statically resolvable usages to rgb(...).
    // Disable display-p3 output so the plugin does not emit color(display-p3 ...).
    postcssColorMixFunction({
      preserve: false,
      subFeatures: {
        displayP3: false,
      },
    }),
    // Erase oklch(...) and oklab(...) by converting them to rgb(...).
    // Disable display-p3 output so the plugin does not emit color(display-p3 ...).
    postcssOklabFunction({
      preserve: false,
      subFeatures: {
        displayP3: false,
      },
    }),
    // Erase progressive @supports branches that still contain unsupported syntax,
    // including color-mix(...), color(display-p3 ...), and linear-gradient(in lab, ...).
    discardUnsupportedColorSupports,
  ],
};

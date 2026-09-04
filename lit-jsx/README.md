# lit-jsx

`lit-jsx` is a library that provides a convenient way to build Lit components using JSX syntax. The only dependency for the library is `lit` itself.

## Why?

Personal aesthetic preference: I am on board with everything about Lit but I cannot bring myself to write components using string templates.

## Installation

You can install `lit-jsx` via npm:

```bash
npm install @swifty.js/lit-jsx
```

## Usage

To use `lit-jsx` simply import from `@swifty.js/lit-jsx` whatever you would otherwise import from `lit`. You also need to configure your bundler or transpiler to use `lit-jsx` for processing JSX, instead of the default. For example in TypeScript you would add something like this to your `tsconfig.json`:

```json
{
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "@swifty.js/lit-jsx",
    "types": ["@swifty.js/lit-jsx"]
  }
}
```

There is a similar mechanism for Babel where you would add something like this to your `babel.config.js`:

```json
{
  "plugins": [
    [
      "@babel/plugin-transform-react-jsx",
      {
        "throwIfNamespace": false,
        "runtime": "automatic",
        "importSource": "@swifty.js/lit-jsx"
      }
    ]
  ]
}
```

### Example

```typescript
import { LitElement, createRoot, customElement } from '@swifty.js/lit-jsx';

@customElement('my-app')
class App extends LitElement {
    render() {
        return (
            <button onClick={console.log}>
                Click Me!
            </button>
        );
    }
}

const app = document.createElement('div');
document.body.appendChild(app);

const root = createRoot(app);
root.render(new App());

// Clean up.
const onUnload = () => {
    window.removeEventListener('beforeunload', onUnload);
    root.unmount();
};
window.addEventListener('beforeunload', onUnload);
```

### Running the Example

```bash
cd ./example
npm install
npm run watch
```

Go to https://localhost:8080/

### Custom Elements

`lit-jsx` allows you to customize what should be rendered for each tag name. For example, if you want JSX `<button />` to result in `<my-custom-button />`, you would pass an override in your registry.

Here's how you would do that:

```typescript
import { assignElements, resetElements } from "@swifty.js/lit-jsx";

// Define your custom elements
const customElements = {
  button: "my-custom-button",
  // Add more custom elements as needed
};

// Assign your custom elements
assignElements(customElements);

// Later, if you want to reset to the default elements
resetElements();
```

#### And why in the world would I want to do _that_?

The original motivation behind this jsx-runtime was for a WebXR UI framework I was working on. In WebXR, any UI you make _has_ to be rendered using Canvas/webgl which is as fun as it sounds so I wanted to be able to define UI components using HTML syntax. My basic idea was to create webgl/three-js versions of each HTML element and then configure `lit-jsx` so that whenever the JSX called for say, a “button” to be rendered, the webgl equivalent would be rendered instead.

I got a fair amount of it working including divs, images, text, overflow management, scroll bars, flex-box, border-radii, background colors, etc.
<details>
<summary>Expand to see the code for this "component"</summary>

</details>

Good times though.

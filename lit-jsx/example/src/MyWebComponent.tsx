import {
  LitElement,
  state,
  Ref,
  createRef,
  customElement,
  property,
} from "@swifty.js/lit-jsx";

interface FunctionalComponentProps {
  onClick: () => void;
  count: number;
}
function FunctionalComponent({ onClick, count }: FunctionalComponentProps) {
  return <button onClick={onClick}>Bye {count}</button>;
}

@customElement("class-component-wc")
class ClassComponent extends LitElement {
  @property({ type: Number })
  count?: number;

  @property({ type: Function })
  onClick?: ((event: Event) => void) | null;

  render() {
    return <button onClick={this.onClick}>Wow {this.count}</button>;
  }
}

@customElement("counter-wc")
export default class Counter extends LitElement {
  // Render the UI as a function of component state
  @state()
  private _counter = 0;

  private _classComponentRef: Ref<ClassComponent> = createRef();
  private _buttonRef: Ref<HTMLButtonElement> = createRef();

  private _increment = () => {
    this._counter++;
  };

  render() {
    return (
      <>
        <FunctionalComponent onClick={this._increment} count={this._counter} />
        <ClassComponent
          ref={this._classComponentRef}
          onClick={this._counter > 5 ? null : this._increment}
          count={this._counter}
        />
        <button
          ref={this._buttonRef}
          onClick={this._counter > 5 ? undefined : this._increment}
        >
          Hi {this._counter}
        </button>
      </>
    );
  }
}

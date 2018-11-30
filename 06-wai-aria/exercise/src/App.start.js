/*

Follow the WAI ARIA Radio Group example at:
https://www.w3.org/TR/wai-aria-practices-1.1/examples/radio/radio-1/radio-1.html

- Turn the span into a button to get keyboard and focus events
- Use tabIndex to allow only the active button to be tabbable
- Use left/right arrows to select the next/previous radio button
  - Tip: you can figure out the next value with React.Children.forEach(fn),
    or React.Children.toArray(children).reduce(fn)
- Move the focus in cDU to the newly selected item
  - Tip: do it in RadioOption not RadioGroup
  - Tip: you'll need a ref
- Add the aria attributes
  - radiogroup
  - radio
  - aria-checked
  - aria-label on the icons

*/
import React, { Component } from "react";
import FaPlay from "react-icons/lib/fa/play";
import FaPause from "react-icons/lib/fa/pause";
import FaForward from "react-icons/lib/fa/forward";
import FaBackward from "react-icons/lib/fa/backward";

const findNextValue = (children, currentValue) => {
  let childrenArray = React.Children.toArray(children);
  let currentIndex = childrenArray.findIndex(child => child.props.value === currentValue);
  if (currentIndex === childrenArray.length - 1) { currentIndex = -1; }
  return childrenArray[currentIndex + 1].props.value;
};

const findPrevValue = (children, currentValue) => {
  let childrenArray = React.Children.toArray(children);
  let currentIndex = childrenArray.findIndex(child => child.props.value === currentValue);
  if (currentIndex === 0) { currentIndex = childrenArray.length; }
  return childrenArray[currentIndex - 1].props.value;
};

class RadioGroup extends Component {
  state = {
    value: this.props.defaultValue
  };

  render() {
    const children = React.Children.map(this.props.children, child => {
      return React.cloneElement(child, {
        isActive: child.props.value === this.state.value,
        onSelect: () => this.setState({ value: child.props.value })
      });
    });
    return (
      <fieldset
        className="radio-group"
        role="radiogroup"
        onKeyDown={(event) => {
          if (event.key === "ArrowRight") {
            this.setState({
              value: findNextValue(this.props.children, this.state.value)
            });
          } else if (event.key === "ArrowLeft") {
            this.setState({
              value: findPrevValue(this.props.children, this.state.value)
            });
          }
        }}
      >
        <legend>{this.props.legend}</legend>
        {children}
      </fieldset>
    );
  }
}

class RadioButton extends Component {
  buttonRef = React.createRef();
  componentDidUpdate(prevProps) {
    if (!prevProps.isActive && this.props.isActive) {
      this.buttonRef.current.focus();
    }
  }
  render() {
    const { isActive, onSelect } = this.props;
    const className = "radio-button " + (isActive ? "active" : "");
    return (
      <button className={className} onClick={onSelect} tabIndex={(isActive) ? 0 : -1} ref={this.buttonRef}>
        {this.props.children}
      </button>
    );
  }
}

const Group = () => {
  return (
    <div>
      <RadioGroup defaultValue="pause" legend="Radio Group">
        <RadioButton value="back">
          <FaBackward />
        </RadioButton>
        <RadioButton value="play">
          <FaPlay />
        </RadioButton>
        <RadioButton value="pause">
          <FaPause />
        </RadioButton>
        <RadioButton value="forward">
          <FaForward />
        </RadioButton>
      </RadioGroup>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div>
        <Group></Group>
        <Group></Group>
      </div>
    );
  }
}

export default App;

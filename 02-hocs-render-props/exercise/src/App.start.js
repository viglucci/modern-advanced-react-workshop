import React from "react";
import createMediaListener from "./lib/createMediaListener";
import { Galaxy, Trees, Earth } from "./lib/screens";

const withMedia = (options) => {
  const mediaListener = createMediaListener(options);
  return (WrappedComponent) => {
    return class extends React.Component {
      state = {
        media: mediaListener.getState()
      };
    
      componentDidMount() {
        mediaListener.listen(media => this.setState({ media }));
      }
    
      componentWillUnmount() {
        mediaListener.dispose();
      }
  
      render () {
        const { media } = this.state;
        return <WrappedComponent {...media} />;
      }
    }
  };
};

class App extends React.Component {
  render() {
    const { big, tiny } = this.props;
    return (
      <div>
        {big ? (
          <Galaxy key="galaxy" />
        ) : tiny ? (
          <Trees key="trees" />
        ) : (
          <Earth key="earth" />
        )}
      </div>
    );
  }
}

const mediaAwareApp = withMedia({
  big: "(min-width : 1000px)",
  tiny: "(max-width: 600px)"
})(App);

export default mediaAwareApp;

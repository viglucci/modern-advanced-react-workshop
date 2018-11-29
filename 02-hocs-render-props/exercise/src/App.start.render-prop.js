import React from "react";
import createMediaListener from "./lib/createMediaListener";
import { Galaxy, Trees, Earth } from "./lib/screens";

class MediaAware extends React.Component {

  mediaListener = createMediaListener(this.props.options);

  state = {
    media: this.mediaListener.getState()
  };

  componentDidMount() {
    this.mediaListener.listen(media => this.setState({ media }));
  }

  componentWillUnmount() {
    this.mediaListener.dispose();
  }
  
  render() {
    return this.props.render(this.state.media);
  }
}

class App extends React.Component {
  render() {
    const options = {
      big: "(min-width : 1000px)",
      tiny: "(max-width: 600px)"
    };
    return <MediaAware options={options} render={(media) => {
      const { big, tiny } = media;
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
    }} />
  }
}

export default App;

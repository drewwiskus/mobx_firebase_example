import React from "react";
import { Style } from "./types/Style";
import "./config/styleReset.css";

// TODO
// router
// mobx
// firebase

export class App extends React.Component {
  public render(): JSX.Element {
    return <div style={styles.container} />;
  }
}

const styles: Style = {
  container: {
    backgroundColor: "green",
    height: `100vh`,
    width: `100vw`
  }
};

import React from 'react'
import { Style } from './types/Style'
import './config/styleReset.css'
import { GameScreen } from './Screens/GameScreen/GameScreen'

// TODO
// router
// mobx
// firebase

export class App extends React.Component {
  public render(): JSX.Element {
    return (
      <div style={styles.container}>
        <GameScreen />
      </div>
    )
  }
}

const styles: Style = {
  container: {
    backgroundColor: 'white',
    height: `100vh`,
    width: `100vw`
  }
}

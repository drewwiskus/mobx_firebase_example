import React from 'react'
import { CssStyle } from './config/types/Style'
import './config/styleReset.css'

export class App extends React.Component {
    public render(): JSX.Element {
        return (
            <div style={styles.container}>
                <div>Hello World</div>
            </div>
        )
    }
}

const styles: CssStyle = {
    container: {
        backgroundColor: 'white',
        height: `100vh`,
        width: `100vw`
    }
}

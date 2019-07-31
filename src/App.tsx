import React from 'react'
import { CssStyleSheet } from './config/types/Style'
import './config/styleReset.css'
import { AuthStore } from 'data/AuthStore'
import { Provider } from 'mobx-react'
import { Router } from 'routing/Router'
import { ChatRoomStore } from 'data/ChatRoomStore'

const authStore = new AuthStore()
const chatRoomStore = new ChatRoomStore()

export class App extends React.Component {
    public render(): JSX.Element {
        return (
            <Provider authStore={authStore} chatRoomStore={chatRoomStore}>
                <div style={styles.container}>
                    <Router />
                </div>
            </Provider>
        )
    }
}

const styles: CssStyleSheet = {
    container: {
        backgroundColor: 'white',
        height: `100vh`,
        width: `100vw`
    }
}

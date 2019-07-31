import { AuthStore } from 'data/AuthStore'
import React from 'react'
import { inject, observer } from 'mobx-react'
import { ChatRoomStore, ChatLog } from 'data/ChatRoomStore'
import { CssStyleSheet } from 'config/types/Style'

interface Props {
    authStore?: AuthStore
    chatRoomStore?: ChatRoomStore
}

interface State {
    inputValue: string
}

@inject('authStore', 'chatRoomStore')
@observer
export class ChatRoomScreen extends React.Component<Props, State> {
    public state: State = {
        inputValue: ''
    }

    public render(): JSX.Element {
        return (
            <div style={{ padding: 25 }}>
                <button onClick={this.props.authStore!.logout}>LOG OUT!</button>
                <button onClick={this.props.chatRoomStore!.clearChatLog}>CLEAR CHAT!!</button>
                <h1 style={{ marginTop: 10, marginBottom: 10 }}>chatrooooom</h1>

                <input
                    value={this.state.inputValue}
                    onChange={event => this.setState({ inputValue: event.target.value })}
                    style={{ marginBottom: 15 }}
                    onKeyPress={event => {
                        if (event.key === 'Enter') {
                            event.preventDefault()
                            this.props.chatRoomStore!.sendMessage(this.state.inputValue)
                            this.setState({ inputValue: '' })
                        }
                    }}
                />

                {this.props.chatRoomStore!.chatLog.map(log => {
                    return <ChatLogRow log={log} />
                })}
            </div>
        )
    }
}

const ChatLogRow = (props: { log: ChatLog }) => {
    return (
        <div key={props.log.id} style={styles.chatLogContainer}>
            <p style={styles.chatLogUser}>{props.log.user}</p>
            <p style={styles.chatLogText}>{props.log.text}</p>
        </div>
    )
}

const styles: CssStyleSheet = {
    chatLogContainer: { display: 'flex', marginBottom: 5, flexDirection: 'row' },
    chatLogUser: { width: 250, fontSize: 18, fontWeight: 'lighter', marginRight: 15 },
    chatLogText: { fontSize: 18 }
}

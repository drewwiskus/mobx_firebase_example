import * as React from 'react'

import { AuthStore } from 'data/AuthStore'
import { inject, observer } from 'mobx-react'
import { ChatRoomScreen } from 'screens/ChatRoomScreen'
import { LoginScreen } from 'screens/LoginScreen'
import { when, IReactionDisposer } from 'mobx'

interface Props {
    authStore?: AuthStore
}

interface State {
    isLoading: boolean
}

@inject('authStore')
@observer
export class Router extends React.Component<Props, State> {
    private _loadingTimerDisposer: IReactionDisposer | null = null

    public state = {
        isLoading: true
    }

    public componentDidMount(): void {
        // poor example but this is how when works + there are more util functions you can use
        this._loadingTimerDisposer = when(
            () => this.props.authStore!.isAuthed != null,
            () => {
                setTimeout(() => {
                    this.setState({ isLoading: false })
                }, 1000)
            }
        )
    }

    public componentWillUnmount(): void {
        if (this._loadingTimerDisposer != null) {
            this._loadingTimerDisposer()
        }
    }

    public render(): JSX.Element {
        if (this.state.isLoading == true) {
            return <h1>fake loading...</h1>
        }

        return this.props.authStore!.isAuthed ? <ChatRoomScreen /> : <LoginScreen />
    }
}

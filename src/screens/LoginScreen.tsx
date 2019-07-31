import * as React from 'react'
import { AuthStore } from 'data/AuthStore'
import { inject } from 'mobx-react'
import { CssStyleSheet } from 'config/types/Style'

interface Props {
    authStore?: AuthStore
}

@inject('authStore')
export class LoginScreen extends React.Component<Props> {
    public render(): JSX.Element {
        return (
            <>
                <h1 style={styles.header}>:)</h1>

                <button style={styles.buttonContainer} onClick={() => this.props.authStore!.loginWithGoogle()}>
                    login w/ google pls
                </button>
            </>
        )
    }
}

const styles: CssStyleSheet = {
    header: {
        marginTop: 100,
        marginLeft: 25,
        fontSize: 45
    },
    buttonContainer: {
        marginTop: 25,
        marginLeft: 25,
        width: 500,
        height: 65,
        border: 'none',
        outline: 'none',
        backgroundColor: 'salmon',
        color: 'white',
        fontSize: 25
    }
}

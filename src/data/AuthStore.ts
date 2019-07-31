import { observable, computed } from 'mobx'
import { FirebaseService } from './FirebaseService'

export interface User {
    uuid: string
    name: string
}

export class AuthStore {
    public constructor() {
        FirebaseService.onAuthChanged(this.onAuthChanged)
    }

    @observable private _user: User | null = null
    @observable private _isAuthed: boolean = false

    @computed public get user(): User {
        if (this._user == null) {
            throw Error("We shouldn't be calling for user, the User is not available")
        }

        return this._user
    }

    @computed public get isAuthed(): boolean {
        return this._isAuthed
    }

    private onAuthChanged = (user: User | null) => {
        if (user == null) {
            this._isAuthed = false
            this._user = null
            return
        }

        this._user = user
        this._isAuthed = true
    }

    public loginWithGoogle() {
        FirebaseService.loginWithGoogle()
    }

    public logout() {
        FirebaseService.logout()
    }
}

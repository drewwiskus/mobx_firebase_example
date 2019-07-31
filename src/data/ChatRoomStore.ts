import { observable, computed } from 'mobx'
import { FirebaseService } from './FirebaseService'

export interface ChatLog {
    text: string
    id: string
    user: string
}

export class ChatRoomStore {
    public constructor() {
        FirebaseService.onChatLogUpdated((chatLog: ChatLog[]) => {
            this._chatLog = chatLog
        })
    }

    @observable private _chatLog: ChatLog[] = []

    @computed get chatLog() {
        return [...this._chatLog].reverse()
    }

    public sendMessage = (message: string) => {
        FirebaseService.sendChatMessage(message)
    }

    public clearChatLog = () => {
        FirebaseService.clearChatLog()
    }
}

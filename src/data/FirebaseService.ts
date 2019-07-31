import * as firebase from 'firebase'
import { User } from './AuthStore'
import { ChatLog } from './ChatRoomStore'

firebase.initializeApp({
    apiKey: 'AIzaSyCTZ6PHYSCWx6FNeTB6__fjDjLr2cyh954',
    authDomain: 'codewalk-chat.firebaseapp.com',
    databaseURL: 'https://codewalk-chat.firebaseio.com',
    projectId: 'codewalk-chat',
    storageBucket: '',
    messagingSenderId: '635203944276',
    appId: '1:635203944276:web:71531be329fed517'
})

export class FirebaseService {
    public static onAuthChanged = (callback: (user: User | null) => void) => {
        firebase.auth().onAuthStateChanged(userSnapshot => {
            if (userSnapshot == null) {
                callback(userSnapshot)
                return
            }

            const user: User = {
                uuid: userSnapshot.uid,
                name: 'drew'
            }

            callback(user)
        })
    }

    public static onChatLogUpdated = (callback: (chatLog: ChatLog[]) => void) => {
        firebase
            .database()
            .ref()
            .child('chatLog')
            .on('value', snapshot => {
                const val = snapshot.val()
                let log: ChatLog[] = []

                if (val == null) {
                    callback([])
                    return
                }

                Object.keys(val).forEach(key => {
                    log.push({
                        id: key,
                        user: val[key].user,
                        text: val[key].text
                    })
                })

                callback(log)
            })
    }

    public static sendChatMessage = (message: string) => {
        firebase
            .database()
            .ref()
            .child('chatLog')
            .push({
                text: message,
                user: firebase.auth().currentUser!.email
            })
    }

    public static clearChatLog = () => {
        firebase
            .database()
            .ref()
            .child('chatLog')
            .set({})
    }

    public static loginWithGoogle = () => {
        var provider = new firebase.auth.GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/contacts.readonly')

        firebase.auth().signInWithPopup(provider) // you can .then() .catch()
    }

    public static logout = () => {
        firebase.auth().signOut()
    }
}

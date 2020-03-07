import firebase from 'firebase'
import config from './config'
import '@firebase/firestore'

const firebaseApp = firebase.initializeApp(config)

firebaseApp.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

export default firebaseApp

import firebase from 'firebase'
import config from './config'
import '@firebase/firestore'

const Firebase = firebase.initializeApp(config)

Firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)

export default Firebase

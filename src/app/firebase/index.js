import firebase from 'firebase'
import { config } from './config'
import '@firebase/firestore'

const Firebase = firebase.initializeApp(config)

export default Firebase

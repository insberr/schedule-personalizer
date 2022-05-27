import { FirebaseOptions, initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
import { getDatabase } from 'firebase/database'

const firebaseConfig: FirebaseOptions = { // todo: copy the things
apiKey: "AIzaSyAPhi8PNcv-PJeu9wJ5qj8oCVj8c5bx3O0",
authDomain: "schedule-personalizer-70ac7.firebaseapp.com",
projectId: "schedule-personalizer-70ac7",
storageBucket: "schedule-personalizer-70ac7.appspot.com",
messagingSenderId: "982359110019",
appId: "1:982359110019:web:1b60a09e7b9b42533dc6b6",
measurementId: "G-0JFN98Q4NT",
databaseURL: "schedule-personalizer-70ac7-default-rtdb.firebaseio.com"
}

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const database = getDatabase(app);

export { app, analytics, database };

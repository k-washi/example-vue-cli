import firebase from "@firebase/app";
import "@firebase/auth";
import router from "./router"
import store from "./store";
import { createSecretKey } from "crypto";

//firebase config
const firebaseConfig = {
  apiKey: process.env.VUE_APP_FB_KEY,
  authDomain: process.env.VEW_APP_FB_DOMEIN + ".firebaseapp.com",
  databaseURL: process.env.VUE_APP_FB_ID + ".firebaseio.com",
  projectId: process.env.VUE_APP_FB_PROD_ID,
  storageBucket: process.env.VUE_APP_FB_BUCKET_ID,
  messagingSenderId: process.env.VUE_APP_FB_SENDER_ID,
};

export default {
  init() {
    firebase.initializeApp(firebaseConfig);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
  },
  signInWithEmailAndPassword(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(res => {
        res.user.getIdToken().then(idToken => {
          console.log("signin", idToken)
          localStorage.setItem('jwt', idToken);
          router.push('/').catch(err => {
            console.log("router push /");
          });
        })
        //this.onAuth();
       
      }, err => {
        console.log(err.message);
      })
  },
  signUpWithEmailAndPassword(email, password) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(res => {
        router.push('/signin');
      }).catch(err => {
        console.log(err.message);
      })
  },
  logOut() {
    firebase.auth().signOut()
      .then(() => {
        localStorage.removeItem("jwt")
        store.commit('onAuthNameChanged', "Anonymous user")
        store.commit('onAuthEmailChanged', "");
        store.commit('onUserStatusChanged', false)
      })
      .catch((err) => {
        console.log(`fail logout (${error}) `);
      })
  },
  onAuth() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (user.ma) {
          localStorage.setItem('jwt', user.ma);
        } 
        if (user.displayName) {
          store.commit('onAuthNameChanged', user.displayName)
        } else {
          store.commit('onAuthNameChanged', "Anonymous user") 
        }
        store.commit('onAuthEmailChanged', user.email);
        if (user.uid) {
          store.commit('onUserStatusChanged', true) 
        } else {
          store.commit('onUserStatusChanged', false)
        }
      } else {
        store.commit('onAuthNameChanged', "Anonymous user")
        store.commit('onAuthEmailChanged', "")
        store.commit('onUserStatusChanged', false)
      }
      

    })
  },
  updateUserConfig(userName) {
    let user = firebase.auth().currentUser;
    user.updateProfile({
      displayName: userName,
    }).then(res => {
      console.log("Success userinfo")
      this.onAuth()
    }).catch(err => {
      console.log("userinfo update fail")
      console.log(err)
    })
    
  }
}

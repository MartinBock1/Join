import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';

const firebaseConfig = {
  projectId: 'joindb-994e9',
  appId: '1:975674968055:web:bc9031cfcf1831cc1dd0f2',
  storageBucket: 'joindb-994e9.firebasestorage.app',
  apiKey: 'AIzaSyAzcAlQ3T0BpGKq4bC30KjqrQ2jGMB1OEs',
  authDomain: 'joindb-994e9.firebaseapp.com',
  messagingSenderId: '975674968055',
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  //  User Data
  email = 'conan@edo.de';
  password = 'D1#tester';
  name = '';

  //  Authentication State
  isUserLoggedIn = false;

  constructor() {}

  /**
   * Registers a new user with email, password, and name.
   * @param {string} email - The email address of the new user.
   * @param {string} pw - The password for the new user.
   * @param {string} name - The display name of the new user.
   */
  signUp(email: string, pw: string, name: string): void {
    createUserWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        const user = userCredential.user;

        if (auth.currentUser) {
          updateProfile(auth.currentUser, {
            displayName: name,
          })
            .then(() => {
              this.name = name;
            })
            .catch((error) => {
              const errorCode = error.code;
              const errorMessage = error.message;
            });
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  /**
   * Logs in a user with the given email and password.
   * @param {string} email - The user's email address.
   * @param {string} pw - The user's password.
   * @returns {Promise<boolean>} A promise resolving to `true` if login succeeds, otherwise `false`.
   */
  login(email: string, pw: string): Promise<boolean> {
    return signInWithEmailAndPassword(auth, email, pw)
      .then((userCredential) => {
        const user = userCredential.user;
        this.name = user.displayName ?? '';
        this.isUserLoggedIn = true;
        return true;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        return false;
      });
  }

  /**
   * Logs out the currently authenticated user.
   */
  logout(): void {
    signOut(auth)
      .then(() => {
        this.isUserLoggedIn = false;
        this.name = '';
      })
      .catch((error) => {
        console.log('Mist, ist schief gelaufen');
      });
  }
}

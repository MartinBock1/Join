import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { getAuth, provideAuth } from '@angular/fire/auth';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    // importProvidersFrom(
    //   provideFirebaseApp(() =>
    //     initializeApp({
    //       projectId: 'joindb-994e9',
    //       appId: '1:975674968055:web:bc9031cfcf1831cc1dd0f2',
    //       storageBucket: 'joindb-4dd40.firebasestorage.app',
    //       apiKey: 'AIzaSyAzcAlQ3T0BpGKq4bC30KjqrQ2jGMB1OEs',
    //       authDomain: 'joindb-994e9.firebaseapp.com',
    //       messagingSenderId: '975674968055',
    //     })
    //   )
    // ),
    // importProvidersFrom(provideAuth(() => getAuth())),
    // importProvidersFrom(provideFirestore(() => getFirestore())),
    importProvidersFrom(
      provideFirebaseApp(() =>
        initializeApp({
          projectId: 'joindb-994e9',
          appId: '1:975674968055:web:bc9031cfcf1831cc1dd0f2',
          storageBucket: 'joindb-994e9.firebasestorage.app',
          apiKey: 'AIzaSyAzcAlQ3T0BpGKq4bC30KjqrQ2jGMB1OEs',
          authDomain: 'joindb-994e9.firebaseapp.com',
          messagingSenderId: '975674968055',
        })
      )
    ),
    importProvidersFrom(provideAuth(() => getAuth())),
    importProvidersFrom(provideFirestore(() => getFirestore())),
  ],
};

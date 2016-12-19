import { Stream } from 'most';
import { DriverFn } from '@motorcycle/core';
import { create } from '@most/create';
import hold from '@most/hold';
import firebase = require('firebase');

export type FirebaseUserChange = firebase.User | null;

export function makeFirebaseUserDriver(onAuthStateChanged: (next: Object) => any): DriverFn {
  return function firebaseUserDriver(): Stream<FirebaseUserChange> {
    const source$: Stream<FirebaseUserChange> = create<FirebaseUserChange>((add) => {
      onAuthStateChanged((user: FirebaseUserChange) => {
        add(user);
      });
    })
      .thru(hold);

    source$.drain();

    return source$;
  };
}

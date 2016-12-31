import { NightWatchBrowser } from "nightwatch";
import * as admin from "firebase-admin";

const {
        FIREBASE_DATABASE_URL,
        EMAIL_AND_PASSWORD_TEST_EMAIL,
        EMAIL_AND_PASSWORD_TEST_PASSWORD,
        FIREBASE_ADMINSDK_TYPE,
        FIREBASE_ADMINSDK_PROJECT_ID,
        FIREBASE_ADMINSDK_PRIVATE_KEY_ID,
        FIREBASE_ADMINSDK_PRIVATE_KEY,
        FIREBASE_ADMINSDK_CLIENT_EMAIL,
        FIREBASE_ADMINSDK_CLIENT_ID,
        FIREBASE_ADMINSDK_AUTH_URI,
        FIREBASE_ADMINSDK_TOKEN_URI,
        FIREBASE_ADMINSDK_AUTH_PROVIDER_X509_CERT_URL,
        FIREBASE_ADMINSDK_CLIENT_X509_CERT_URL,
      } = process.env;

function getAuthAdmin() {
  try {
    admin.app();
  }
  catch (e) {
    const serviceAccount = {
      "type": FIREBASE_ADMINSDK_TYPE,
      "project_id": FIREBASE_ADMINSDK_PROJECT_ID,
      "private_key_id": FIREBASE_ADMINSDK_PRIVATE_KEY_ID,
      "private_key": FIREBASE_ADMINSDK_PRIVATE_KEY,
      "client_email": FIREBASE_ADMINSDK_CLIENT_EMAIL,
      "client_id": FIREBASE_ADMINSDK_CLIENT_ID,
      "auth_uri": FIREBASE_ADMINSDK_AUTH_URI,
      "token_uri": FIREBASE_ADMINSDK_TOKEN_URI,
      "auth_provider_x509_cert_url": FIREBASE_ADMINSDK_AUTH_PROVIDER_X509_CERT_URL,
      "client_x509_cert_url": FIREBASE_ADMINSDK_CLIENT_X509_CERT_URL,
    };
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount),
      databaseURL: FIREBASE_DATABASE_URL,
    });
  }

  return admin.auth() as any;
}

let authAdmin: any = getAuthAdmin();

function createUser(email: string, pwd: string) {
  return authAdmin.createUser({
    email: email,
    emailVerified: false,
    password: pwd,
    displayName: email,
    disabled: false
  })
    .then(function (userRecord: any) {
      console.log("Successfully created a new user:", userRecord.emailInternal);
    })
    .catch(function (error: any) {
      console.error("Error creating new user:", error);
      throw error;
    });
}

function deleteIfExistsAndRecreateUser(email: string, pwd: string) {
  deleteUserAndReturnPromise(email)
    .then(() => createUser(email, pwd));
}

function deleteUserAndReturnPromise(email: string) {
  return authAdmin.getUserByEmail(email)
    .then((userRecord: any) => {
      return authAdmin.deleteUser(userRecord.uid);
    })
    .catch(() => {
      // user does not exist already in the database - expected
    })
}

function deleteUser(email: string) {
  deleteUserAndReturnPromise(email);
}

function execTest(browser: NightWatchBrowser) {
  browser
    .url('http://localhost:8080/connect')
    .waitForElementVisible('#page', 1000) // wait for the page to display
    .setValue('.c-textfield__input--email', EMAIL_AND_PASSWORD_TEST_EMAIL)
    .setValue('.c-textfield__input--password', EMAIL_AND_PASSWORD_TEST_PASSWORD)
    .click('.c-btn.c-btn--primary.c-sign-in__submit') // click submit button
    .pause(4000) // give it time to redirect
    .assert.urlContains('dash') // we are on the dashboard page
    .end();
}

export = {
  before: deleteIfExistsAndRecreateUser(EMAIL_AND_PASSWORD_TEST_EMAIL, EMAIL_AND_PASSWORD_TEST_PASSWORD),
  after: deleteUser(EMAIL_AND_PASSWORD_TEST_EMAIL),
  'IDENT UAT 3.1: Create with Email, Already Exists, used correct password': execTest
};

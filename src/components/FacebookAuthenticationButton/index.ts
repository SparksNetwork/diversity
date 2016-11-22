import { Stream, constant, just, startWith } from 'most';
import { VNode, button } from '@motorcycle/dom';
import { REDIRECT, GET_REDIRECT_RESULT, AuthenticationType }
  from '../../drivers/firebase-authentication';
import {
  FacebookAuthenticationButtonSources,
  FacebookAuthenticationButtonSinks,
} from './types';
import firebase = require('firebase');

export function Button(
  sources: FacebookAuthenticationButtonSources): FacebookAuthenticationButtonSinks
{
  const { dom } = sources;

  (sources as any).authentication$.observe((x: any) => console.log(x));

  const click$: Stream<Event> =
    dom.select(facebookButtonId).events('click');

  const authentication$: Stream<AuthenticationType> =
    startWith(getRedirectResult, constant(facebookRedirectAuthentication, click$));

  const view$: Stream<VNode> = just(view);

  return {
    dom: view$,
    authentication$,
  };
}

const getRedirectResult: AuthenticationType =
  { method: GET_REDIRECT_RESULT }

const facebookRedirectAuthentication: AuthenticationType =
  {
    method: REDIRECT,
    provider: new firebase.auth.FacebookAuthProvider(),
  };

export const facebookButtonId = `#facebook-auth`;

const classNames: string =
  '.c-btn--large';

const style =
  {
    backgroundColor: 'royalblue',
    color: 'lavender',
  };

const view: VNode =
  button(facebookButtonId + classNames, { style }, [ 'Sign in with Facebook' ]);
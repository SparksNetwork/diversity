import { Component, Sources, Sinks } from '../component/types';
import { Profile } from './remote/types';
import { MainSources } from '../page/main';
import firebase = require('firebase');

import { merge, ifElse, prop, flip, append, takeLast, head, compose, not, Arity1Fn } from 'ramda';
import { Stream, just, merge as smerge } from 'most';
import hold from '@most/hold';

export type Middleware<So extends Sources, Si extends Sink> =
    (sources: Sources, next: Component<So, Si>) => Si;

const ifBool = (_if: Arity1Fn, _else: Arity1Fn) => ifElse(Boolean, _if, _else);

export function user(sources: MainSources, next: Component<any, any>): Sinks {
  const userProfileKey$: Stream<number> = sources.auth$.map(
    ifBool(({ uid }) => sources.firebase('Users', uid), () => just(null)))
    .switch()
    .thru(hold);

  const userProfile$: Stream<firebase.UserInfo> = userProfileKey$
    .skipRepeats()
    .map(ifBool(key => sources.firebase('Profiles', key), () => just(null)))
    .switch()
    .thru(hold);

  return next(merge(sources, { userProfile$, userProfileKey$ }));
}

export interface PreviousRouteSources extends MainSources {
  userProfile$: Stream<Profile>;
  userProfileKey$: Stream<number>;
}

export function previousRoute(sources: PreviousRouteSources, next: Component<any, any>): Sinks {
  const paths$ = sources.router.history$
    .map(prop('pathname'))
    .skipRepeats()
    .scan(flip(append), '/')
    .thru(hold);

  return next(merge(sources, {
    previousRoute$: paths$.map(compose(head, takeLast(2)))
  }));
}

export interface AuthSources extends PreviousRouteSources {
  previousRoute$: Stream<[string, string]>;
}

export function auth(sources: AuthSources, next: Component<any, any>): Sinks {
  const landing$ = sources.auth$.filter(not).constant('/landing');
  const confirm$ = sources.auth$.filter(Boolean)
    .map(() => sources.userProfile$.filter(not).constant('/confirm$'))
    .switch();

  return merge(next(sources), {
    router: smerge(landing$, confirm$)
  });
}

export function queue(sources: MainSources, next: Component<any, any>): Sinks {
  return merge(next(sources), {
    queue$: sources.auth$.map(auth =>
      sources.queue$.map(action => merge(action, { uid: auth.user.uid }))).switch();
  });
}

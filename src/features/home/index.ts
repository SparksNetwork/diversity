import { never, combine } from 'most';
import { Location } from '@motorcycle/history';
import { h2, a, div, p } from '@motorcycle/dom';
import { MainSinks, MainSources } from '../../app';
import { FirebaseUserChange } from '../../drivers/firebase-user';

export function Home(sources: MainSources): MainSinks {
  return {
    dom: combine(view, sources.router.history(), sources.user$),
    router: never(),
    authentication$: never(),
  };
}

function view(location: Location, user: FirebaseUserChange) {
  return div([
    h2(`Home: ${location.path}`),
    div([
      a('.connect', { props: { href: '/connect' } }, 'Connect'),
      p(' | '),
      a('.signin', { props: { href: '/signin' } }, 'Sign In'),
    ]),
    div(`${user}`),
  ]);
}

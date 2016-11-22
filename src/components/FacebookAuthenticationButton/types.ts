import { Stream } from 'most';
import { DOMSource, VNode } from '@motorcycle/dom';
import { AuthenticationType } from '../../drivers/firebase-authentication';

export interface FacebookAuthenticationButtonSources {
  dom: DOMSource;
}

export interface FacebookAuthenticationButtonSinks {
  dom: Stream<VNode>;
  authentication$: Stream<AuthenticationType>;
}

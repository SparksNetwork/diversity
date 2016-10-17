/// <reference path="../../../typings/index.d.ts" />
import * as assert from 'assert';
import { VNode, DOMSource, mockDOMSource } from '@motorcycle/dom';
import { just } from 'most';
import { AuthenticationMethod } from '../../higher-order-components/authenticate';
import { Login, LoginSinks } from './index';

// This function exists because @motorcycle/dom v3.0.0 does not yet
// have a common interface for mockDOMSource to implement
function mockAsDomSource(mockConfig): DOMSource {
  return mockDOMSource(mockConfig) as any as DOMSource;
}

const domSource = mockAsDomSource({});

const defaultSources = {
  DOM: domSource,
  isAuthenticated$: just(false)
};

describe('Login', () => {
  describe('Component', () => {
    it('should be a function', () => {
      assert(typeof Login === 'function');
    });

    describe('Sinks', () => {
      it('should be an object', () => {
        const sinks: LoginSinks = Login(defaultSources);
        assert(typeof sinks === 'object');
      });

      it('should contain property `DOM`', () => {
        assert(Login(defaultSources).hasOwnProperty('DOM'));
      });

      it('should contain property authenticationMethod$', () => {
        assert(Login(defaultSources).hasOwnProperty('authenticationMethod$'));
      });

      describe('DOM', () => {
        it('should be a stream', () => {
          assert(typeof Login(defaultSources).DOM.observe === 'function');
        });

        it('should contain a vNode', () => {
          return Login(defaultSources).DOM.observe((vNode: VNode) => {
            assert(typeof vNode === 'object');
          });
        });
      });

      describe('authenicationMethod$', () => {
        it('should be a stream', () => {
          assert(typeof Login(defaultSources).authenticationMethod$.observe === 'function');
        });

        it('should contain an AuthenticationMethod', () => {
          return Login(defaultSources).authenticationMethod$
            .observe((authenticationMethod: AuthenticationMethod) => {
              assert(typeof authenticationMethod === 'object');
            });
        });
      });
    });
  });
});
import { p } from '@motorcycle/dom';

export function displayError(userExists: boolean | null) {
  return userExists === null || userExists
    ? null
    : p({ style: { color: 'red' } }, 'User does not exist!');
}

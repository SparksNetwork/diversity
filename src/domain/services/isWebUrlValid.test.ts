/// <reference path="../../../typings/index.d.ts" />
import * as assert from 'assert';
import { isWebUrlValid } from './isWebUrlValid';

describe(`domain/services/isWebUrlValid`, () => {
  it(`should be a function`, () => {
    assert.equal(typeof isWebUrlValid, `function`);
  });

  it(`should return true, given a valid URL string`, () => {
    assert.ok(isWebUrlValid(`http://foo.com/blah_blah`));
    assert.ok(isWebUrlValid(`http://foo.com/blah_blah/`));
    assert.ok(isWebUrlValid(`http://foo.com/blah_blah_(wikipedia)`));
    assert.ok(isWebUrlValid(`http://foo.com/blah_blah_(wikipedia)_(again)`));
    assert.ok(isWebUrlValid(`http://www.example.com/wpstyle/?p=364`));
    assert.ok(isWebUrlValid(`https://www.example.com/foo/?bar=baz&inga=42&quux`));
    assert.ok(isWebUrlValid(`http://✪df.ws/123`));
    assert.ok(isWebUrlValid(`http://userid:password@example.com:8080`));
    assert.ok(isWebUrlValid(`http://userid:password@example.com:8080/`));
    assert.ok(isWebUrlValid(`http://userid@example.com`));
    assert.ok(isWebUrlValid(`http://userid@example.com/`));
    assert.ok(isWebUrlValid(`http://userid@example.com:8080`));
    assert.ok(isWebUrlValid(`http://userid@example.com:8080/`));
    assert.ok(isWebUrlValid(`http://userid:password@example.com`));
    assert.ok(isWebUrlValid(`http://userid:password@example.com/`));
    assert.ok(isWebUrlValid(`http://142.42.1.1/`));
    assert.ok(isWebUrlValid(`http://142.42.1.1:8080/`));
    assert.ok(isWebUrlValid(`http://➡.ws/䨹`));
    assert.ok(isWebUrlValid(`http://⌘.ws`));
    assert.ok(isWebUrlValid(`http://⌘.ws/`));
    assert.ok(isWebUrlValid(`http://foo.com/blah_(wikipedia)#cite-1`));
    assert.ok(isWebUrlValid(`http://foo.com/blah_(wikipedia)_blah#cite-1`));
    assert.ok(isWebUrlValid(`http://foo.com/unicode_(✪)_in_parens`));
    assert.ok(isWebUrlValid(`http://foo.com/(something)?after=parens`));
    assert.ok(isWebUrlValid(`http://☺.damowmow.com/`));
    assert.ok(isWebUrlValid(`http://code.google.com/events/#&product=browser`));
    assert.ok(isWebUrlValid(`http://j.mp`));
    assert.ok(isWebUrlValid(`ftp://foo.bar/baz`));
    assert.ok(isWebUrlValid(`http://foo.bar/?q=Test%20URL-encoded%20stuff`));
    assert.ok(isWebUrlValid(`http://مثال.إختبار`));
    assert.ok(isWebUrlValid(`http://例子.测试`));
    assert.ok(isWebUrlValid(`http://उदाहरण.परीक्षा`));
    assert.ok(isWebUrlValid(`http://-.~_!$&'()*+,;=:%40:80%2f::::::@example.com`));
    assert.ok(isWebUrlValid(`http://1337.net`));
    assert.ok(isWebUrlValid(`http://a.b-c.de`));
  });

  it(`should return false, given an invalid URL string`, () => {
    assert.ok(!isWebUrlValid('http://'));
    assert.ok(!isWebUrlValid('http://.'));
    assert.ok(!isWebUrlValid('http://..'));
    assert.ok(!isWebUrlValid('http://../'));
    assert.ok(!isWebUrlValid('http://?'));
    assert.ok(!isWebUrlValid('http://??'));
    assert.ok(!isWebUrlValid('http://??/'));
    assert.ok(!isWebUrlValid('http://#'));
    assert.ok(!isWebUrlValid('http://##'));
    assert.ok(!isWebUrlValid('http://##/'));
    assert.ok(!isWebUrlValid('http://foo.bar?q=Spaces should be encoded'));
    assert.ok(!isWebUrlValid('//'));
    assert.ok(!isWebUrlValid('//a'));
    assert.ok(!isWebUrlValid('///a'));
    assert.ok(!isWebUrlValid('///'));
    assert.ok(!isWebUrlValid('http:///a'));
    assert.ok(!isWebUrlValid('foo.com'));
    assert.ok(!isWebUrlValid('rdar://1234'));
    assert.ok(!isWebUrlValid('h://test'));
    assert.ok(!isWebUrlValid('http:// shouldfail.com'));
    assert.ok(!isWebUrlValid(':// should fail'));
    assert.ok(!isWebUrlValid('http://foo.bar/foo(bar)baz quux'));
    assert.ok(!isWebUrlValid('ftps://foo.bar/'));
    assert.ok(!isWebUrlValid('http://-error-.invalid/'));
    // assert.ok(!isUrlValid('http://a.b--c.de/'));
    assert.ok(!isWebUrlValid('http://-a.b.co'));
    assert.ok(!isWebUrlValid('http://a.b-.co'));
    assert.ok(!isWebUrlValid('http://0.0.0.0'));
    assert.ok(!isWebUrlValid('http://224.1.1.1'));
    assert.ok(!isWebUrlValid('http://1.1.1.1.1'));
    assert.ok(!isWebUrlValid('http://123.123.123'));
    assert.ok(!isWebUrlValid('http://3628126748'));
    assert.ok(!isWebUrlValid('http://.www.foo.bar/'));
    // assert.ok(!isUrlValid('http://www.foo.bar./'));
    assert.ok(!isWebUrlValid('http://.www.foo.bar./'));

    assert.ok(!isWebUrlValid(`http://10.1.1.1`));
    assert.ok(!isWebUrlValid(`http://10.1.1.254`));
    assert.ok(!isWebUrlValid(`http://127.1.1.1`));
    assert.ok(!isWebUrlValid(`http://127.1.1.254`));
    assert.ok(!isWebUrlValid(`http://169.254.1.1`));
    assert.ok(!isWebUrlValid(`http://169.254.1.254`));
    assert.ok(!isWebUrlValid(`http://192.168.1.1`));
    assert.ok(!isWebUrlValid(`http://192.168.1.254`));
    assert.ok(!isWebUrlValid(`http://172.16.1.1`));
    assert.ok(!isWebUrlValid(`http://172.16.1.254`));
    assert.ok(!isWebUrlValid(`http://172.31.1.1`));
    assert.ok(!isWebUrlValid(`http://172.31.1.254`));
    // assert.ok(isUrlValid(`http://223.255.255.254`));
    assert.ok(!isWebUrlValid(`http://localhost`));
    assert.ok(!isWebUrlValid(`http://localhost/`));
    assert.ok(!isWebUrlValid(`http://localhost:8080/`));
    assert.ok(!isWebUrlValid(`http://localhost:8080/endpoint`));
  });
});
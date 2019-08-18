'use strict';

const request = require('supertest');
const securitytxt = require('./index');
const Koa = require('koa');

describe('securitytxt()', function() {

  it('should accept OPTIONS requests', done => {
    const app = new Koa();
    app.use(securitytxt());

    request(app.listen())
      .options('/security.txt')
      .expect('Allow', 'GET, HEAD, OPTIONS')
      .expect(200, done);
  });

  it('should not accept POST requests', done => {
    const app = new Koa();
    app.use(securitytxt());

    request(app.listen())
      .post('/security.txt')
      .expect('Allow', 'GET, HEAD, OPTIONS')
      .expect(405, done);
  });

  it('should default paths to /security.txt and .well-known/security.txt', done => {

    const app = new Koa();
    app.use(securitytxt());

    request(app.listen())
      .get('/security.txt')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200);

      request(app.listen())
        .get('/.well-known/security.txt')
        .expect('Content-Type', 'text/plain; charset=utf-8')
        .expect(200, done);
  });

  it('should default language to en', done => {

    const app = new Koa();
    app.use(securitytxt());

    request(app.listen())
      .get('/security.txt')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, 'Preferred-Languages: en\n', done);
  });

  it('should append mailto: to contact', done => {

    const app = new Koa();
    app.use(securitytxt({contact: 'security@example.com'}));

    request(app.listen())
      .get('/security.txt')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, 'Contact: mailto:security@example.com\nPreferred-Languages: en\n', done);
  });

  it('should allow paths override', done => {

    const app = new Koa();
    app.use(securitytxt({paths: ['/test'], contact: 'security@example.com'}));

    request(app.listen())
      .get('/security.txt')
      .expect(404);

    request(app.listen())
      .get('/test')
      .expect(200, 'Contact: mailto:security@example.com\nPreferred-Languages: en\n', done);
  });

  it('should support encryption property', done => {

    const app = new Koa();
    app.use(securitytxt({encryption: 'https://example.com/key.asc'}));

    request(app.listen())
      .get('/security.txt')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, 'Encryption: https://example.com/key.asc\nPreferred-Languages: en\n', done);
  });

  it('should support policy property', done => {

    const app = new Koa();
    app.use(securitytxt({policy: 'https://example.com/securitypolicy'}));

    request(app.listen())
      .get('/security.txt')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, 'Preferred-Languages: en\nPolicy: https://example.com/securitypolicy\n', done);
  });

  it('should support hiring property', done => {

    const app = new Koa();
    app.use(securitytxt({hiring: 'https://example.com/hiring'}));

    request(app.listen())
      .get('/security.txt')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, 'Preferred-Languages: en\nHiring: https://example.com/hiring\n', done);
  });

  it('should support canonical property', done => {

    const app = new Koa();
    app.use(securitytxt({canonical: 'https://example.com/security.txt'}));

    request(app.listen())
      .get('/security.txt')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, 'Canonical: https://example.com/security.txt\nPreferred-Languages: en\n', done);
  });

  it('should support acknowledgments property', done => {

    const app = new Koa();
    app.use(securitytxt({acknowledgments: 'https://example.com/thanks.txt'}));

    request(app.listen())
      .get('/security.txt')
      .expect('Content-Type', 'text/plain; charset=utf-8')
      .expect(200, 'Acknowledgments: https://example.com/thanks.txt\nPreferred-Languages: en\n', done);
  });

});

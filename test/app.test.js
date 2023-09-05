const app = require('../app');
const request = require('supertest')(app);

describe('Base logic test', () => {
  it('test signup', (done) => {
    const response = request
      .post('/signup')
      .send({ name: 'testname', email: 'testemail@gmail.com', password: 'TestPassword123!' })
      .set('Accept', 'application/json')
      .expect([201, 409])
      .end(function (err, res) {
        console.log('test signup: ', res.body);
        if (err) return done(err);
        done();
      });
  });

  it('test login', (done) => {
    const response = request
      .post('/signin')
      .send({ email: 'testemail@gmail.com', password: 'TestPassword123!' })
      .set('Accept', 'application/json')
      .expect(200)
      .end(function (err, res) {
        console.log('test signup: ', res.body);
        if (err) return done(err);
        done();
      });
  });
});

describe('GET /users/', function () {
  it('should require authorization', function (done) {
    request
      .get('/users/me')
      .expect(401)
      .end(function (err, res) {
        if (err) return done(err);
        done();
      });
  });

  var token = null;

  before(function (done) {
    request
      .post('/signin')
      .send({ email: 'testemail@gmail.com', password: 'TestPassword123!' })
      .end(function(err, res) {
        token = res.body.token; // Or something
        done();
      })
  })

  it('should respond with JSON array', function (done) {
      request
        .get('/users/me')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
})

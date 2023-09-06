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

  it('get /users/me', function (done) {
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

    it('patch /users/me', function (done) {
      request
        .patch('/users/me')
        .send({ email: 'testemail@gmail.com', name: 'testname_updated' })
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
})

describe('GET /movies/', function () {
  it('should require authorization', function (done) {
    request
      .get('/movies')
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

  it('get /movies', function (done) {
      request
        .get('/movies')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('post /movies', function (done) {
      request
        .post('/movies')
        .send({ country: 'Testcountry',
                director: 'Testdirector',
                duration: 100,
                year: 2023,
                description: 'Testdescription',
                image: 'https://practicum.yandex.ru',
                trailer: 'https://practicum.yandex.ru',
                nameRU: 'TestnameRU',
                nameEN: 'TestnameEN',
                thumbnail: 'https://practicum.yandex.ru',
                movieId: '100'})
        .set('Authorization', 'Bearer ' + token)
        .set('Accept', 'application/json')
        .expect(201)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });

    it('delete /movies', function (done) {
      request
        .delete('/movies/100')
        .set('Authorization', 'Bearer ' + token)
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function (err, res) {
          if (err) return done(err);
          done();
        });
    });
})

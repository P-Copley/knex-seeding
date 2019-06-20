process.env.NODE_ENV = 'test';
const chai = require('chai');
const { expect } = chai;
const app = require('../app');
const request = require('supertest')(app);
const connection = require('../db/connection');

chai.use(require('chai-sorted'));

describe('/api', () => {
  after(() => connection.destroy());
  describe('/films', () => {
    describe('GET', () => {
      it('status:200 responds with an array of film objects', () => {
        return request
          .get('/api/films')
          .expect(200)
          .then(({ body: { films } }) => {
            expect(films).to.be.an('array');
            expect(films[0]).to.contain.keys('film_id', 'title', 'box_office');
          });
      });
      it('status:200 adds a director key to the film object', () => {
        return request
          .get('/api/films')
          .expect(200)
          .then(({ body: { films } }) => {
            expect(films[0].director).to.equal('Francis Ford Coppola');
          });
      });
      it('status:200 sorts by rating by default', () => {
        return request
          .get('/api/films')
          .expect(200)
          .then(({ body: { films } }) => {
            expect(films).to.be.sortedBy('rating');
          });
      });
      it('sorts by a sortBy query', () => {
        return request
          .get('/api/films?sortBy=duration')
          .expect(200)
          .then(({ body: { films } }) => {
            expect(films).to.be.sortedBy('duration');
          });
      });
      it('status:400 for invalid sortBy column', () => {
        return request
          .get('/api/films?sortBy=invalid')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
          });
      });
    });
    describe('POST', () => {
      it('status: 201 responds with a created film', () => {
        return request
          .post('/api/films')
          .send({
            title: 'test film 1',
            year_of_release: 2000,
            duration: 100,
            plot: 'it was all a dream...',
            rating: 10,
            box_office: 123456789,
            director_id: 1
          })
          .expect(201)
          .then(({ body: { film } }) => {
            expect(film).to.eql({
              film_id: 3,
              title: 'test film 1',
              year_of_release: 2000,
              duration: 100,
              plot: 'it was all a dream...',
              rating: 10,
              box_office: '123456789',
              director_id: 1
            });
          });
      });
      it('status:400 when posting an invalid value', () => {
        return request
          .post('/api/films')
          .send({
            title: 'test film 1',
            year_of_release: 2000,
            duration: 100,
            plot: 'stuff happens',
            rating: 'awesome',
            box_office: 123456789,
            director_id: 1
          })
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
          });
      });
      // add not null to the title
      it('status:400 when missing required columns', () => {
        return request
          .post('/api/films')
          .expect(400)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('bad request');
          });
      });
      it('status:422 when posting correctly formatted id that does not exist', () => {
        return request
          .post('/api/films')
          .send({
            title: 'test film 1',
            year_of_release: 2000,
            duration: 100,
            plot: 'stuff happens',
            rating: 9,
            box_office: 123456789,
            director_id: 10
          })
          .expect(422)
          .then(({ body: { msg } }) => {
            expect(msg).to.equal('unprocessable request');
          });
      });
    });
    describe('INVALID METHODS', () => {
      it('status:405', () => {
        const invalidMethods = ['patch', 'put', 'delete'];
        const methodPromises = invalidMethods.map(method => {
          return request[method]('/api/films')
            .expect(405)
            .then(({ body: { msg } }) => {
              expect(msg).to.equal('method not allowed');
            });
        });
        return Promise.all(methodPromises);
      });
    });
  });
  describe('invalid routes', () => {
    it('status:404 responds with route not found', () => {
      return request
        .get('/api/missing')
        .expect(404)
        .then(({ body: { msg } }) => {
          expect(msg).to.equal('route not found');
        });
    });
  });
});

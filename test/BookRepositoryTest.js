const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

chai.use(chaiHttp);
chai.should();

describe('Book Repository Test', () => {

    describe('GET /books', () => {
        it('GET books should return all books', (done) => {
            chai.request(app)
                .get('/books')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.should.be.a('array');
                    response.body.length.should.be.eq(4);
                    done();
                });
        });
    });

    describe('GET books/:id', () => {
        it('Get book using Id should return a book', (done) => {
            chai.request(app)
                .get('/books/1')
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.id.should.be.eq(1);
                    response.body.title.should.be.eq('Things fall apart');
                    done();
                });
        });

        it('Get book using wrong Id should NOT return a book', (done) => {
            chai.request(app)
                .get('/books/11')
                .end((error, response) => {
                    response.should.have.status(404);
                    response.body.message.should.be.eq('No book found with id of 11');
                    done();
                });
        });
    });

    describe('POST /books', () => {
        it('Post a book should create a new book', (done) => {
            const payload = {
                title: 'A new test book',
                description: 'The description for the new test book',
                isbn: '978-123-451-1234'
            };

            chai.request(app)
                .post('/books')
                .send(payload)
                .end((error, response) => {
                    response.should.have.status(201);
                    done();
                })
        })

        it('Post a book should NOT create a book if the title of the book is too short',
            (done) => {
                const payload = {
                    title: 'A',
                    description: 'The description for the new test book',
                    isbn: '978-123-451-1234'
                };

                chai.request(app)
                    .post('/books')
                    .send(payload)
                    .end((error, response) => {
                        response.should.have.status(400);
                        response.body.message.should.be.eq("'title' length must be at least 5 characters long");
                        done();
                    })
            })

        it('Post a book should NOT create a book if the description of the book is too short',
            (done) => {
                const payload = {
                    title: 'A new book',
                    description: 'short',
                    isbn: '978-123-451-1234'
                };

                chai.request(app)
                    .post('/books')
                    .send(payload)
                    .end((error, response) => {
                        response.should.have.status(400);
                        response.body.message.should.be.eq("'description' length must be at least 10 characters long");
                        done();
                    })
            })

        it('Post a book should NOT create a book if the ISBN of the book is lessthan the standard format',
            (done) => {
                const payload = {
                    title: 'A new book',
                    description: 'A description for the new book',
                    isbn: '1234'
                };

                chai.request(app)
                    .post('/books')
                    .send(payload)
                    .end((error, response) => {
                        response.should.have.status(400);
                        response.body.message.should.be.eq("'isbn' length must be at least 13 characters long");
                        done();
                    })
            })

    })

    describe('PUT /books/:id', () => {
        it('Update a book should update an existing book', (done) => {
            const payload = {
                title: 'A new titile for the book',
                description: 'The new description for the book',
                isbn: '978-123-451-1234'
            };

            chai.request(app)
                .put('/books/1')
                .send(payload)
                .end((error, response) => {
                    response.should.have.status(200);
                    response.body.title.should.be.eq(payload.title);
                    response.body.description.should.be.eq(payload.description);
                    response.body.isbn.should.be.eq(payload.isbn);
                    done();
                })
        });

        it('Update a book should NOT update if the book does not exist', (done) => {
            const payload = {
                title: 'A new titile for the book',
                description: 'The new description for the book',
                isbn: '978-123-451-1234'
            };

            chai.request(app)
                .put('/books/11')
                .send(payload)
                .end((error, response) => {
                    response.should.have.status(404);
                    response.body.message.should.be.eq('Book with Id 11 is not found');
                    done();
                })
        });

        it('Update a book should NOT update a book if the new title of the book is too short',
            (done) => {
                const payload = {
                    title: 'A',
                    description: 'The description of the book',
                    isbn: '978-123-451-1234'
                };

                chai.request(app)
                    .put('/books/1')
                    .send(payload)
                    .end((error, response) => {
                        response.should.have.status(400);
                        response.body.message.should.be.eq("'title' length must be at least 5 characters long");
                        done();
                    })
            });

        it('PUT a book should NOT update a book if the new description of the book is too short',
            (done) => {
                const payload = {
                    title: 'A new book',
                    description: 'short',
                    isbn: '978-123-451-1234'
                };

                chai.request(app)
                    .put('/books/1')
                    .send(payload)
                    .end((error, response) => {
                        response.should.have.status(400);
                        response.body.message.should.be.eq("'description' length must be at least 10 characters long");
                        done();
                    })
            });

        it('PUT a book should NOT update a book if the ISBN of the book is lessthan the standard format',
            (done) => {
                const payload = {
                    title: 'A new book',
                    description: 'A description for the new book',
                    isbn: '1234'
                };

                chai.request(app)
                    .put('/books/1')
                    .send(payload)
                    .end((error, response) => {
                        response.should.have.status(400);
                        response.body.message.should.be.eq("'isbn' length must be at least 13 characters long");
                        done();
                    })
            });

            describe('GET /books/search', () => {
                it ('Search a book should return books based on query string', (done) => {
                    chai.request(app)
                    .get('/books/search')
                    .query({query: 'javascript'}) //search?query=javascript
                    .end((error, response) => {
                        response.should.have.status(200);
                        response.body.length.should.be.eq(2);
                        done();
                    })
                })
            })
    })
});
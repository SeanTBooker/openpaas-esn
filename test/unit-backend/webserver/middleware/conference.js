'use strict';

var expect = require('chai').expect;
var mockery = require('mockery');

describe('The conference middleware', function() {

  it('canJoin should send back HTTP 400 when user is not set in request', function(done) {
    mockery.registerMock('../../core/conference', {});
    var middleware = require(this.testEnv.basePath + '/backend/webserver/middleware/conference').canJoin;
    var req = {
      conference: {}
    };
    var res = {
      json: function(code) {
        expect(code).to.equal(400);
        done();
      }
    };
    var next = function() {};
    middleware(req, res, next);
  });

  it('canJoin should send back HTTP 400 when conference is not set in request', function(done) {
    mockery.registerMock('../../core/conference', {});
    var middleware = require(this.testEnv.basePath + '/backend/webserver/middleware/conference').canJoin;
    var req = {
      user: {}
    };
    var res = {
      json: function(code) {
        expect(code).to.equal(400);
        done();
      }
    };
    var next = function() {};
    middleware(req, res, next);
  });

  it('canJoin should send back HTTP 500 when conference module sends back error', function(done) {
    mockery.registerMock('../../core/conference', {
      userCanJoinConference: function(conference, user, callback) {
        return callback(new Error());
      }
    });

    var middleware = require(this.testEnv.basePath + '/backend/webserver/middleware/conference').canJoin;
    var req = {
      user: {},
      conference: {}
    };
    var res = {
      json: function(code) {
        expect(code).to.equal(500);
        done();
      }
    };
    var next = function() {};
    middleware(req, res, next);
  });

  it('canJoin should send back HTTP 403 when conference module sends back false', function(done) {
    mockery.registerMock('../../core/conference', {
      userCanJoinConference: function(conference, user, callback) {
        return callback(null, false);
      }
    });

    var middleware = require(this.testEnv.basePath + '/backend/webserver/middleware/conference').canJoin;
    var req = {
      user: {},
      conference: {}
    };
    var res = {
      json: function(code) {
        expect(code).to.equal(403);
        done();
      }
    };
    var next = function() {};
    middleware(req, res, next);
  });

  it('canJoin should call next when user can join the conference', function(done) {
    mockery.registerMock('../../core/conference', {
      userCanJoinConference: function(conference, user, callback) {
        return callback(null, true);
      }
    });

    var middleware = require(this.testEnv.basePath + '/backend/webserver/middleware/conference').canJoin;
    var req = {
      user: {},
      conference: {}
    };
    middleware(req, {}, done);
  });

  it('isAdmin should send back HTTP 400 when user is not set in request', function(done) {
    mockery.registerMock('../../core/conference', {});
    var middleware = require(this.testEnv.basePath + '/backend/webserver/middleware/conference').isAdmin;
    var req = {
      conference: {}
    };
    var res = {
      json: function(code) {
        expect(code).to.equal(400);
        done();
      }
    };
    var next = function() {};
    middleware(req, res, next);
  });

  it('isAdmin should send back HTTP 400 when conference is not set in request', function(done) {
    mockery.registerMock('../../core/conference', {});
    var middleware = require(this.testEnv.basePath + '/backend/webserver/middleware/conference').isAdmin;
    var req = {
      user: {}
    };
    var res = {
      json: function(code) {
        expect(code).to.equal(400);
        done();
      }
    };
    var next = function() {};
    middleware(req, res, next);
  });

  it('isAdmin should send back HTTP 500 when conference module sends back error', function(done) {
    mockery.registerMock('../../core/conference', {
      userIsConferenceCreator: function(conference, user, callback) {
        return callback(new Error());
      }
    });

    var middleware = require(this.testEnv.basePath + '/backend/webserver/middleware/conference').isAdmin;
    var req = {
      user: {},
      conference: {}
    };
    var res = {
      json: function(code) {
        expect(code).to.equal(500);
        done();
      }
    };
    var next = function() {};
    middleware(req, res, next);
  });

  it('isAdmin should send back HTTP 403 when conference module sends back false', function(done) {
    mockery.registerMock('../../core/conference', {
      userIsConferenceCreator: function(conference, user, callback) {
        return callback(null, false);
      }
    });

    var middleware = require(this.testEnv.basePath + '/backend/webserver/middleware/conference').isAdmin;
    var req = {
      user: {},
      conference: {}
    };
    var res = {
      json: function(code) {
        expect(code).to.equal(403);
        done();
      }
    };
    var next = function() {};
    middleware(req, res, next);
  });

  it('isAdmin should call next when user is admin of the conference', function(done) {
    mockery.registerMock('../../core/conference', {
      userIsConferenceCreator: function(conference, user, callback) {
        return callback(null, true);
      }
    });

    var middleware = require(this.testEnv.basePath + '/backend/webserver/middleware/conference').isAdmin;
    var req = {
      user: {},
      conference: {}
    };
    middleware(req, {}, done);
  });
});

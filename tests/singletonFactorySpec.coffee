sinon  = require('sinon')
expect = require('sinon-expect')
              .enhance(require('expect.js'), sinon, 'was')

shim   = require('./helpers/vanillaShim')

describe 'Singleton', () ->
  Singleton = null

  before (done) ->
    shim
      path: '../src/js/singletonFactory.js'
      exports: 'Singleton'
    .then (res) ->
      Singleton = res
      done()

  describe '#constructor', ->
    it 'should create a single instance with repeated calls', ->
      spy = sinon.spy()
      Klass = () ->
        spy.apply(this, arguments)

      constructor = Singleton(Klass)

      constructor()
      constructor()

      res = constructor()

      expect(spy.calledOnce).to.be true
      expect(res).to.be.a Klass

    it 'allow passed parameters', ->
      cow = '🐮'

      Klass = (secret) ->
        this.secret = secret

      constructor = Singleton(Klass, cow)

      expect(constructor().secret).to.equal cow

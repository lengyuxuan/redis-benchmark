const { Suite } = require('benchmark');
var suite = new Suite();
const Redis = require('ioredis');

const redisClient = new Redis();
const redisClientEnable = new Redis({ enableAutoPipelining: true });

suite.add('redis@default', {
  defer: true,
  fn: function (deferred) {
    redisClient.get('xxx', () => {
      deferred.resolve();
    });
  }
});

suite.add('redis@enable', {
  defer: true,
  fn: function (deferred) {
    redisClientEnable.get('xxx', () => {
      deferred.resolve();
    });
  }
});

suite.on('cycle', function(event) {
  console.log(String(event.target));
});

suite.on('complete', function () {
  console.log('Fastest is ' + this.filter('fastest').map('name'));
  redisClient.disconnect();
  redisClientEnable.disconnect();
});

suite.run();

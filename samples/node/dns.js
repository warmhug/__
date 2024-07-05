
var dns = require('dns');

dns.lookup('www.google.com', function (err, ip) {
    if(err) throw err;
    console.log('google ip: ', ip );
});

dns.resolve4('www.google.com', function (err, addresses) {
  if (err) throw err;

  console.log('addresses: ' + JSON.stringify(addresses));

  addresses.forEach(function (a) {
    dns.reverse(a, function (err, domains) {
      if (err) {
        throw err;
      }

      console.log('reverse for ' + a + ': ' + JSON.stringify(domains));
    });
  });
});
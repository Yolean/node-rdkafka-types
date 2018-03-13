var http = require('https');
var fs = require('fs');

http.get("https://raw.githubusercontent.com/Blizzard/node-rdkafka/master/index.d.ts", function(response) {
  response.pipe(fs.createWriteStream("./index.d.ts"));
  console.log('node-rdkafka types written');
});

var package = require('./package.json');
http.get("https://raw.githubusercontent.com/Blizzard/node-rdkafka/master/package.json", function(response) {
  let body = '';
  response.on('data', (chunk) => {
    body += chunk;
  });
  response.on('end', () => {
    let realPackage = JSON.parse(body);
    package.version = realPackage.version;
    fs.writeFile("./package.json", JSON.stringify(package, null, '  ') + "\n", function(err) {
      console.log('package.json written', err || 'ok');
    });
  });
});

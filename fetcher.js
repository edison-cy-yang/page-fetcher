const fs = require('fs');
const request = require('request');

const fetch = function(url, filePath) {
  request(url, (err, response, body) => {
    console.log(err);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    fs.writeFile(filePath, body, (err) => {
      if(err) {
        console.log(`error: ${err}`);
      }
      console.log("The file has been saved!");
    });
  });
}

fetch(process.argv[2], process.argv[3]);
const fs = require('fs');
const request = require('request');

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// const fetch = function(url, filePath) {
//   request(url, (err, response, body) => {
//     console.log(err);
//     console.log('statusCode:', response && response.statusCode);
//     console.log('body:', body);
//     fs.writeFile(filePath, body, (err) => {
//       if(err) {
//         console.log(`error: ${err}`);
//       }
//       console.log("The file has been saved!");
//     });
//   });
// }

const fetch = function(url, filePath) {
  request(url, (err, response, body) => {
    console.log(err);
    console.log('statusCode:', response && response.statusCode);
    console.log('body:', body);
    fs.access(filePath, fs.F_OK, (err) => {
      if (err) {
        fs.writeFile(filePath, body, (err) => {
          if(err) {
            console.log(`error: ${err}`);
          }
          console.log("The file has been saved!");
        });
      }
      else {
        rl.question('File already exists, overwrite the file? [Y/N] ', (answer) => {
          if (answer === 'Y') {
            fs.writeFile(filePath, body, (err) => {
              if(err) {
                console.log(`error: ${err}`);
              }
              console.log("The file has been saved!");
            });
            rl.close();
          }
          else {
            console.log("File not overwritten");
            rl.close();
          }
        });
      }
    });
    
  });
}

fetch(process.argv[2], process.argv[3]);
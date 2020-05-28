const { Color } = require('scenegraph');

function loadColor() {
  // Load json from file or remote url with same data structure
  const url = 'https://api.myjson.com/bins/18udzw';
  // const file = 'color.json';
  return fetch(url)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return handleData(data);
    });
}

async function handleData(data) {
  try {
    let palette = [];
    await Object.keys(data.color.brand).map((v, i)=>{
      palette.push([v, data.color.brand[v].value]);
    });
    addPalette(palette);

  } catch (err) {
    console.log('error');
    console.log(err.message);
  }
}

function addPalette(palette) {
  let i;
  let len = palette.length;
  for (i=0; i<len; i++){
    addColor(palette[i])
  }
}

function addColor(array) {
  const assets = require('assets');
  const label = array[0] + ' ('+array[1]+')';
  const color = new Color(array[1]);
  assets.colors.add([
    { name: label, color: color }
  ]);
}

// @Temp - useful helper
// function xhrBinary(url) {
//   return new Promise((resolve, reject) => {
//     const req = new XMLHttpRequest();
//     req.onload = () => {
//       if (req.status === 200) {
//         try {
//           const arr = new Uint8Array(req.response);
//           resolve(arr);
//         } catch (err) {
//           reject('Couldnt parse response. ${err.message}, ${req.response}');
//         }
//       } else {
//         reject('Request had an error: ${req.status}');
//       }
//     }
//     req.onerror = reject;
//     req.onabort = reject;
//     req.open('GET', url, true);
//     req.responseType = "arraybuffer";
//     req.send();
//   });
// }

module.exports = {
  commands: {
    loadColor
  }
};

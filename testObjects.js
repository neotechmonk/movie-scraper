// let oldURL =
//   "https://www.eventcinemas.com.au/Sessions?movies=12326&date=2018-11-02&cinemas=13,58,19,66,11,59";
// let newURL = removeURLParameter(oldURL, "cinemas");

// console.log(newURL);

// let s = "nsw";
// let q = "qld ";

// let filterIndex = 1;

// let  cinemasArray = [
//   {
//     cinemaState: "ACT",
//     cinemaIndex: 0,
//     cinemaId: "13",
//     cinemaName: "Manuka",
//     cinemaURL: "/Cinema/Manuka"
//   },
//   {
//     cinemaState: "VIC",
//     cinemaIndex: 0,
//     cinemaId: "73",
//     cinemaName: "Moonlight Cinema Melbourne",
//     cinemaURL: "/Cinema/Moonlight-Cinema-Melbourne"
//   },
//   {
//     cinemaState: "SA",
//     cinemaIndex: 0,
//     cinemaId: "88",
//     cinemaName: "Adelaide",
//     cinemaURL: "/Cinema/Adelaide"
//   },
//   {
//     cinemaState: "NSW",
//     cinemaIndex: 10,
//     cinemaId: "62",
//     cinemaName: "Hornsby",
//     cinemaURL: "/Cinema/Hornsby"
//   }
// ];

// cinemasArray.filter(
//     function(value, index, ) {
//       return index >= this.fi;
//     },
//     { fi: filterIndex }
//   )
//   .map(
//     function(cin, index) {
//       console.log(cin.cinemaName, index, this.s, this.m, "text");
//     },
//     { s, m: q }
//   );

// let selector = 'div[data-state=QLD] div.top-select-option a.eccheckbox'

// var regex = RegExp(/=(.*?)]/)

// let res = selector.match(regex)[1]

// // console.log(res);
// function removeURLParameter(url, parameter) {
//   //prefer to use l.search if you have a location/link object
//   var urlparts = url.split("?");
//   if (urlparts.length >= 2) {
//     var prefix = encodeURIComponent(parameter) + "=";
//     var pars = urlparts[1].split(/[&#;]/g);

//     //reverse iteration as may be destructive
//     for (var i = pars.length; i-- > 0; ) {
//       //idiom for string.startsWith
//       if (pars[i].lastIndexOf(prefix, 0) !== -1) {
//         pars.splice(i, 1);
//       }
//     }
//     let blah = pars
//       .filter(par => {
//         return par.length > 0; // remove empty par
//       })
//       .reduce(function(acc, par) {
//         // adds the relevant sperator as the prefix (e.g. #,&)to @par
//         return acc + url[url.indexOf(par) - 1] + par;
//       }, "");

//     url = urlparts[0] + (pars.length > 0 ? blah : "");
//     return url;
//   } else {
//     return url;
//   }
// }

// let url =
//   "https://www.eventcinemas.com.au/Sessions?#movies=12334,12326#cinemas=13,73,88,54,87&date=2018-11-08&some=thing";

// console.log(removeURLParameter(url, "date"));

(async function() {
  const browser = await require("puppeteer").launch();
  const page = await browser.newPage();
  await page.goto("https://www.eventcinemas.com.au");

  
  const state = "ACT";
  const cinemaDetails = [];

  await page.click(
    `div.top-select div.slider span.state[data-state-selector=${state}]`
  );

  
  let res = await page.evaluate(
    (elementPath, state) => {
      return Array.from(
        document.querySelectorAll(elementPath),
        function(cin, index) {
          let result = {
            cinemaState: this.s,
            cinemaIndex: index,
            cinemaId: cin.getAttribute("data-id"),
            cinemaName: cin.getAttribute("data-name"),
            cinemaURL: cin.getAttribute("data-url")
          };
          return result;
          console.log(result);
        },
        { s: state} 
      );
    },
    `div[data-state=${state}] div.top-select-option a.eccheckbox`,
    state
  );
  console.log(res);
  res.forEach(cin => {
    //cin.cinemaState = state;
    cinemaDetails.push(cin);
  });

  await page.close();
  return cinemaDetails;
})();

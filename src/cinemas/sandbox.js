import puppeteer from "puppeteer";
import * as cinemas from "./unbound";
import { SSL_OP_ALLOW_UNSAFE_LEGACY_RENEGOTIATION } from "constants";

const STATES = ["ACT", "VIC", "SA", "WA", "NT", "NSW", "QLD"];
//cinemas from all states
(async () => {
  //   console.log(
  //     await cinemas.allCinemas({ puppeteer: puppeteer, states: STATES })
  //   );
})();

//cinemas from one state

(async () => {
  const page = await puppeteer
    .launch({ headless: true })
    .then(browser => browser.newPage());
  const state = STATES[5];
  await page.goto("https://eventcinemas.com.au");

  const results = await cinemas.cinemasfromState(page, state);
  console.log(results);
  await page.close();
})();




// const names = 
//     [ { cinemaState: 'ACT',
//     cinemaId: '13',
//     cinemaName: 'Manuka',
//     cinemaURL: '/Cinema/Manuka' },
//   { cinemaState: 'ACT',
//     cinemaId: '13',
//     cinemaName: 'Manuka',
//     cinemaURL: '/Cinema/Manuka' }, 
//     { cinemaState: 'NSW',
//     cinemaId: '44',
//     cinemaName: 'BLah ',
//     cinemaURL: '/comse' } ];

// let result =[...names.reduce((a,c)=>(a.set(c.cinemaId,c)),new Map).values()]
//  //Object.values(  names.reduce((a, c) => Object.assign(a, { [c.cinemaId] : c }), {}));

// console.log(result);


// const names = [
//   { name: "John", age:1 },
//   { name: "Paul", age:10  },
//   { name: "George" , age:2 },
//   { name: "Ringo" , age:10 },
//   { name: "John" , age:40 }
// ];

// let result = Object.values(
//   names.reduce((a, c) => Object.assign(a, { [c.age] : c }), {})
// );
// console.log(result);

const list = [
  {
    cinemaState: "ACT",
    cinemaId: "13",
    cinemaName: "Manuka",
    cinemaURL: "/Cinema/Manuka"
  },
  {
    cinemaState: "VIC",
    cinemaId: "73",
    cinemaName: "Moonlight Cinema Melbourne",
    cinemaURL: "/Cinema/Moonlight-Cinema-Melbourne"
  }
];

const [{ cinemaId: res1 }, { cinemaId: res2 }] = list;
console.log([res1, res2]);

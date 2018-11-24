export default async function cinemasfromState(page, state) {
  const CINEMA_SELECTOR = `div[data-state=$[STATE]] div.top-select-option a.eccheckbox`;

  let res = await page.evaluate(
    (elementPath, state) => {
      let results = Array.from(document.querySelectorAll(elementPath)).map(
        function(cin, index) {
          let result = {
            cinemaState: this.state,
            cinemaID: cin.getAttribute("data-id"),
            cinemaName: cin.getAttribute("data-name"),
            cinemaURL: cin.getAttribute("data-url")
          };
          return result;
        },
        { state }
      );

      let deDupedRes = [
        ...results.reduce((a, c) => a.set(c.cinemaID, c), new Map()).values()
      ]; // ? hack why this doesnt work res.reduce((a, c) => Object.assign(a, { [c.cinemaURL]: c }),{});

      return deDupedRes;
    },
    CINEMA_SELECTOR.replace("$[STATE]", state),
    state
  );

  return Promise.resolve(res);
}



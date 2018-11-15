const savecinemas = async ({ mongoose }, Model, cinemas) => {
  /*
    1. Flatten objects
    2. Bulk Delete existing
    3. Bulk Insert
    */

  //1. Flatten objects
  let flatData;

  //2. Bulk Delete
  await Model.deleteMany();
  //3. Bulk Insert
  for (cinema of cinemas) {
    let c = new Model(
      ({
        cinemaId: ID,
        cinemaName: name,
        cinemaState: state,
        cinemaURL: URL
      } = cinema)
    );

    Model.save(c);
  }
};

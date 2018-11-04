class Movie {
  constructor({ name, id, cinemas = [] } = {}) {
    this.name = name;
    this.id = id;
    this.cinemas = cinemas;
  }

  getmovieDetails() {
    return `ID : ${this.id} - Movie ${this.name}`;
  }

  stats() {
    let sessionCount = -1;
    let cinemaCount = -1;

    if (this.cinemas) {
      cinemaCount = this.cinemas.length;
      if (this.cinemas.sessions) {
        sessionCount = this.cinemas.reduce((acc, val) => {
          acc += val.sessions.length;
        });
      }
    }
    return `ID : ${this.id} - Movie ${
      this.name
    } - Cinemas #${cinemaCount} - Sessions #${sessionCount}`;
  }

  getCinemas() {
    return this.cinemas.map(cinema => {
      return cinema.name;
    });
  }
}

class Cinema {
  constructor({ name, id, state, sessions = [] } = {}) {
    this.name = name;
    this.id = id;
    this.state = state;
    this.sessions = sessions;
  }
}

class Session {
  constructor({ id, sessionDateTime = [] } = {}) {
    this.id = id;
    this.sessionDateTime = sessionDateTime;
  }
}

export { Movie, Cinema, Session };

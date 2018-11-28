const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require("graphql");

const dbController = require("../database-crud/controller");

//Define Object Types for GraphQL
const MovieType = new GraphQLObjectType({
  name: "Movie",
  description: "Movies showing in Event Cinemas",

  fields: () => ({
    //MongoDB
    id: {
      type: GraphQLString,
      resolve: movie => movie.id
    },
    movieID: {
      type: GraphQLInt,
      resolve: movie => movie.movieID
    },
    title: {
      type: GraphQLString,
      resolve: movie => movie.movieTitle
    },
    cinemas: {
      type: new GraphQLList(CinemaType),
      resolve: movie => movie.cinemas
    }
  })
});

const CinemaType = new GraphQLObjectType({
  name: "Cinema",
  description: "Event Cinemas' theatre",

  fields: () => ({
    cinemaID: {
      type: GraphQLInt,
      resolve: cinema => cinema.cinemaID
    },
    sessions: {
      type: new GraphQLList(SessionType),
      resolve: cinema => cinema.sessions
    }
  })
});

const SessionType = new GraphQLObjectType({
  name: "Session",
  description: "Screenings in a given theatre",

  fields: () => ({
    id: {
      type: GraphQLInt,
      resolve: session => session.id
    },
    sessionID: {
      type: GraphQLInt,
      resolve: session => session.sessionID
    },
    availableSeats: {
      type: GraphQLInt,
      resolve: session => session.seatsLeft
    },
    time: {
      type: GraphQLString,
      resolve: session => session.sessionDateTime.toString()
    },
    ticketURL: {
      type: GraphQLString,
      resolve: session => session.sessionBookingURL
    }
  })
});
module.exports = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    description: "screening data from Event Cinemas for Indian movies ",

    fields: () => ({
      movie: {
        type: MovieType,
        args: {
          title: { type: GraphQLString }
        },
        resolve: async (root, args, context) => {
          const movie = await dbController.getMovieByTitle(args.title);
          console.log(movie);
          return movie;
        }
      }
    })
  })
});

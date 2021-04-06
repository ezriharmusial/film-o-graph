import { initClient, dedupExchange, fetchExchange } from "@urql/svelte";
import { cacheExchange } from "@urql/exchange-graphcache";
import gql from "graphql-tag";
import {
  MOVIES_QUERY,
  MOVIE_QUERY,
  ACTORS_QUERY,
  ACTOR_QUERY,
} from "./graphql.js";

const storage = {
  readData: async () => {
    const actual = JSON.parse(localStorage.getItem("cacheKey"));
    if (!actual) {
      localStorage.setItem("cacheKey", JSON.stringify({}));
      return;
    }
    return actual;
  },
  writeData: async (batch) => {
    const actual = JSON.parse(localStorage.getItem("cacheKey"));
    const keys = Object.keys(batch);
    let i = keys.length;
    while (i--) {
      const val = batch[keys[i]];
      if (val === undefined) {
        delete actual[keys[i]];
      } else {
        actual[keys[i]] = val;
      }
    }
    localStorage.setItem("cacheKey", JSON.stringify(actual));
  },
};

const updates = {
  Mutation: {
    // MOVIES
    addMovie: (result, args, cache, info) => {
      const allFields = cache.inspectFields("Query");
      const movieQueries = allFields.filter((x) => x.fieldName === "movies");
      movieQueries.forEach((x) => {
        cache.updateQuery(
          { query: MOVIES_QUERY, variables: x.arguments },
          (data) => {
            return {
              ...data,
              movies: [...data.movies, result.addMovie],
            };
          }
        );
      });
    },
    updateMovie: (result, args, cache, info) => {
      if (info.optimistic) {
        // cache.writeFragment(
        //   gql`
        //     fragment MOVIE_FRAG on Movie {
        //       id
        //       title
        //       length
        //       image
        //       actors {
        //         id
        //         name
        //         gender
        //         nationality
        //         image
        //       }
        //     }
        //   `,
        //   {
        //     id: info.variables.id,
        //     text: "UPDATING"
        //   }
        // );
        console.log("info:", info);
        cache.updateQuery(
          { query: MOVIE_QUERY, variables: { id: info.variables.id } },
          (data) => {
            console.log("data:" + data);
            // data.text = "UPDATING";
            return data;
          }
        );
      }
    },
    deleteMovie: (result, args, cache, info) => {
      if (info.optimistic) {
        cache.writeFragment(
          gql`
            fragment MOVIE_FRAG on Movie {
              id
              title
              length
              image
              actors {
                id
                name
                gender
                nationality
                image
              }
            }
          `,
          {
            id: info.variables.id,
            title: "DELETING",
          }
        );
      } else {
        cache.invalidate({ __typename: "Movie", id: info.variables.id });
      }
    },

    // ACTORS
    addActor: (result, args, cache, info) => {
      const allFields = cache.inspectFields("Query");
      const actorQueries = allFields.filter((x) => x.fieldName === "actors");
      actorQueries.forEach((x) => {
        cache.updateQuery(
          { query: ACTORS_QUERY, variables: x.arguments },
          (data) => {
            return {
              ...data,
              actors: [...data.actors, result.addActor],
            };
          }
        );
      });
    },
    updateActor: (result, args, cache, info) => {
      if (info.optimistic) {
        // cache.writeFragment(
        //   gql`
        //     fragment MOVIE_FRAG on Movie {
        //       id
        //       name
        //       gender
        //       nationality
        //       image
        //       acts_in {
        //         id
        //         title
        //         length
        //         image
        //       }
        //     }
        //   `,
        //   {
        //     id: info.variables.id,
        //     text: "UPDATING"
        //   }
        // );
        console.log("info:", info);
        cache.updateQuery(
          { query: ACTOR_QUERY, variables: { id: info.variables.id } },
          (data) => {
            console.log("data:" + data);
            // data.text = "UPDATING";
            return data;
          }
        );
      }
    },
    deleteActor: (result, args, cache, info) => {
      if (info.optimistic) {
        cache.writeFragment(
          gql`
            fragment ACTOR_FRAG on Actor {
              id
              name
              gender
              nationality
              image
              acts_in {
                id
                title
                length
                image
              }
            }
          `,
          {
            id: info.variables.id,
            name: "DELETING",
          }
        );
      } else {
        cache.invalidate({ __typename: "Actor", id: info.variables.id });
      }
    },
  },
};

const optimistic = {
  addMovie: (variables, cache, info) => {
    return {
      id: "TEMP_ID_" + Date.now(),
      title: variables.title,
      length: variables.length,
      nationality: variables.nationality,
      image: variables.image,
      __typename: "Movie",
    };
  },
  updateMovie: () => {},
  deleteMovie: () => {},
  addActor: (variables, cache, info) => {
    return {
      id: "TEMP_ID_" + Date.now(),
      name: variables.name,
      gender: variables.gender,
      nationality: variables.nationality,
      image: variables.image,
      __typename: "Actor",
    };
  },
  updateActor: () => {},
  deleteActor: () => {},
};

const exchanges = [
  dedupExchange,
  cacheExchange({ storage, updates, optimistic }),
  fetchExchange,
];

function OnInit() {
  initClient({ url: "http://localhost:8080/graphql", exchanges });
}

export default {
  OnInit,
};

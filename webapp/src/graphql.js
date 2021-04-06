// ACTORS
export const ACTOR_FRAG = `
  fragment ACTOR_FRAG on Actor {
    id
    name
    nationality
    gender
    image
    acts_in {
      id
      title
      length
      image
    }

  }
`;

export const ACTOR_QUERY = `
  query ($id: ID!) {
    getActor(id: $id) {
      ...ACTOR_FRAG
    }
  }
  ${ACTOR_FRAG}
`;

export const ACTORS_QUERY = `
  query {
    queryActor {
      ...ACTOR_FRAG
    }
  }
  ${ACTOR_FRAG}
`;

export const ADD_ACTOR = `
  mutation ($input: [AddActorInput!]!) {
    addActor(input: $input) {
      ...ACTOR_FRAG
    }
  }
  ${ACTOR_FRAG}
`;

export const ADD_ACTORS = `
  mutation {
    addActors {
      ...ACTOR_FRAG
    }
  }
  ${ACTOR_FRAG}
`;

export const UPDATE_ACTOR = `
  mutation ($input: [UpdateActorInput!]!) {
    updateActor(input: $input) {
      ...ACTOR_FRAG
    }
  }
  ${ACTOR_FRAG}
`;

export const DELETE_ACTOR = `
  mutation ($id: ID!) {
    deleteActor(id: $id)
  }
`;

// MOVIES
export const MOVIE_FRAG = `
  fragment MOVIE_FRAG on Movie {
    id
    title
    length
    image
    actors {
      id
      name
      nationality
      gender
      image
    }
  }
`;

export const MOVIE_QUERY = `
  query ($id: ID!) {
    getMovie(id: $id) {
      ...MOVIE_FRAG
    }
  }
  ${MOVIE_FRAG}
`;

export const MOVIES_QUERY = `
  query {
    queryMovie {
      ...MOVIE_FRAG
    }
  }
  ${MOVIE_FRAG}
`;

export const ADD_MOVIE = `
  mutation ($text: String!) {
    addMovie(text: $text) {
      ...MOVIE_FRAG
    }
  }
  ${MOVIE_FRAG}
`;

export const ADD_MOVIES = `
  mutation {
    addMovies {
      ...MOVIE_FRAG
    }
  }
  ${MOVIE_FRAG}
`;

export const UPDATE_MOVIE = `
  mutation ($id: ID!) {
    updateMovie(id: $id) {
      ...MOVIE_FRAG
    }
  }
  ${MOVIE_FRAG}
`;

export const DELETE_MOVIE = `
  mutation ($id: ID!) {
    deleteMovie(id: $id)
  }
`;

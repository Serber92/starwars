import { gql } from "@apollo/client";

export const GET_STARWARS = gql`
query AllFilms {
  films(order: [releaseDate_ASC]) {
    results{
      releaseDate
      episodeId
      title
      planets {
        count
        results {
          name
          films {
            count
          }
        }
      }
     	characters {
        count
        results {
          name
          homeworld {
            name
          }
          species {
            results {
              name
            }
          }
        }
      }
    }
  }
}
`;

import { gql } from 'apollo-server';

export const typeDef = gql`
  type PlaylistSnippet {
    publishedAt: String!,
    channelId: String!,
    title: String!,
    description: String!,
  }

  type PlaylistContentDetails {
    itemCount: Int!
  }

  type Playlist {
    etag: String!,
    id: String!,
    snippet: PlaylistSnippet
    contentDetails: PlaylistContentDetails
  }
`;

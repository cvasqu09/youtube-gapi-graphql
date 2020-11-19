import { gql } from 'apollo-server';
import { YouTubeAPI } from '../services/YouTubeAPI';

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

  type PlaylistItem {
    publishedAt: String!,
    title: String!,
    description: String!,
    videoId: String!,
    imageUrl: String!,
  }
  
  type Playlist {
    etag: String!,
    id: String!,
    snippet: PlaylistSnippet
    contentDetails: PlaylistContentDetails
    playlistItems: [PlaylistItem]
  }
  
`;

export const resolvers = {
  Playlist: {
    playlistItems: (root, _,) => {
      return new YouTubeAPI().getPlaylistItems(root.id)
    }
  }
}

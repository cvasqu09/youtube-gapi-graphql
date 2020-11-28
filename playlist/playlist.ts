import { gql } from 'apollo-server';
import { YouTubeAPI } from '../services/YouTubeAPI';

export const typeDef = gql`  
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
    publishedAt: String!,
    channelId: String!,
    title: String!,
    description: String,
    numberOfVideos: Int!,
    imageUrl: String,
    playlistItems: [PlaylistItem],
  }
`;

export const resolvers = {
  Playlist: {
    playlistItems: (root, _, context) => {
      return new YouTubeAPI().getPlaylistItems(root.id, context)
    },
  }
}

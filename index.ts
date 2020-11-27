require('dotenv').config();

import { ApolloServer, gql } from 'apollo-server';
import { typeDef as PlaylistTypes, resolvers as PlaylistResolvers } from './playlist/playlist';
import { typeDef as VideoTypes } from './video/video';
import { YouTubeAPI } from './services/YouTubeAPI';

const yapi = new YouTubeAPI();

const rootQueryTypeDefs = gql`
  type Query {
    playlists: [Playlist]
    videos(videoIds: [String]): [Video]
  }
`;

const rootQueryResolvers = {
  Query: {
    playlists: async (_, __, context) => await yapi.getPlaylists(context),
    videos: async (_, { videoIds }, context) => await yapi.getVideoInfo(videoIds, context)
  }
}

const typeDefs = [rootQueryTypeDefs, PlaylistTypes, VideoTypes];
const resolvers = [rootQueryResolvers, PlaylistResolvers]

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({
    authorization: req.headers.authorization
  })
});

// The `listen` method launches a web server.
server.listen(4201).then(({ url }) => {
  console.log(`🚀  Server ready at ${ url }`);
});


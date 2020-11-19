require('dotenv').config();

import { ApolloServer, gql } from 'apollo-server';
import { typeDef as PlaylistTypes, resolvers as PlaylistResolvers } from './playlist/playlist';
import { YouTubeAPI } from './services/YouTubeAPI';

const rootQueryTypeDefs = gql`
  type Query {
    playlists: [Playlist]
  }
`;

const rootQueryResolvers = {
  Query: {
    playlists: async () => await new YouTubeAPI().getPlaylists(),
  }
}

const typeDefs = [rootQueryTypeDefs, PlaylistTypes];
const resolvers = [rootQueryResolvers, PlaylistResolvers]

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen(4201).then(({ url }) => {
  console.log(`🚀  Server ready at ${ url }`);
});

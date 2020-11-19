import { gql } from 'apollo-server';

export const typeDef = gql`
  type Video {
    id: String!,
    title: String!,
    channelId: String!,
    addedAt: String!,
    tags: [String]!
  }
`;

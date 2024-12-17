const { ApolloServer, gql } = require("apollo-server");

// Define the GraphQL schema
const typeDefs = gql`
  type User {
    id: ID!
    name: String!
    email: String!
  }

  type Query {
    users: [User!]!
  }

  type Mutation {
    addUser(name: String!, email: String!): User!
  }
`;

// Mocked data as an in-memory database
let users = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
];

// Define resolvers for queries and mutations
const resolvers = {
  Query: {
    users: () => users,
  },
  Mutation: {
    addUser: (_, { name, email }) => {
      const newUser = { id: `${users.length + 1}`, name, email };
      users.push(newUser);
      return newUser;
    },
  },
};

// Create and start the Apollo Server
const server = new ApolloServer({ typeDefs, resolvers });

server.listen(port = 5000).then(({ url }) => {
  console.log(`🚀 Mock GraphQL server running at ${url}`);
});

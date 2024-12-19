const { ApolloServer, gql } = require("apollo-server");
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

let users = [
  { id: "1", name: "Aman Chouksey", email: "aman@gmail.com" },
  { id: "2", name: "Piyush Pamnani", email: "piyush@gmail.com" },
];

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

const server = new ApolloServer({ typeDefs, resolvers });

server.listen(port).then(({ url }) => {
  console.log(`Mock GraphQL server running at ${url}`);
});

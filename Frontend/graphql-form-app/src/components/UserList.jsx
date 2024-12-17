import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>
            {user.name} - ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

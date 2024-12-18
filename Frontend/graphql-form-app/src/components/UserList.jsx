import { useQuery } from "@apollo/client";
import { GET_USERS } from "../graphql/queries";

const UserList = () => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p>Error loading users: {error.message}</p>;

  return (
    <div className="d-flex mx-auto flex-column justify-content-center align-items-center mt-3">
      <h1 className="mt-3">Reusable GraphQL Block</h1>
      <h2 className="mt-3">User List</h2>
      <ul className="list-group mt-3">
        {data.users.map((user) => (
          <li className="list-group-item" key={user.id}>
            {user.name} - ({user.email})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;

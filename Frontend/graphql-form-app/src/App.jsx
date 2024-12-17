import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

const App = () => {
  return (
    <div className="container" >
      <h1>Reusable GraphQL Block</h1>
      <UserList />
      <AddUser />
    </div>
  );
};

export default App;

import UserList from "./components/UserList";
import AddUser from "./components/AddUser";

const App = () => {
  return (
    <div className="container" >
      <UserList />
      <AddUser />
    </div>
  );
};

export default App;

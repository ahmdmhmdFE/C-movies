import { RouterProvider } from "react-router-dom";
import { router } from "./utils/App.Routes";
import { Provider } from "react-redux";
import store from "./services/redux/store";
import { UserProvider } from "./contexts/user";
import { useEffect, useState } from "react";

const App = () => {
  const [user, setUser] = useState({});

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setUser({
        username: localStorage.getItem("username"),
        token: localStorage.getItem("token"),
      });
    }
  }, []);

  return (
    <UserProvider value={{ user, setUser }}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </UserProvider>
  );
};

export default App;

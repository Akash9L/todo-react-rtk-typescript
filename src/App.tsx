import React, { useEffect } from "react";
import { pingServer } from "API";
import "./App.scss";
import { TodoList } from "features/TodoList/TodoList.view";

function App() {
  useEffect(() => {
    const interval = Number(
      process.env.REACT_APP_SERVER_PING_INTERVAL || 30 * 60 * 60 * 1000
    );
    console.log(`Setting REACT_APP_SERVER_PING_INTERVAL:`, interval);
    console.log(`The server will now be pinged every ${interval / 1000}s`);

    setInterval(() => {
      //Ping the backend server every 30 minutes so that it doesn't go into idle state.
      // This is because the server is hosted on free plan on render.com and it idles
      // down by default if not in use.
      pingServer();
    }, interval);
  }, []);

  return (
    <div className="App">
      <TodoList></TodoList>
    </div>
  );
}
export default App;

import "./App.css";
import Router from "./Routes/Rouite";
import { Provider } from "react-redux";
import Store from "./Redux/Store";

function App() {
  return (
    <div className="App">
      <Provider store={Store}>
      <Router />
      </Provider>     
    </div>
  );
}

export default App;

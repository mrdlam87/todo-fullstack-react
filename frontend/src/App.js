import "./App.css";
import { UIProvider } from "./contexts/ui.context";
import { UserProvider } from "./contexts/user.context";
import Home from "./routes/home.component";

function App() {
  return (
    <UserProvider>
      <UIProvider>
        <Home />
      </UIProvider>
    </UserProvider>
  );
}

export default App;

import "./App.css";
import { TodoProvider } from "./contexts/todo.context";
import { UIProvider } from "./contexts/ui.context";
import { UserProvider } from "./contexts/user.context";
import Home from "./routes/home.component";

function App() {
  return (
    <UserProvider>
      <TodoProvider>
        <UIProvider>
          <Home />
        </UIProvider>
      </TodoProvider>
    </UserProvider>
  );
}

export default App;

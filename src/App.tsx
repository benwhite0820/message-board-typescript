import "./App.css";
import MessageBoard from "./pages/message-board.component";
import { MessageProvider } from "./context/message.context";

function App() {
  return (
    <MessageProvider>
      <MessageBoard />
    </MessageProvider>
  );
}

export default App;

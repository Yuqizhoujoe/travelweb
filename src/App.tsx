import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";
import BlogsHome from "./pages/BlogsHome";
import BlogEditor from "./components/Blog/BlogEditor";
import BlogView from "./components/Blog/BlogView";
import AIAssistance from "./pages/AIAssistance";
import RoomCreation from "./components/Room/RoomCreation";
import ChatWindow from "./components/AIChat/ChatWindow";
import Layout from "./containers/Layout";

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          <Route path="/" element={<BlogsHome />} />
          <Route path="blog/edit" element={<BlogEditor />} />
          <Route path="/blog/:postId" element={<BlogView />} />
          <Route path="/ai" element={<AIAssistance />} />
          <Route path="/rooms/create" element={<RoomCreation />} />
          <Route path="/rooms/:roomId" element={<ChatWindow />} />
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;

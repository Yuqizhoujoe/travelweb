import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import BlogsHome from "./pages/BlogsHome";
import Login from "./pages/Login";

import BlogEditor from "./components/Blog/BlogEditor";
import BlogView from "./components/Blog/BlogView";
import AIAssistance from "./pages/AIAssistance";
import RoomCreation from "./components/Room/RoomCreation";
import ChatWindow from "./components/AIChat/ChatWindow";

import Layout from "./containers/Layout";

import "./App.css";
import PrivateRoute from "./containers/PrivateRoute";

function App() {
  return (
    <Layout>
      <Router>
        <Routes>
          {/* Public Route */}
          <Route path="/login" element={<Login />} />

          {/*  Private Route  */}
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<BlogsHome />} />
            <Route path="blog/edit" element={<BlogEditor />} />
            <Route path="/blog/:postId" element={<BlogView />} />
            <Route path="/ai" element={<AIAssistance />} />
            <Route path="/rooms/create" element={<RoomCreation />} />
            <Route path="/rooms/:roomId" element={<ChatWindow />} />
          </Route>
        </Routes>
      </Router>
    </Layout>
  );
}

export default App;

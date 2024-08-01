import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import "./App.css";
import BlogsHome from "./pages/BlogsHome";
import BlogEditor from "./pages/BlogEditor";
import BlogView from "./pages/BlogView";
import AIAssistance from "./pages/AIAssistance";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogsHome />} />
        <Route path="blog/edit" element={<BlogEditor />} />
        <Route path="/blog/:postId" element={<BlogView />} />
        <Route path="/ai" element={<AIAssistance />} />
      </Routes>
    </Router>
  );
}

export default App;

import "./App.css";
import Courses from "./components/courses/Courses";
import CreateCourse from "./components/createCourse/CreateCourse";
import Header from "./components/header/Header";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <div className="courses">
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/create" element={<CreateCourse />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

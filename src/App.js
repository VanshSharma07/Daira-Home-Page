import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import SideNavBar, { SideNavBarItem } from "./components/SideNavBar";
import { GrHomeRounded } from "react-icons/gr";
import { RiGraduationCapFill } from "react-icons/ri";
import { MdOutlineEventNote } from "react-icons/md";
import Home from "./pages/Home";
import MyClass from "./pages/MyClass";
import ClassPage from "./pages/ClassPage";
import TakeTests from "./pages/TakeTests";
import Test from "./components/test/Test";
import Settings from "./pages/Settings";
import Support from "./pages/Support";
import User from "./pages/User";
import Login from "./pages/login";
import EmptyPage from "./pages/EmptyPage";
import PrivateRoute from "./components/PrivateRoute";
import testsData from "./Data/tests.json"; // Use dynamic import if needed

function App() {
  const [students, setStudents] = useState([]);
  const [tests, setTests] = useState([]);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  const API_URL = process.env.REACT_APP_BACKEND_API;

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);

    if (token) {
      fetchData();
    } else {
      navigate("/login");
    }

    // Load tests.json data into the state
    setTests(testsData);
  }, [navigate]);

  const fetchData = async () => {
    try {
      const studentRes = await fetch(`${API_URL}/getChildrenByTeacher`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });

      if (!studentRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const students = await studentRes.json();
      setStudents(students.children);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSidebarToggle = (expand) => {
    setIsSidebarExpanded(expand);
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    fetchData();
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/login");
  };

  return (
    <div className="h-screen overflow-hidden">
      {isAuthenticated && (
        <SideNavBar onToggle={handleSidebarToggle}>
          <SideNavBarItem
            icon={<GrHomeRounded className="text-grey" size={21} />}
            text="Home"
            route="/"
          />
          <SideNavBarItem
            icon={<RiGraduationCapFill className="text-grey" size={21} />}
            text="My Class"
            route="/myclass"
          />
          <SideNavBarItem
            icon={<MdOutlineEventNote className="text-grey" size={24} />}
            text="Take Tests"
            route="/taketests"
          />
        </SideNavBar>
      )}

      <main
        className={`transition-all duration-300 ${
          isAuthenticated && isSidebarExpanded
            ? "ml-80"
            : isAuthenticated
            ? "ml-20"
            : ""
        }`}
      >
        {isAuthenticated && (
          <button
            onClick={handleLogout}
            className="absolute top-4 right-6 bg-red-500 text-white px-4 py-2 rounded-md shadow-lg"
          >
            Logout
          </button>
        )}

        <Routes>
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home students={students} tests={tests} />
              </PrivateRoute>
            }
          />
          <Route
            path="/myclass"
            element={
              <PrivateRoute>
                <MyClass students={students} />
              </PrivateRoute>
            }
          />
          <Route
            path="/taketests"
            element={
              <PrivateRoute>
                <TakeTests tests={tests} />
              </PrivateRoute>
            }
          />
          <Route
            path="/test"
            element={
              <PrivateRoute>
                <Test />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <Settings />
              </PrivateRoute>
            }
          />
          <Route
            path="/support"
            element={
              <PrivateRoute>
                <Support />
              </PrivateRoute>
            }
          />
          <Route
            path="/userprofile"
            element={
              <PrivateRoute>
                <User />
              </PrivateRoute>
            }
          />
          <Route
            path="/empty"
            element={
              <PrivateRoute>
                <EmptyPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/classpage"
            element={
              <PrivateRoute>
                <ClassPage students={students} />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;

import React from "react";
import "./App.css";
import { RouteCompileoutline } from "./Routes/routes";
import { LayoutDefault } from "./components/LayoutDefault/LayoutDefault";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { RequiredAuth } from "./components/RequriedAuth/RequriedAuth";
import Login from "./Pages/Login/Login";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          {RouteCompileoutline.map((route, index) => {
            const Page = route.component;
            const Layout =
              route.layout === null ? React.Fragment : LayoutDefault;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <RequiredAuth>
                    <Layout>
                      <Page />
                    </Layout>
                  </RequiredAuth>
                }
              />
            );
          })}
        </Routes>
      </div>
    </Router>
  );
}

export default App;

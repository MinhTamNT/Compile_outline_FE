import React from "react";
import "./App.css";
import { RouteCompileoutline } from "./Routes/routes";
import { LayoutDefault } from "./components/LayoutDefault/LayoutDefault";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          {RouteCompileoutline.map((route, index) => {
            const Page = route.component;
            const Layout =
              route.layout === null ? React.Fragment : LayoutDefault;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>{route.isAuthencatied ? <Page /> : <Page />}</Layout>
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

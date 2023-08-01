import React from "react";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";


import AppRoutes from "./Component/router";

const App: React.FC = () => {
  return (
    <div className="App">
      <div>
        <AppRoutes />
      </div>
    </div>
  );
};

export default App;

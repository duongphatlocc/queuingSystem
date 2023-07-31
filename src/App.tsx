import React from "react";

import "./App.css";

import "bootstrap/dist/css/bootstrap.min.css";

import Bglogin from "./Component/login/index";


const App: React.FC = () => {
  return (
    <div className="App">
      
      <div>
        <Bglogin></Bglogin>
      </div>
     
    </div>
  );
};

export default App;

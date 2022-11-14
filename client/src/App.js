import React from "react";
import RouterComp from "./RouterComp";
import {AuthProvider} from "./utils/AuthProvider";

function App() {
  return (
    <AuthProvider>
      <RouterComp/>
    </AuthProvider>

  );
}
export default App;

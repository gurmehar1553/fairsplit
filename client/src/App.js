import React from "react";
import RouterComp from "./RouterComp";
import {AuthProvider} from "./utils/AuthProvider";
import {Notify} from "./utils/Notify";

function App() {
  return (
    <AuthProvider>
    <Notify>
      <RouterComp/>
    </Notify>
    </AuthProvider>

  );
}
export default App;

import React from 'react';
import { BrowserRouter, Route} from "react-router-dom";
import CreateRoom from "./routes/CreateRoom";
import Room from "./routes/Room";
import { Routes } from "react-router-dom";
import Chat from './routes/Chat';
//import CallPage from "./routes/Callpage";

function App() {
  return (
    <BrowserRouter>
     <Routes>
      {/* <Switch> */}
      <Route path="/" element={<CreateRoom />} />
      <Route path="/room" element={<Room/>} />
      {/* <Route path='/chat' element={<Chat/>}/> */}
        {/* <Route exact path="/home">
          <HomePage />
        </Route> */}
        
      {/* </Switch> */}
    </Routes>
    </BrowserRouter>
  );
}

export default App;

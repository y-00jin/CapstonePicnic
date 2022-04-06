import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import Canlendar from "./pages/Canlendar";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path= "Canlendar" element={<Canlendar/>}/>
      </Routes>
    </div>
    
  );
}

export default App;

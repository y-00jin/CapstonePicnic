import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import Calendar from "./pages/Calendar";
import MemoryWrite from "./pages/MemoryWrite";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path= "Calendar" element={<Calendar/>}/>
        <Route path= "MemoryWrite" element={<MemoryWrite/>}/>
      </Routes>
    </div>
    
  );
}

export default App;

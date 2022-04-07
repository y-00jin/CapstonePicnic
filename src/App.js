import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import Calendar from "./pages/Calendar";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path= "Calendar" element={<Calendar/>}/>
      </Routes>
    </div>
    
  );
}

export default App;

import { Route, Routes } from "react-router";
import Main from "./pages/Main";
import Calendar from "./pages/Calendar";
import MemoryWrite from "./pages/MemoryWrite";
import PhotoAlbum from "./pages/PhotoAlbum";
import Memory from "./pages/Memory";

function App() {
  return (
    <div className="App">
      
      <Routes>
        <Route path="/" element={<Main/>}/>
        <Route path= "Calendar" element={<Calendar/>}/>
        <Route path= "MemoryWrite" element={<MemoryWrite/>}/>
        <Route path= "PhotoAlbum" element={<PhotoAlbum/>}/>
        <Route path= "Memory" element={<Memory/>}/>
      </Routes>
    </div>
    
  );
}

export default App;

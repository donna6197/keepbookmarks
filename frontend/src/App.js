// import ReactDOM from 'react-dom';
import {BrowserRouter, Routes, Route } from "react-router-dom";

import ResultPage from './component/Results'
import AddNew from './component/addNew'
// import MainPage from './component/main'
import EditPage from './component/editItem'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<ResultPage />} />
          <Route path="/AddNew" element={<AddNew />} />
          {/* <Route path="/Main" element={<MainPage />} /> */}
          <Route path="/EditPage/*" element={<EditPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
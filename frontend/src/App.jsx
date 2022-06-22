import "./globalStyle.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from './pages/Home/Home';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import moment from "moment";
import "moment/locale/pt-br";

moment.locale("pt-br");
function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/home' element={<Home />} />
          <Route path='/cadastro' element={<Register />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

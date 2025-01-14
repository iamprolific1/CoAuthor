import { BrowserRouter } from "react-router-dom";
import { PageRoutes } from "./routes";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <PageRoutes />
    </BrowserRouter>
  )
}

export default App

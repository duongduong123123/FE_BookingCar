
import './App.css'
import Header from './components/Header'
import { routes } from './routers/routes'
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function App() {

  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        toastClassName={() =>
          "!z-[99999] !fixed !top-6 !left-1/2 !-translate-x-1/2 bg-[#222] text-white shadow-lg"
        }
        bodyClassName="text-sm"
        style={{ pointerEvents: "auto" }}
      />
      <RouterProvider router={routes} />
    </>
  )
}

export default App

import { Container } from "react-bootstrap";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";


function App() {
  return (
    <>
<Header/>
<Container className="mt-5">
<Outlet/>
</Container>
      <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8}
  toastOptions={{
    // Define default options
    duration: 5000,
    style: {
      background: '#363636',
      color: '#fff',
    },
    // Default options for specific types
    success: {
      duration: 3000,
      theme: {
        primary: 'green',
        secondary: 'black',
      },
    },
  }}
/>
    </>
  );
}

export default App;

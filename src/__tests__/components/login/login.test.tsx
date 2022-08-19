import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LoginComponent } from "../../../components/login/login";
import { AuthProvider } from "../../../hooks/use-auth";

const renderWithProvider = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/login' element={<LoginComponent />} />
          <Route path='/catalog' element={<div>Catalog</div>} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

describe('Login', () => {
  
});
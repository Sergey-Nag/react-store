import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedPage } from './components/protected-page/protected-page';
import './App.scss';
import { LoginComponent } from './components/login/login';
import { NotFoundPage } from './components/not-found/not-found-page';
import { AuthProvider } from './hooks/use-auth';
import { ROUTES } from './constants/routes';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
      
        <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginComponent />} />
            <Route path={ROUTES.CATALOG} element={<ProtectedPage><div>Catalog page</div></ProtectedPage>} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

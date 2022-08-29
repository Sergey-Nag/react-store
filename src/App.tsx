import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ProtectedPage } from './components/protected-page/protected-page';
import './App.scss';
import { Header } from './components/header/header';
import { LoginComponent } from './components/login/login';
import { NotFoundPage } from './components/not-found/not-found-page';
import { AuthProvider } from './hooks/use-auth';
import { ROUTES } from './constants/routes';
import { NotificationsProvider } from './hooks/use-notification';
import { NOTIFICATION_WRAPPER_ID } from './constants/notification-wrapper-id';

function App() {
  return (
    <AuthProvider>
      <NotificationsProvider>
        <div id={NOTIFICATION_WRAPPER_ID}></div>
        <BrowserRouter>
          <Header></Header>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<LoginComponent />} />
            <Route path={ROUTES.CATALOG} element={<ProtectedPage><div>Catalog page</div></ProtectedPage>} />
            <Route path='*' element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </NotificationsProvider>
    </AuthProvider>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.scss';
import { NotFoundPage } from './components/not-found/not-found-page';
import { AuthProvider } from './hooks/use-auth';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
            <Route path='/login' element={<NotFoundPage />} />
            <Route path='/catalog' element={<div>Catalog page</div>} />
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;

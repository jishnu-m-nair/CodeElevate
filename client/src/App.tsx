import { Route, Routes } from 'react-router-dom';
import ErrorBoundary from './components/common/ErrorBoundary';
import { Toaster } from 'sonner';
import UserRoutes from './routes/userRoutes';
import RecruiterRoutes from './routes/RecruiterRoutes';
import AdminRoutes from './routes/AdminRoutes';

const App = () => {
  return (
    <>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/*" element={<ErrorBoundary><UserRoutes /></ErrorBoundary>} />
        <Route path="/recruiter/*" element={<ErrorBoundary><RecruiterRoutes /></ErrorBoundary>} />
        <Route path="/admin/*" element={<ErrorBoundary><AdminRoutes /></ErrorBoundary>} />
      </Routes>
    </>
  );
};

export default App;

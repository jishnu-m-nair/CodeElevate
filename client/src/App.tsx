import { Route, Routes } from 'react-router-dom';
import UserRoutes from './routes/userRoutes';

const App = () => {
  return (
    <Routes>
      <Route path="/*" element={<UserRoutes />} />
    </Routes>
  );
};

export default App;

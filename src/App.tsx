import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import { HomePage, NotFoundPage } from './routes';

function AppContent() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;

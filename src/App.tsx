import { BrowserRouter as Router, Routes, Route  } from 'react-router-dom';
import { Suspense } from 'react';
import NotFoundPage from '@/ui/pages/NotFound';
import IndexPage from '@/ui/pages/Index';


function AppContent() {
  return (
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route
            path="/"
            element={
                <IndexPage />
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

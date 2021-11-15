import './App.css';
import { Suspense } from 'react';
import AppRoutes from "../src/Routes/Routers"

function App() {
  return (
    <Suspense fallback={(<p>Loading</p>)}>
      <AppRoutes />
    </Suspense>
  );
}

export default App;

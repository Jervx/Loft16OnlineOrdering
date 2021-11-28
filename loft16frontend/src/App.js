import { Suspense } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

/* Pges */
import AdminContainer from './Pages/Admin/AdminContainer';
import PublicContainer from './Pages/Public/PublicContainer';
import NotFound from './Pages/NotFound'
import AuthContainer from './Pages/Auth/AuthContainer';


/* Alerts Component*/
import Informative from './Components/Modal/Informative';

/* Modal */
import InputModal from "./Components/Modal/InputModal"

function App() {
  console.log("APP")

  return (
    <Suspense fallback={(<p>Loading</p>)}>
      <Informative />
      <InputModal />
      <Router>
        <Switch>
          <Route path="/auth" component={AuthContainer} />
          <Route path="/admin" component={AdminContainer} />
          <Route path="/" component={PublicContainer} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Suspense>
    )
  }
export default App;

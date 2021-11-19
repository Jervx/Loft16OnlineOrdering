import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import NotFound from '../Pages/Public/NotFound'

import Routers from './Config'
const routes = Routers

const AppRoutes = () => {
  return (
    <Router>
      <Switch>
        Ok
        {routes.map((route) => (
          <Route
            key={route.path}
            path={route.path}
            component={route.component}
          ></Route>
        ))}
        {/* <Route path='*' exact={true} component={NotFound} /> */}
      </Switch>
    </Router>
  )
}
export default AppRoutes
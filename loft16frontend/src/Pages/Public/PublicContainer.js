/* Dependencies */
import { Route, Switch } from 'react-router-dom'

/* Components */
import Header from "../../Components/Header"
import Products from "./Products"
import Home from "./Home"
import Faqs from "./Faqs"

import NotFound from '../NotFound'



const PublicContainer = ({toAuth}) => {
    return (
        <div>
                <Header />
                <Switch>
                    <Route exact path='/products' render={(props) => <Products />} />
                    <Route exact path='/faqs' component={Faqs} />
                    <Route exact path='/' render={(props) => <Home />} />
                    <Route path="*" component={NotFound} />
                </Switch>
        </div>
    )
}

export default PublicContainer

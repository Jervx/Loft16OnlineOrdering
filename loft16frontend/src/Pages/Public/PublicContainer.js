/* Dependencies */
import { Route, Switch } from 'react-router-dom'

/* Components */
import Header from "../../Components/Header"
import Products from "./Products"
import Home from "./Home"
import Faqs from "./Faqs"
import ProductView from './ProductView'

import NotFound from '../NotFound'

import Footer from "../../Components/Footer"

const PublicContainer = ({toAuth}) => {
    return (
        <>
        <div>
                <Header />
                <div className='mt-24'>
                <Switch>
                    <Route exact path='/productdetail/:prod_id' component={ProductView} />
                    <Route exact path='/products' render={(props) => <Products />} />
                    <Route exact path='/faqs' component={Faqs} />
                    <Route exact path='/' render={(props) => <Home />} />
                    <Route path="*" component={NotFound} />
                </Switch></div>
        </div>
        <Footer />
        </>
    )
}

export default PublicContainer

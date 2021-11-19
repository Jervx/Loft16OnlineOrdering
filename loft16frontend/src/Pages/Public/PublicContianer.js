/* Dependencies */
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

/* Components */
import Header from "../../Components/Header"
import Products from "./Products"
import Home from "./Home"
import UserProfile from "../User/AccountProfile"


const PublicContianer = () => {
    return (
        <div>
            <Router>
                <Header />
                HELLO
                <Switch>
                    <Route exact from='/home' render={(props) => <Home />} />
                    <Route exact path='/home/products' render={(props) => <Products />} />
                    <Route exact path='/home/profile' render={(props) => <UserProfile />} />
                </Switch>
            </Router>
        </div>
    )
}

export default PublicContianer

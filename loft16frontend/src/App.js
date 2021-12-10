import { Suspense, useEffect } from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

/* Pges */
import AdminContainer from './Pages/Admin/AdminContainer';
import PublicContainer from './Pages/Public/PublicContainer';
import NotFound from './Pages/NotFound'
import AuthContainer from './Pages/Auth/AuthContainer';
import AccountProfile from './Pages/User/AccountProfile';

/* Modals */
import Informative from './Components/Modal/Informative';
import InputModal from "./Components/Modal/InputModal"
import Notifier from "./Components/Modal/Notifier";

/* Helpers */
import API from './Helpers/api';

/* Redux & Slices */
import {useDispatch} from 'react-redux'
import { signin } from './Features/userSlice'

function App() {

  const dispatch = useDispatch()

  useEffect(()=>{
    const checkIfUserIsSaved = async () =>{
      let savedUser = JSON.parse(localStorage.getItem("userData"))
      if(!savedUser) return
      try{
        const response = await API.get(`/user/mydetails/${savedUser._id}`)
        dispatch(signin(response.data.userData))
      }catch(e){
        console.log({msg : "There's a user but we failed to get data from server, maybe the cookies where expired", err : e })
      }      
    }
    checkIfUserIsSaved()
  })

  return (
    <Suspense fallback={(<p>Loading</p>)}>
      <Router>
        <Informative />
        <InputModal />
        <Notifier />
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

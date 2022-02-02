import { Suspense, useEffect, lazy } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

/* Pges */
import AdminContainer from "./Pages/Admin/AdminContainer";
import NotFound from "./Pages/NotFound";
import AuthContainer from "./Pages/Auth/AuthContainer";
import AccountProfile from "./Pages/User/AccountProfile";
import AccountSettings from "./Pages/User/AccountSetting";

/* Protected Route */
import ProtectedRoute from "./Components/ProtectedRoute";

/* Modals */
import Informative from "./Components/Modal/Informative";
import InputModal from "./Components/Modal/InputModal";
import Notifier from "./Components/Modal/Notifier";

/* Helpers */
import API from "./Helpers/api";

/* Redux & Slices */
import { useDispatch } from "react-redux";
import { signin } from "./Features/userSlice";
import { adminSign } from "./Features/adminSlice";
import FullPageLoader from "./Components/ProtectedLoader";

/* Icon */

const PublicContainer = lazy(() => import("./Pages/Public/PublicContainer"));

function App() {
  const dispatch = useDispatch();

const checkIfUserIsSaved = async () => {
      let savedUser = JSON.parse(localStorage.getItem("userData"));
      let savedAdmin = JSON.parse(localStorage.getItem("adminData"));

      if (!savedUser && !savedAdmin) return;
      try {
        const response = await API.get(
          !savedAdmin
            ? `/user/mydetails/${savedUser._id}`
            : `/admin/mydetails/${savedAdmin._id}`
        );
        if (!savedAdmin) dispatch(signin(response.data.userData));
        else dispatch(adminSign(response.data.adminData));
      } catch (error) {
          console.log(error)
      }
    };

  useEffect(() => {
    checkIfUserIsSaved();
  });

  console.log("Load APP");

  return (
    <Suspense fallback={<FullPageLoader />}>
      <Router>
        <Informative />
        <InputModal />
        <Notifier />
        <Switch>
          <Route path="/auth" component={AuthContainer} />
          <Route path="/admin" component={AdminContainer} />
          <ProtectedRoute path="/user" component={AccountProfile} />
          <ProtectedRoute path="/account" component={AccountSettings} />

          <Route path="/" component={PublicContainer} />
          <Route path="*" component={NotFound} />
        </Switch>
      </Router>
    </Suspense>
  );
}
export default App;

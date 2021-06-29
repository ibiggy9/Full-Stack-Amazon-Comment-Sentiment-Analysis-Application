import SignUp from "./Components/SignUp"
import Dashboard from './Components/Dashboard'
import Login from './Components/Login'
import { AuthProvider } from "./Context/AuthContext"
import { HashRouter, BrowserRouter  as Router, Route, Switch } from 
'react-router-dom'
import PrivateRoute from "./Components/PrivateRoute"
import Forgot from './Components/Forgot'
import CommentDashboard from "./Components/Dashboards/CommentDashboard"
import SearchDashboard from "./Components/Dashboards/SearchDashboard"
import SearchEntry from "./Components/Dashboards/CommentSubComponents/SearchEntry"

function App() {
  return (
    <div>
    <AuthProvider>
        <HashRouter>
          <Router>
            <Switch>
            <Route path='/signup' component={SignUp} />
            <PrivateRoute exact path='/' component={Dashboard} />
            <PrivateRoute path='/amazon-comments-data' component={CommentDashboard} />
            <PrivateRoute path='/amazon-search-data' component={SearchDashboard} />
            <Route path='/login' component={Login} />
            <Route path='/forgot-password' component={Forgot} />
            </Switch>
          </Router>
          </HashRouter>
   
   

  </AuthProvider>
  </div>
  )}

export default App

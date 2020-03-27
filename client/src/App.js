import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import setAuthToken from "./utils/setAuthToken"
import { logoutUser } from "./actions/authActions"

import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux'
import { store, persistor } from './store'

import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Landing from './components/layout/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import PrivateRoute from "./components/private-route/PrivateRoute"
import AdminRoute from "./components/private-route/AdminRoute"
import Dashboard from "./components/dashboard/Dashboard"
import Messages from './components/Messages'
import List from './components/List'
import PublicChat from './components/PublicChat'
import FileUpload from './components/FileUpload'
import Family from './components/family/Family'
import Admin from './components/admin/Admin'

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken
  setAuthToken(token)
  const decoded = jwt_decode(token)
  
  // Check for expired token
  const currentTime = Date.now() / 1000 // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser())
    // Redirect to login
    window.location.href = "./login"
  }
}

function App() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <div className="App">
              <Navbar />
              <Route exact path="/" component={Landing}/>
              <Route exact path="/register" component={Register}/>
              <Route exact path="/login" component={Login}/>
              {/* <Route exact path="/ACE" component={ACE}/> */}
              <Switch>
                <AdminRoute exact path="/admin" component={Admin} />
                <PrivateRoute exact path="/dashboard" component={Dashboard} />
                <PrivateRoute exact path="/messages" component={Messages} />
                <PrivateRoute exact path="/list" component={List} />
                <PrivateRoute exact path="/public-chat" component={PublicChat}/>
                <PrivateRoute exact path="/upload" component={FileUpload} />
                <PrivateRoute exact path="/family" component={Family} />
              </Switch>
              <Footer />
            </div>
          </Router> 
        </PersistGate>
      </Provider>
      
    )
}

export default App

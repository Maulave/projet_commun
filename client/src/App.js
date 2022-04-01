import React, { useEffect } from 'react';
import { Header, Footer } from './components';
import { BrowserRouter as Router, Route, Switch, Redirect, useLocation } from 'react-router-dom';
import Annonces from './annonces';
import ConnexionInscription from './connexion';
import Message from './chat/MessagesAnnonce';
import Compte from './compte'
import { useDispatch } from 'react-redux';
import { setUser } from './store/appSlice'


const url = "http://localhost:5000/reconnexion";


function App() {

  const dispatch = useDispatch()

  useEffect(() => {

    const token = localStorage.getItem('auth-plateforme')

    if(token) {
      fetch(url,
        {
            method: 'GET',
            headers: {'Token': token, 'Content-Type': 'application/json'},
        })
        .then(res => res.json())
        .then(data => {
          if (data.success === true) {
              dispatch(setUser(data.user))
          }
      })
    }
  }, []);
  
  const { pathname } = useLocation()

  return ( 
    <>
      <div className='App'>
        <Header />
          <Switch>
            <Route path='/annonces' exact render={ (props) => {
              return (
                <Annonces />
              )
            }} />
            <Route path='/connexion' exact render={ (props) => {
              return (
                <ConnexionInscription connexion='connexion' />
              )
            }} />
            <Route path='/inscription' exact render={ (props) => {
              return (
                <ConnexionInscription connexion='inscription' />
              )
            }} />
            <Route path='/message' exact render={ (props) => {
              return (
                <Message />
              )
            }} />
            <Route path='/compte' exact render={ (props) => {
              return (
                <Compte />
              )
            }} />
            <Redirect to='/' />
          </Switch>
          {pathname === '/' ? <Footer /> : null}
      </div>
    </>
  );
}

const AppContainer = () => (
  <Router>
      <App />
  </Router>
); 

export default AppContainer;


import React from 'react';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './pages/Home';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Header from './components/Header';
import Project from './pages/Project';
import Folder from './pages/Folders';
import FrontEnd from './pages/FrontEnd'
import BackEnd from './pages/BackEnd'
import LoginHeader from './components/Header/loginHeader';
import FrontEndFromFolder from './pages/FrontEndFromFolder';
import BackEndFromFolder from './pages/BackEndFromFolder';

import './App.css'

const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="mainContainer">
          <div className="container">
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/login">
              <LoginHeader />
              <Login />
            </Route>
            <Route exact path="/signup">
              <LoginHeader />
              <Signup />
            </Route>
            <Route exact path="/me">
              <Header />
              <Profile />
            </Route>
            <Route exact path="/projects/:projectID">
              <Header />
              <Project />
            </Route>
            <Route exact path='/folder/:folderID'>
              <Header />
              <Folder />
            </Route>
            <Route exact path='/frontfile/:fileID'>
              <Header />
              <FrontEnd />
            </Route>
            <Route exact path='/folderfrontfile/:fileID'>
              <Header />
              <FrontEndFromFolder />
            </Route>
            <Route exact path='/backfile/:fileID'>
              <Header />
              <BackEnd />
            </Route>
            <Route exact path='/folderbackfile/:fileID'>
              <Header />
              <BackEndFromFolder />
            </Route>
          </div>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;

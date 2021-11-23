import React, { Component } from "react";
import {BrowserRouter as Router,Route,Switch, Redirect} from "react-router-dom";

import logo from './logo.svg';
import './App.css';

import Header from "./components/Header/Header";
import Login from "./views/Login";
import Todo from "./views/Todo";
import Update from "./components/Update";

import Protected from "./components/Protected";


function App() {
  return (
    <Router>
		
		<Switch>
			<Route path='/login' component={Login} />
      
			<Route exact path='/Update/:id'>
				<Protected Cmp={Update} />
			</Route>
			<Route path='/todo'>
				<Protected Cmp={Todo} />
			</Route>
			<Route path='/'>
				<Protected Cmp={Todo} />
			</Route>
		</Switch>
		
	</Router>
  );
}

export default App;

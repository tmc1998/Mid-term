import React from 'react';  
import './App.css';
import Nav from './Nav';
import CovidDashboard from "./components/CovidDashboard";
import CovidChart from "./components/CovidChart";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
    return (
        <Router>
            <div className = "App">
                <Nav/>
                <Switch>
                    <Route path="/Mid-term/map"component = {CovidDashboard}/>
                    <Route path="/Mid-term/stats" component = {CovidChart}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;

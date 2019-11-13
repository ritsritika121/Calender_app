
import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom"; 

//importing components
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AfterLogin from "./components/AfterLogin";
import GetUserToken from "./Util/GetUserToken";
class Routing extends Component {
    render() {
         const token = GetUserToken();
        return (

            <BrowserRouter>
                {
                    token ? (
                        <Switch>
                            <Route path="/" component={AfterLogin} />
                        </Switch>
                    ) : (
                        <Switch>
                            <Route exact path="/" component={Login} />
                            <Route path="/signup" component={SignUp} />
                        </Switch>
                    )
                 } 
            </BrowserRouter>
            
        );
    }
}
export default Routing;

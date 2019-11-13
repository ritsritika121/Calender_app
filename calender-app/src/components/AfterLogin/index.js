import React, { Component } from "react";
import { connect } from "react-redux";
import * as MyProfileAction from "../../actions/myProfileActions";

import { Route, Switch } from "react-router-dom";
import HomePage from "../HomePage";

class AfterLogin extends Component { 

    render() {
        return (
            <Switch>
                <Route exact path="/" component={HomePage} />
            </Switch>
        );
    }
}
const mapStateToProps = state => {
    return {};
};
export default connect(
    mapStateToProps,
    { ...MyProfileAction }
)(AfterLogin);

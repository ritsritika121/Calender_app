
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as LoginAction from "../actions/loginAction";
import GetUserToken from "../Util/GetUserToken";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: "",
            userPassword: "",
            errorEmail: "",
            errorPassword: "",
        };
        
         const token = GetUserToken();
        if (token) {
            this.props.history.push('/')
        }
     }

    componentDidUpdate(prevProps) {
        if (prevProps.isUserLoggedIn !== this.props.isUserLoggedIn) {
            this.props.resetUser();
            window.location = "/";
        }
    }

    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };
    
    

    
    submitLoginForm = event => {
        event.preventDefault();
        let { userEmail, userPassword } = this.state;
        if (this.validateLoginForm()) {
            let payload = {
                email: userEmail,
                password: userPassword
            };
            this.props.loginUser(payload);
        }
    };

   
    validateLoginForm = () => {
        let { userEmail, userPassword } = this.state;
        let errorEmail = "";
        let errorPassword = "";
        let formIsValid = true;
      
        if (!userEmail) {
            formIsValid = false;
            errorEmail = "Please enter your email address";
        }
        if (userEmail) {
            let pattern = new RegExp(
                /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
            );
            if (!pattern.test(userEmail)) {
                formIsValid = false;
                errorEmail = "Please enter a valid email address.";
            }
        }
        
        if (!userPassword) {
            formIsValid = false;
            errorPassword = "Please enter a password";
        }
        
        if (userPassword) {
        }
        this.setState({ errorEmail, errorPassword });
        return formIsValid;
    };

    render() {
        return (
            <div>
                <section className="loginWrap">
                    <div className="LoginInner">
                        <div className="container">
                            <div className="LoginPopSetWrap">
                                <div className="LoginData">
                                    <div className="popheader">
                                        <h1 className="pop-heading">Login</h1>
                                    </div>
                                    <div className="pop-body">
                                        <form>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Email Id*"
                                                name="userEmail"
                                                value={this.state.userEmail}
                                                onChange={this.handleChange}
                                            />
                                            <span>{this.state.errorEmail}</span>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password*"
                                                name="userPassword"
                                                value={this.state.userPassword}
                                                onChange={this.handleChange}
                                            />
                                            <span>{this.state.errorPassword}</span>

                                            {/* <ul className="RandF log-in-rem-font">
                                                <li className="Textremember">
                                                    <input type="checkbox" name="isRemember" value= {true} onChange= {this.handleCheckBox}/>
                                                    Remember Me
                                                </li>
                                                <li>
                                                    <Link to="/forgetpassword">
                                                        Forgot Password?
                                                    </Link>
                                                </li>
                                            </ul> */}

                                        </form>
                                    
                                        <button className="pop-btn" onClick={this.submitLoginForm}>
                                            Login
                                        </button>
                                        <div className="DevidePart divide">
                                            <div className="or-divition">OR</div>
                                        </div>
                                        <h6 className="text-center">
                                            Don't have an account?{" "}
                                            {/* <a href="#">Click here</a> */}
                                            <Link to="/signup">Click here</Link>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return { isUserLoggedIn: state.loginReducer.isUserLoggedIn };
};
export default connect(
    mapStateToProps,
    { ...LoginAction }
)(Login);

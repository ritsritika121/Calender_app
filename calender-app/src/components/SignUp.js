
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as SignUpAction from "../actions/signUpAction";
import EmailValidator from "../Util/EmailValidator";
import ContactValidator from "../Util/ContactValidator";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userFirstName: "",
            userLastName: "",
            userContactNumber: "",
            userEmail: "",
            userPassword: "",
            errorFirstName: "",
            errorLastName: "",
            errorContactNumber: "",
            errorEmail: "",
            errorPassword: ""
        };
    }

    componentDidUpdate(prevProps) {
        if (prevProps.isUserRegistered !== this.props.isUserRegistered) {
            this.props.history.push("/");
        }
    }
    
    
    

    handleNumberChange = e => {    
        var re = new RegExp(/^[0-9]*$/);
        if(re.test(e.target.value) ){
            this.setState({ [e.target.name]: e.target.value });
        }
    }

    
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

   
    submitSignUpForm = event => {
        event.preventDefault();
        let {
            userFirstName,
            userLastName,
            userContactNumber,
            userEmail,
            userPassword,
        } = this.state;
        if (this.validateSignUpForm()) {
            let payload = {
                email: userEmail,
                password: userPassword,
                firstname: userFirstName,
                lastname: userLastName,
                
                contact: userContactNumber,
            };

            this.props.signUpUser(payload, this.props.history);
            
        }
    };

    
    validateSignUpForm = () => {
        let {
            userFirstName,
            userLastName,
            userContactNumber,
            userEmail,
            userPassword,
        } = this.state;
        let errorFirstName = "";
        let errorLastName = "";
        let errorContactNumber = "";
        let errorEmail = "";
        let errorPassword = "";
        let formIsValid = true;

        
        if (!userFirstName) {
            formIsValid = false;
            errorFirstName = "Please enter your first name.";
        }
        if (!userFirstName.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errorFirstName = "Please enter alphabets only";
        }
        
        if (!userLastName) {
            formIsValid = false;
            errorLastName = "Please enter your last name.";
        }
        if (!userLastName.match(/^[a-zA-Z ]*$/)) {
            formIsValid = false;
            errorLastName = "Please enter alphabets only";
        }
        
        if (!EmailValidator(userEmail).isValid) {
            formIsValid = false;
            errorEmail = EmailValidator(userEmail).errMsg;
        }

        if(!ContactValidator(userContactNumber).isValid) {
            formIsValid = false;
            errorContactNumber = ContactValidator(userContactNumber).errMsg;
        }
        
        
        if (!userPassword) {
            formIsValid = false;
            errorPassword = "Please enter a password";
        }
        
        if (userPassword.length < 8) {
            formIsValid = false;
            errorPassword = "Please enter at least 8 character password";
        }
        
        this.setState({
            errorFirstName,
            errorLastName,
            errorContactNumber,
            errorEmail,
            errorPassword,
            
        });
        return formIsValid;
    };

    render() {
        return (
            <div>
                <section className="loginWrap signUpWrap">
                    <div className="LoginInner">
                        <div className="container">
                            <div className="LoginPopSetWrap signpopups">
                                <div className="LoginData">
                                    <div className="popheader">
                                        <h1 className="pop-heading">Sign Up</h1>
                                    </div>
                                    <div className="pop-body">
                                        <form onSubmit={this.submitSignUpForm}>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="First Name"
                                                name="userFirstName"
                                                value={this.state.userFirstName}
                                                onChange={this.handleChange}
                                                maxLength = "20"
                                            />
                                            <span className="error-message">{this.state.errorFirstName}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Last Name"
                                                name="userLastName"
                                                value={this.state.userLastName}
                                                onChange={this.handleChange}
                                                maxLength = "20"
                                            />
                                            <span className="error-message">{this.state.errorLastName}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Contact Number"
                                                name="userContactNumber"
                                                value={this.state.userContactNumber}
                                                onChange={this.handleNumberChange}
                                                maxLength = "10"
                                            />
                                            <span className="error-message">{this.state.errorContactNumber}</span>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="Enter Email"
                                                name="userEmail"
                                                value={this.state.userEmail}
                                                onChange={this.handleChange}
                                            />
                                            <span className="error-message">{this.state.errorEmail}</span>
                                            <input
                                                type="password"
                                                className="form-control"
                                                placeholder="Password"
                                                name="userPassword"
                                                value={this.state.userPassword}
                                                onChange={this.handleChange}
                                            />
                                            <span className="error-message">{this.state.errorPassword}</span>
                                           
                                        </form>
                                        {/* <Link to ='/'className="pop-btn">Login</Link> */}
                                        <button onClick={this.submitSignUpForm} className="pop-btn">
                                            Sign Up
                                        </button>
                                        {/* <a href="#" className="pop-btn">
                                            Login
                                        </a> */}
                                        <div className="DevidePart">
                                            <div className="or-divition">OR</div>
                                        </div>
                                        <h6 className="text-center">
                                            Already have an account?{" "}
                                            {/* <a href="#">Click here</a> */}
                                            <Link to="/">Click here</Link>
                                        </h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        )
    }
}
const mapStateToProps = state => {
    return { isUserRegistered: state.signUpReducer.isUserRegistered };
};
export default connect(
    mapStateToProps,
    { ...SignUpAction }
)(withRouter(SignUp));
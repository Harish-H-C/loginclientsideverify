import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

function ValidationMessage(props) {
    if(!props.valid){
        return(<div className="error-msg">{props.msg}</div>)
    }else {
        return null;
    }
}


class App extends Component {

    state = {
            userId_name: "",usernameValid:false,
            email:"",emailValid:false,
            password: "",passwordValid:false,
            passwordConfirmation: "",passwordConfirmationValid:false,
            formValid:false,
            error:{}
        }

        ValidateForm = () => {
            const {usernameValid,emailValid,passwordValid,passwordConfirmationValid} = this.state;
            this.setState({
                formValid:usernameValid && emailValid && passwordValid && passwordConfirmationValid
            })
        }

        updateUsername = (userId_name) => {
            this.setState({userId_name:userId_name},this.validateUsername)
        }

        validateUsername = () => {
            const{userId_name} = this.state;
            let usernameValid = true;
            let error = {...this.state.error}

            if(userId_name.length < 3)
            {
                usernameValid = false;
                error.userId_name = "Username must be greater than 3 character"
            }
            this.setState({usernameValid, error}, this.validateForm)
        }

        updateEmail = (email) => {
            this.setState({email},this.validateEmail)
        }

        validateEmail = () => {
            const{email} = this.state;
            let emailValid = true;
            let error = {...this.state.error}

            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
                emailValid = false;
                error.email = "Invalid email Format"
            }
            this.setState({emailValid, error}, this.validateForm)
        }

        updatePassword = (password) => {
            this.setState({password},this.validatePassword);
        }

        validatePassword = () => {
            const{password} = this.state;
            let passwordValid = true;
            let error = {...this.state.error}
            
            if (password.length < 6){
                passwordValid = false;
                error.password = "Password must be at least 6 characters"
            } else if (!/\d/.test(password)){
                passwordValid = false;
                error.password = "Password must be 6 digits"
            } else if (!/[!@#$%^&*]/.test(password)){
                passwordValid = false;
                error.password = "Password must contain Special Characters"
            }
            this.setState({passwordValid, error}, this.validateForm)
        }

        updatePasswordConfirm = (passwordConfirmation) => {
            this.setState({passwordConfirmation},this.validatePasswordConfirm);
        }

        validatePasswordConfirm = () => {
            const{passwordConfirmation,password} = this.state;
            let passwordConfirmationValid = true;
            let error = {...this.state.error}

            if (password !== passwordConfirmation){
                passwordConfirmationValid = false;
                error.passwordConfirmation = "Password Donot match"
            }

            this.setState({passwordConfirmationValid,error}, this.validateForm)
        }


    render(){
        return(
            <div className = "App">
                <header>
                    Form Validation
                </header>
                <main role="main">
                    <form action="#" id='js-form'>
                        <div className="form-group">
                            <ValidationMessage  valid={this.state.usernameValid} msg={this.state.error.userId_name}/>
                            <label htmlFor="username">Username</label>
                            <input type="text" id="username" name="username" className="form-field" value={this.state.userId_name} onChange={(e)=>this.updateUsername(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <ValidationMessage  valid={this.state.emailValid} msg={this.state.error.email}/>
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" name="email" className="form-field" value={this.state.email} onChange={(e) => this.updateEmail(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <ValidationMessage  valid={this.state.passwordValid} msg={this.state.error.password}/>
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" className="form-field" value={this.state.password} onChange={(e) => this.updatePassword(e.target.value)}/>
                        </div>
                        <div className="form-group">
                            <ValidationMessage  valid={this.state.passwordConfirmationValid} msg={this.state.error.passwordConfirmation}/>
                            <label htmlFor="password-confirmation">Password Confirmation</label>
                            <input type="password" id="password-confirmation" name="password-confirmation" className="form-field" value={this.state.passwordConfirmation} onChange={(e) => this.updatePasswordConfirm(e.target.value)}/>
                        </div>
                        <div className="form-controls">
                            <button className="button" type="submit" disable={!this.state.formValid}>Sign Up</button>
                        </div>
                    </form>
                </main>
            </div>
        )
    }
}

ReactDOM.render(<App/>,document.getElementById('root'));
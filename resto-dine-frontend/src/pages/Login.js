import React from 'react'
import Footer from '../components/Footer'
import './Login.css'

export default function Login() {
    return (
        <React.Fragment>
            <div className="login">
                <div className="form-wrapper">
                    <img className="bg-img" src="img/login/login.png" alt="login-img"></img>
                    <div className="bg-overlay"></div>
                    <form >
                        <div class="form-content">
                            <img src="img/assets/spoon.png" alt="login-icon"/><p className="title">welcome to Resto Dine</p>
                            <div class="form-group">
                                <label for="username">Email</label>
                                <input class="form-control" formcontrolname="email" id="email" name="email" type="email" ng-reflect-name="email"/>
                            </div>
                            <div class="form-group">
                                <label for="password">Password</label>
                                <input class="form-control" formcontrolname="password" id="password" name="password" type="password" ng-reflect-name="password"/>
                            </div>
                            <div class="form-group">
                                <a class="forget-pass text-white" style={{textDecoration: "none"}} href=" ">Forgot password ?</a>
                            </div>
                            <button class="btn btn-submit btn-block text-uppercase text-white" type="submit">login</button>
                            <p class="or"><span></span>OR<span></span></p>
                            <button class="btn btn-login text-white btn-block">CREATE ACCOUNT</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer/>
        </React.Fragment>
    )
}

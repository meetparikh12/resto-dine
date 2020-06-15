import React, { Component } from 'react'
import Footer from '../components/Footer'
import './Login.css'
import { Link} from 'react-router-dom';
import axios from 'axios';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import { setUserInfo } from '../actions/actions';
import jwt_decode from 'jwt-decode';
import { toast } from 'react-toastify';
import setJwtToken from '../shared/securityUtils/setJwtToken';
import config from 'react-global-configuration';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            isBtnDisabled: false
        }
        this.formChangeHandler = this.formChangeHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }
    componentDidMount(){
        if(this.props.loggedInUser.userId){
            this.props.history.push('/');
        }
    }

    formChangeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    formSubmitHandler(e) {
        e.preventDefault();
        this.setState({
            isBtnDisabled: true
        })
        const loginUser = {
            email: this.state.email,
            password: this.state.password
        }
      
        axios.post(`${config.get('backend_url_users')}/login`, loginUser)
        .then((res)=> {
            const {token} = res.data;
            localStorage.setItem("jwt-token", token);
            setJwtToken(token);
            const decoded_token = jwt_decode(token);
            this.props.setUserInfo(decoded_token, this.props.history);
            toast.success('Logged In Successfully', {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});

        })
        .catch((err)=> {
            this.setState({
                isBtnDisabled: false
            })
            toast.error(err.response.data.message, {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});
        });        
    }
    render(){
        return (
            <React.Fragment>
                <div className="login">
                    <div className="form-wrapper">
                        <img className="bg-img" src="img/login/login.png" alt="login-img"></img>
                        <div className="bg-overlay"></div>
                        <form onSubmit={this.formSubmitHandler}>
                            <div className="form-content">
                                <img src="img/assets/spoon.png" alt="login-icon"/><p className="title">welcome to Resto Dine</p>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input className="form-control" required formcontrolname="email" onChange={this.formChangeHandler} id="email" name="email" type="email" value={this.state.email}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input className="form-control" required formcontrolname="password" onChange={this.formChangeHandler} id="password" name="password" type="password" value={this.state.password}/>
                                </div>
                                <div className="form-group">
                                    <p className="forget-pass text-white">Forgot Password?</p>
                                </div>
                                <button className="btn btn-submit btn-block text-uppercase text-white" disabled={this.state.isBtnDisabled} type="submit">Login</button>
                                <p className="or"><span></span>OR<span></span></p>
                                <Link to="/register" style={{textDecoration: "none"}}><button disabled={this.state.isBtnDisabled} className="btn btn-login text-uppercase text-white btn-block">Create Account</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}
Login.propTypes = {
    setUserInfo: PropTypes.func.isRequired,
    loggedInUser: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.userInfo
    }
}
const mapDispatchToProps = dispatchEvent => {
    return {
        setUserInfo: (userInfo, history) => {
            dispatchEvent(setUserInfo(userInfo))
            history.push('/');
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
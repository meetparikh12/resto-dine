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
// import config from 'react-global-configuration';

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
      
        axios.post('http://localhost:5000/api/users/login', loginUser)
        .then((res)=> {
            const {token} = res.data;
            localStorage.setItem("jwt-token", token);
            setJwtToken(token);
            const decoded_token = jwt_decode(token);
            this.props.setUserInfo(decoded_token, this.props.history);
            toast.success('Logged In Successfully', {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});

        })
        .catch((err)=> {
            console.log(err);
            
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
                            <div class="form-content">
                                <img src="img/assets/spoon.png" alt="login-icon"/><p className="title">welcome to Resto Dine</p>
                                <div class="form-group">
                                    <label for="username">Email</label>
                                    <input class="form-control" formcontrolname="email" onChange={this.formChangeHandler} id="email" name="email" type="email" value={this.state.email}/>
                                </div>
                                <div class="form-group">
                                    <label for="password">Password</label>
                                    <input class="form-control" formcontrolname="password" onChange={this.formChangeHandler} id="password" name="password" type="password" value={this.state.password}/>
                                </div>
                                <div class="form-group">
                                    <a class="forget-pass text-white" style={{textDecoration: "none"}} href=" ">Forgot password ?</a>
                                </div>
                                <button class="btn btn-submit btn-block text-uppercase text-white" type="submit">Login</button>
                                <p class="or"><span></span>OR<span></span></p>
                                <Link to="/register"><button class="btn btn-login text-white btn-block">CREATE ACCOUNT</button></Link>
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
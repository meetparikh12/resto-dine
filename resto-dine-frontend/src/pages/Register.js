import React, { Component } from 'react'
import Footer from '../components/Footer'
import './Login.css'
import { Link} from 'react-router-dom';
import axios from 'axios';
import { connect} from 'react-redux';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import config from 'react-global-configuration';
import './Login.css';

class Register extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            email:"",
            name:"",
            password:"",
            confirmPassword:"",
            isBtnDisabled: false
        }
        this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }

    componentDidMount() {
        if (this.props.loggedInUser.userId) {
            this.props.history.push("/");
        }
    }

    fieldChangeHandler(e){
        this.setState({
        [e.target.name] : e.target.value
        })
    }

    formSubmitHandler(e){
        e.preventDefault();

        this.setState({
            isBtnDisabled: true
        })
        const newUser = {
            "name": this.state.name,
            "email": this.state.email,
            "password": this.state.password,
            "confirmPassword": this.state.confirmPassword
        }
        axios.post(`${config.get('backend_url_users')}/register`, newUser)
        .then((res)=> {
            toast.success(res.data.message, {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});
            this.props.history.push('/login');
        })
        .catch((err)=> {
            this.setState({
                isBtnDisabled: false
            })
            toast.error(err.response.data.message[0].msg || err.response.data.message, 
                {position: toast.POSITION.BOTTOM_RIGHT, autoClose: 2000});
        });
    }

    render(){
        return (
            <React.Fragment>
                <div className="register_page">
                    <div className="form-wrapper">
                        <img className="bg-img" src="img/login/login.png" alt="login-img"></img>
                        <div className="bg-overlay"></div>
                        <form onSubmit={this.formSubmitHandler}>
                            <div className="form-content">
                                <img src="img/assets/spoon.png" alt="login-icon"/><p className="title">welcome to Resto Dine</p>
                                 <div className="form-group">
                                    <label htmlFor="username">Name</label>
                                    <input className="form-control" formcontrolname="username" onChange={this.fieldChangeHandler} id="name" name="name" type="text" value={this.state.name}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input className="form-control" formcontrolname="email" onChange={this.fieldChangeHandler} id="email" name="email" type="email" value={this.state.email}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input className="form-control" formcontrolname="password" onChange={this.fieldChangeHandler} id="password" name="password" type="password" value={this.state.password}/>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="confirmPassword">Confirm Password</label>
                                    <input className="form-control" formcontrolname="confirmPassword" onChange={this.fieldChangeHandler} id="confirmPassword" name="confirmPassword" type="password" value={this.state.confirmPassword}/>
                                </div>
                                <button className="btn btn-submit btn-block text-uppercase text-white" type="submit">Create Account</button>
                                <p className="or"><span></span>OR<span></span></p>
                                <p className="text-center text-white">Already have an account?</p>
                                
                                <Link to="/login" style={{textDecoration: "none"}}><button className="btn btn-login text-uppercase text-white btn-block">Login</button></Link>
                            </div>
                        </form>
                    </div>
                </div>
                <Footer/>
            </React.Fragment>
        )
    }
}
Register.propTypes = {
    loggedInUser: PropTypes.object.isRequired

}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.userInfo
    }
}

export default connect(mapStateToProps, null)(Register);
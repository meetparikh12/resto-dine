import React, { Component } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import './Reservation.css'
import { toast } from 'react-toastify'
import { connect } from 'react-redux'
import config from 'react-global-configuration'

class Reservation extends Component {

    constructor(props){
        super(props)
        this.state = {
            people: "1",
            date: "",
            time: "",
            name: "",
            phone: "",
            email: ""
        }

        this.fieldChangeHandler = this.fieldChangeHandler.bind(this);
        this.formSubmitHandler = this.formSubmitHandler.bind(this);
    }

    fieldChangeHandler(e) {
        this.setState({
            [e.target.name] : e.target.value
        });
    }

    formSubmitHandler(e){
        e.preventDefault();
        if(!this.props.loggedInUser.userId){
            toast.info('You need to login first in order to book table', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        } else {
            const reservation = {
                "name": this.state.name,
                "phone": this.state.phone,
                "email": this.state.email,
                "date": this.state.date,
                "time": this.state.time,
                "people": this.state.people
            }
            axios.patch(`${config.get('backend_url_users')}/reservation`, reservation)
            .then((res)=> {
                toast.success(res.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                })
            })
            .catch((err)=> {
                toast.error(err.response.data.message, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                    autoClose: 2000
                })
            })
            
        }
    }

    render(){
        return (
            <div className="booking_table">
            <br/>
                <div className="bg-img-reservation">
                    <div className="section-header reservation_info text-center text-white mb-3">
                        <span className="reservation_title">Book Your Table</span>
                        <div className="asset">
                            <span></span>
                            <img src="/img/assets/spoon.png" alt="Spoon icon"/>
                            <span></span>
                        </div>
                        <p className="sub-title text-center">Resto Dine provides table reservation in advance so that customer don't have to wait anymore.</p>
                    </div>
                </div>
                <div className="container">
                    <div className="row mt-4 mb-3">
                        <div className="col-md-12">
                            <div className="table_title text-center">
                                <h2 className="text-center"><i>Reservation</i></h2>
                            </div>
                        </div>
                    </div>
                    <form className="mb-5" onSubmit={this.formSubmitHandler}>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <span className="field-name" >How Many People ?</span>
                                    <div className="form-field mt-2">
                                        <select name="people" required onChange={this.fieldChangeHandler} className="form-control">
                                            <option value="1">1 people</option>
                                            <option value="2">2 people</option>
                                            <option value="3">3 people</option>
                                            <option value="4">4 people</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">  
                                <div className="form-group">
                                    <span className="field-name">Date :</span>
                                    <div className="form-field mt-2">
                                        <input type="date" required onChange={this.fieldChangeHandler} name="date" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <span className="field-name">Time :</span>
                                    <div className="form-field mt-2">
                                        <input type="time" required onChange={this.fieldChangeHandler} name="time" className="form-control"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <div className="form-group">
                                    <span className="field-name">Name :</span>
                                    <div className="form-field mt-2">
                                        <input type="text" required onChange={this.fieldChangeHandler} name="name" className="form-control" placeholder="Your full name"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <span className="field-name">Email :</span>
                                    <div className="form-field mt-2">
                                    <input type="email" required onChange={this.fieldChangeHandler} name="email" className="form-control" placeholder="Your email address"/>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="form-group">
                                    <span className="field-name">Mobile Number :</span>
                                    <div className="form-field mt-2">
                                    <input type="tel" required onChange={this.fieldChangeHandler} name="phone" pattern="[0-9]{10}" className="form-control" placeholder="Your mobile number"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group btn-field">
                                    <input type="submit" value="Book Table" className="btn-style"/>
                                </div>
                            </div>
                        </div>
                    </form>    
                </div>
            </div>
        )
    }
}
Reservation.propTypes = {
    loggedInUser: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.userInfo
    }
}

export default connect(mapStateToProps, null)(Reservation);
import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux';
import Card from '../shared/components/UIElements/Card';
import { toast } from 'react-toastify';
// import config from 'react-global-configuration';
import './BookingList.css';
import Footer from '../components/Footer';

class BookingList extends Component {
    constructor(props){
        super(props);
        this.state = {
            date: "",
            time: "",
            status: "",
            reservationId: "",
            noOfPeople: "",
            isLoaded: false
        }
    }
    componentDidMount(){
        const {userId} = this.props.loggedInUser;
        axios.get('http://localhost:5000/api/users/reservation/' + userId)
        .then((res)=> {
            this.setState({
                date: res.data.user.reservation.date,
                time: res.data.user.reservation.time,
                status: res.data.user.reservation.status,
                reservationId: res.data.user.reservation._id,
                noOfPeople: res.data.user.reservation.people,
                isLoaded: true
            })
        })
        .catch((err)=> {
            toast.error(err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
            this.setState({
                isLoaded: true
            })
        })
    }

    render(){

        if(!this.state.isLoaded){
            return <div className="text-center mb-5" style={{margin: "20% auto"}}>
                    <h1>Loading...</h1>
                </div>
        } else if(this.state.reservationId.trim().length === 0) {
            return (
                <div className="container"> 
                    <div className="row">
                    <div className="col-md-12">
                    <Card style={{width: "max-content", margin:"30% auto"}}>
                        <h4>No past booking in your account.</h4>
                    </Card>  
                    </div>
                    </div>
                </div> 
            )
        } else {
            return (
                <React.Fragment>
                    <div className="booking_list">
                        <div className="booking_list_banner mb-5">
                            <div className="bg-img">
                                <div className="overlay-bg"></div>
                                <div className="overlay-content">
                                    <h2 className="primary_heading">Booking List</h2>
                                    <h3 className="secondary_heading">Past Booking</h3>
                                </div>
                            </div>
                        </div>
                        <div className="container mb-5">
                            <table className="table table-striped table-res">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Booking ID</th>
                                    <th>Date & Time</th>
                                    <th>No. Of Persons</th>
                                    <th className="text-center">Status</th>
                                </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>{this.state.reservationId}</td>
                                        <td>{this.state.date} | {this.state.time}</td>
                                        <td>{this.state.noOfPeople}</td>
                                        <td className="text-center text-danger">{this.state.status}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Footer/>
                </React.Fragment>
            )
        }
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.userInfo
    }
}
export default connect(mapStateToProps, null)(BookingList);


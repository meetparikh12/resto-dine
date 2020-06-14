import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Card from '../shared/components/UIElements/Card';
import { toast } from 'react-toastify';
// import config from 'react-global-configuration';
import './OrderList.css';
import Footer from '../components/Footer';

class OrderList extends Component {
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            isLoaded: false
        }
    }
    componentDidMount(){
        const {userId} = this.props.loggedInUser;
        axios.get('http://localhost:5000/api/orders/user/' + userId)
        .then((res)=> {
            this.setState({
                orders: res.data.orders,
                isLoaded: true
            })
        })
        .catch((err)=> {
            toast.error(err.response.data.message, {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 2000
            })
        })
    }

    render(){

        if(!this.state.isLoaded){
            return <div className="text-center mb-5" style={{margin: "20% auto"}}>
                    <h1>Loading...</h1>
                </div>
        } else if(this.state.orders.length === 0) {
            return (
                <div className="container"> 
                    <div className="row">
                    <div className="col-md-12">
                    <Card style={{width: "max-content", margin:"5% auto"}}>
                        <h4>Sorry, You have no orders yet.</h4>
                        <Link to="/">Go Shopping</Link>
                    </Card>  
                    </div>
                    </div>
                </div> 
            )
        } else {
            return (
                <React.Fragment>
                    <div className="order_list">
                        <div className="order_list_banner mb-5">
                            <div className="bg-img">
                                <div className="overlay-bg"></div>
                                <div className="overlay-content">
                                    <h2 className="primary_heading">Order List</h2>
                                    <h3 className="secondary_heading">Past Orders</h3>
                                </div>
                            </div>
                        </div>
                        <div className="container mb-5">
                            <table className="table table-hover table-res">
                                <thead className="thead-dark">
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Total</th>
                                    <th>Paid</th>
                                    <th className="text-center">Delivered</th>
                                    <th className="text-center">Action</th>
                                </tr>
                                </thead>
                                <tbody>
                                {this.state.orders.map((order)=> <tr key={order._id}>
                                    <td>{order._id}</td>
                                    <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                    <td>{order.totalPrice}</td>
                                    <td>{order.isPaid === true ? <p>Yes</p> : <p>No</p> }</td>
                                    <td className="text-center">{order.isDelivered === true ? <p>Yes</p> : <p>No</p>}</td>
                                    <td className="text-center">
                                    <Link to={`/order/${order._id}`} className="btn btn-outline-info mr-1">Details</Link>
                                    </td>
                                </tr>)}
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
export default connect(mapStateToProps, null)(OrderList);


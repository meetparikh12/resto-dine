import React from 'react'
import './Reservation.css'
export default function Reservation() {
    return (
        <div className="booking_table">
        <br/>
            <div className="container">
                    <div className="section-header mb-5">
                        <h2>Book Your Table</h2>
                        <div className="asset">
                            <span></span>
                            <img src="/img/assets/spoon.png" alt="Spoon icon"/>
                            <span></span>
                        </div>
                    </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="table_title text-center">
                                    <span class="title text-center"><i>Reservation</i></span>
                                    <h3 class="book-table-title text-center text-uppercase m-b-35 m-t-2">Book table</h3>
                                </div>
                                <form className="probootstrap-form">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div className="row">
                                            <div className="form-group">
                                                <label for="people">How Many People</label>
                                                <div className="form-field">
                                                <select
                                                    name="people"
                                                    className="form-control"
                                                >
                                                    <option value="#">1 people</option>
                                                    <option value="#">2 people</option>
                                                    <option value="#">3 people</option>
                                                    <option value="#">4+ people</option>
                                                </select>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="row">

                                            <div className="form-group">
                                                <label for="date">Date</label>
                                                <div className="form-field">
                                                <input
                                                    type="date"
                                                    name="date"
                                                    className="form-control"
                                                ></input>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="row">
                                            <div className="form-group">
                                                <label for="time">Time</label>
                                                <div className="form-field">
                                                <input
                                                    type="time"
                                                    name="time"
                                                    className="form-control"
                                                ></input>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="row">
                                            <div className="form-group">
                                                <label for="name">Name</label>
                                                <div className="form-field">
                                                <input
                                                    type="text"
                                                    name="name"
                                                    className="form-control"
                                                    placeholder="Your full name"
                                                ></input>
                                                </div>
                                            </div>
                                            </div>
                                        
                                            <div className="row">
                                            <div className="form-group">
                                                <label for="email">Email</label>
                                                <div className="form-field">
                                                <input
                                                    type="text"
                                                    name="email"
                                                    className="form-control"
                                                    placeholder="Your email address"
                                                ></input>
                                                </div>
                                            </div>
                                            </div>
                                            <div className="row">
                                            <div className="form-group">
                                                <label for="phone">Phone</label>
                                                <div className="form-field">
                                                <input
                                                    type="text"
                                                    name="phone"
                                                    className="form-control"
                                                    placeholder="Your phone"
                                                ></input>
                                                </div>
                                            </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>    
                            </div>
                            <div className="col-md-6">
                                <img src ="https://previews.customer.envatousercontent.com/files/220083862/Inline%20Preview%20Image.jpg"/>
                            </div>
                        </div>
                    </div>
                </div>
    )
}

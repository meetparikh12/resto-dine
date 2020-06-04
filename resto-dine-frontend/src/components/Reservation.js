import React from 'react'
import './Reservation.css'
export default function Reservation() {
    return (
        <div className="booking_table">
        <br/>
            <div className="container">
                <div className="section-header mb-3">
                    <h2>Book Your Table</h2>
                    <div className="asset">
                        <span></span>
                        <img src="/img/assets/spoon.png" alt="Spoon icon"/>
                        <span></span>
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-12">
                        <div className="table_title text-center">
                            <h2 className="text-center"><i>Reservation</i></h2>
                        </div>
                    </div>
                </div>
                <form className="mb-5">
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <span className="field-name" >How Many People ?</span>
                                <div className="form-field mt-2">
                                    <select name="people" className="form-control">
                                        <option value="#">1 people</option>
                                        <option value="#">2 people</option>
                                        <option value="#">3 people</option>
                                        <option value="#">4+ people</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">  
                            <div className="form-group">
                                <span className="field-name">Date :</span>
                                <div className="form-field mt-2">
                                    <input type="date" name="date" className="form-control"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <span className="field-name">Time :</span>
                                <div className="form-field mt-2">
                                    <input type="time" name="time" className="form-control"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-4">
                            <div className="form-group">
                                <span className="field-name">Name :</span>
                                <div className="form-field mt-2">
                                    <input type="text" name="name" className="form-control" placeholder="Your full name"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <span className="field-name">Email :</span>
                                <div className="form-field mt-2">
                                <input type="text" name="email" className="form-control" placeholder="Your email address"/>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="form-group">
                                <span className="field-name">Phone :</span>
                                <div className="form-field mt-2">
                                <input type="text" name="phone" className="form-control" placeholder="Your phone"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>    
            </div>
        </div>
    )
}

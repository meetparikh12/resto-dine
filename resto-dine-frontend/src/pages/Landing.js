import React, { Component } from 'react'
import Banner from '../components/Banner'
import Specialities from '../components/Specialities'
import Menu from '../components/Menu'
import Services from '../components/Services'
import Reservation from '../components/Reservation'
import AboutUs from '../components/AboutUs'
import ContactUs from '../components/ContactUs'

export default class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <Banner/>
                <Specialities/>
                <Menu/>
                <Services/>
                <Reservation/>
                <AboutUs/>
                <ContactUs/>
            </div>
        )
    }
}

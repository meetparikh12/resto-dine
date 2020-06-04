import React, { Component } from 'react'
import Banner from '../components/Banner'
import Specialities from '../components/Specialities'
import Menu from '../components/Menu'
import Services from '../components/Services'
import Reservation from '../components/Reservation'

export default class Landing extends Component {
    render() {
        return (
            <div className="landing">
                <Banner/>
                <Specialities/>
                <Menu/>
                <Services/>
                <Reservation/>
            </div>
        )
    }
}

import React from 'react'
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({component: Component, loggedInUser, ...otherProps}) {
    return (
        <Route {...otherProps} render={
            (props) => {
                if(loggedInUser.userId)
                    return <Component {...props} />
                else {
                    return <Redirect to="/"/>
                }
            }
        }/>
    )
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.user.userInfo
    }
}

export default connect(mapStateToProps, null)(ProtectedRoute);
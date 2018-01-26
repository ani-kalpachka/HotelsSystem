import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

class Header extends Component {
    render() {
        const { loggedIn, onLogout } = this.props;

        return (
            <header>
                <h1>Hotel System</h1>
                <NavLink exact to="/" activeClassName="active">Home</NavLink>
                {loggedIn && <NavLink to="/create" activeClassName="active">Create Hotel</NavLink>}
                {loggedIn && <a href="javascript:void(0)" onClick={onLogout}>Logout</a>}
                {!loggedIn && <NavLink to="/login" activeClassName="active">Login</NavLink>}
                {!loggedIn && <NavLink to="/register" activeClassName="active">Register</NavLink>}
            </header>
        );
    }
}

export default Header;
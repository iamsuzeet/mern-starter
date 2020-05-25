import React from 'react';
import logo from '../img/logo-white.png';
import { Link } from 'react-router-dom';

import { signOutStartAsync } from './../redux/user/user-action';
import { connect } from 'react-redux';

const Header = ({ currentUser, signOutStartAsync }) => {
  return (
    <header className="header">
      <nav className="nav nav--tours">
        <Link to="/" className="nav__el">
          All tours
        </Link>
      </nav>
      <div className="header__logo">
        <img src={logo} alt="Natours logo" />
      </div>
      <nav className="nav nav--user">
        {currentUser ? (
          <>
            {' '}
            <button
              onClick={signOutStartAsync}
              className="nav__el nav__el--logout"
            >
              Logout
            </button>{' '}
            <Link className="nav__el" to="/me">
              <img
                src={`/img/users/${currentUser.photo}`}
                alt={`pic of ${currentUser.name}`}
                className="nav__user-img"
              />
              <span>{currentUser.name.split(' ')[0]}</span>
            </Link>{' '}
          </>
        ) : (
          <>
            <Link to="/login" className="nav__el">
              Log in
            </Link>
            <Link className="nav__el nav__el--cta" to="/signup">
              Signup
            </Link>
          </>
        )}
      </nav>
    </header>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  signOutStartAsync: () => dispatch(signOutStartAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);

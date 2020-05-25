import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Header from './pages/Header';
import Footer from './pages/Footer';
import Tours from './pages/Tours';
import SingleTour from './pages/SingleTour';
import Error404 from './pages/Error404';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Account from './pages/Account';
import BookedTour from './pages/BookedTour';

import { toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';
import { checkUserLoggedInAsync } from './redux/user/user-action';

toast.configure({
  autoClose: 4000,
  draggable: false,
  style: {
    fontSize: '18px',
    width: '400px',
  },
  position: 'top-center',
});

class App extends React.Component {
  componentDidMount() {
    const { checkUserLoggedInAsync } = this.props;
    checkUserLoggedInAsync();
  }

  render() {
    document.title = 'Natours | Exciting tours for adventurous people';
    const { currentUser } = this.props;
    return (
      <>
        <Header currentUser={currentUser} />
        <Switch>
          <Route path="/tour/:slug" component={SingleTour} />
          <Route path="/not-found" component={Error404} />

          <Route
            path="/login"
            render={(props) =>
              currentUser ? <Redirect to="/" /> : <Login {...props} />
            }
          />
          <Route
            path="/signup"
            render={(props) =>
              currentUser ? <Redirect to="/" /> : <Signup {...props} />
            }
          />
          <Route
            path="/me"
            render={(props) =>
              !currentUser ? <Login {...props} /> : <Account {...props} />
            }
          />
          <Route
            path="/my-booking"
            render={(props) =>
              !currentUser ? <Login {...props} /> : <BookedTour {...props} />
            }
          />
          <Route exact path="/" component={Tours} />
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

const mapDispatchToProps = (dispatch) => ({
  checkUserLoggedInAsync: () => dispatch(checkUserLoggedInAsync()),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);

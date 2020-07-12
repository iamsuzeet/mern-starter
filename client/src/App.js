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

import ProtectedRoute from './components/ProtectedRoute';

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
  async componentDidMount() {
    const { checkUserLoggedInAsync } = this.props;
    await checkUserLoggedInAsync();
  }

  render() {
    document.title = 'Natours | Exciting tours for adventurous people';

    return (
      <>
        <Header />
        <Switch>
          <Route path="/tour/:slug" component={SingleTour} />
          <Route path="/not-found" component={Error404} />

          <ProtectedRoute
            path="/me"
            component={Login}
            mainComponent={Account}
            redirectLocation="/login"
          />

          <ProtectedRoute
            path="/my-booking"
            component={Login}
            mainComponent={BookedTour}
            redirectLocation="/login"
          />

          <ProtectedRoute path="/login" component={Login} />
          <ProtectedRoute path="/signup" component={Signup} />
          <Route exact path="/" component={Tours} />
          <Redirect to="/not-found" />
        </Switch>
        <Footer />
      </>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  checkUserLoggedInAsync: () => dispatch(checkUserLoggedInAsync()),
});

export default connect(null, mapDispatchToProps)(App);

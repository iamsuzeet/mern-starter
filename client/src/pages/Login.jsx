import React from 'react';
import FormGroup from '../components/FormGroup';
import FormButton from '../components/FormButton';

import { connect } from 'react-redux';
import { signInStartAsync } from './../redux/user/user-action';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.toaster = null;
  }

  componentDidMount() {
    if (this.props.match.url === '/me' && !this.props.currentUser)
      toast.error('Please Login to get access', { autoClose: 2000 });
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { signInStartAsync } = this.props;
    const { email, password } = this.state;
    signInStartAsync(email, password);
  };

  onInputChange = (e) => {
    const { value, type } = e.target;

    this.setState({ [type]: value });
  };

  formTemplate = () => {
    return (
      <main className="main">
        {this.props.mat}
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Log into your account</h2>
          <form className="form form-login" onSubmit={this.handleSubmit}>
            <FormGroup
              className="form__group"
              type="email"
              htmlFor="email"
              placeholder="you@example.com"
              label="Email address"
              inputChange={this.onInputChange}
            />
            <FormGroup
              className="form__group ma-bt-md"
              type="password"
              htmlFor="password"
              placeholder="********"
              minlength="8"
              label="Password"
              inputChange={this.onInputChange}
            />
            <FormButton
              className="form__group"
              btnClass="btn btn--green"
              buttonText="Login"
            />
          </form>
        </div>
      </main>
    );
  };

  render() {
    const { isFetching } = this.props;
    document.title = 'Natours | Login';
    if (!isFetching) return <Spinner />;
    return this.formTemplate();
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  isFetching: state.user.isFetching,
});

const mapDispatchToProps = (dispatch) => ({
  signInStartAsync: (email, password) =>
    dispatch(signInStartAsync(email, password)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

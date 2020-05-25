import React from 'react';
import FormGroup from '../components/FormGroup';
import FormButton from '../components/FormButton';

import { connect } from 'react-redux';
import { signUpStartAsync } from './../redux/user/user-action';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      passwordConfirm: '',
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { signUpStartAsync } = this.props;
    const { email, password, name, passwordConfirm } = this.state;
    signUpStartAsync(email, password, name, passwordConfirm);
  };

  onInputChange = (e) => {
    const { value, name } = e.target;

    this.setState({ [name]: value });
  };

  render() {
    document.title = 'Natours | Signup';
    return (
      <main className="main">
        <div className="login-form">
          <h2 className="heading-secondary ma-bt-lg">Signup to get started!</h2>
          <form className="form form-login" onSubmit={this.handleSubmit}>
            <FormGroup
              className="form__group"
              type="text"
              htmlFor="name"
              placeholder="John Doe"
              label="Name"
              inputChange={this.onInputChange}
              name="name"
            />
            <FormGroup
              className="form__group"
              type="email"
              htmlFor="email"
              placeholder="you@example.com"
              label="Email address"
              inputChange={this.onInputChange}
              name="email"
            />
            <FormGroup
              className="form__group ma-bt-md"
              type="password"
              htmlFor="password"
              placeholder="********"
              minlength="8"
              label="Password"
              inputChange={this.onInputChange}
              name="password"
            />
            <FormGroup
              className="form__group ma-bt-md"
              type="password"
              htmlFor="password"
              placeholder="********"
              minlength="8"
              label="Confirm Password"
              inputChange={this.onInputChange}
              name="passwordConfirm"
            />
            <FormButton
              className="form__group"
              btnClass="btn btn--green"
              buttonText="Sign up"
            />
          </form>
        </div>
      </main>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  signUpStartAsync: (email, password, name, passwordConfirm) =>
    dispatch(signUpStartAsync(email, password, name, passwordConfirm)),
});

export default connect(null, mapDispatchToProps)(Signup);

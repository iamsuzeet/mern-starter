import React, { Component } from 'react';
import { connect } from 'react-redux';
import SideNavItem from './../components/SideNavItem';
import FormGroup from '../components/FormGroup';
import FormButton from '../components/FormButton';
import { updateUserDataAsync } from './../redux/user/user-action';
import Spinner from '../components/Spinner';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.currentUser.name,
      email: this.props.currentUser.email,
      photo: this.props.currentUser.photo,
      passwordCurrent: '',
      password: '',
      passwordConfirm: '',
    };
    this.displayInputRef = React.createRef();
    this.displayImageRef = React.createRef();
  }

  onInputChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  showPic = (e) => {
    const { files } = this.displayInputRef.current;
    if (files && files[0]) {
      let reader = new FileReader();

      reader.onload = (e) => {
        this.displayImageRef.current.setAttribute('src', e.target.result);
      };

      reader.readAsDataURL(files[0]);
      // this.setState({
      //   photo: e.target.value,
      // });
    }
  };

  updateUserData = (e) => {
    e.preventDefault();
    const { name, email } = this.state;
    const form = new FormData();
    form.append('name', name);
    form.append('email', email);
    form.append('photo', this.displayInputRef.current.files[0]);

    // this.props.updateUserDataAsync({ name, email, photo }, 'Data');
    this.props.updateUserDataAsync(form, 'Data');
  };

  updatePassword = async (e) => {
    e.preventDefault();
    const { passwordCurrent, password, passwordConfirm } = this.state;
    await this.props.updateUserDataAsync(
      { passwordCurrent, password, passwordConfirm },
      'Password'
    );
    this.setState({
      ...this.state,
      password: '',
      passwordConfirm: '',
      passwordCurrent: '',
    });
  };

  render() {
    const { currentUser, isLoading } = this.props;
    const {
      name,
      email,
      passwordCurrent,
      password,
      passwordConfirm,
    } = this.state;

    if (isLoading) return <Spinner />;

    return (
      !!currentUser && (
        <main className="main">
          <div className="user-view">
            <nav className="user-view__menu">
              <ul className="side-nav">
                <SideNavItem
                  link="#"
                  text="Settings"
                  icon="settings"
                  active={true}
                />
                <SideNavItem
                  link="/my-booking"
                  text="My bookings"
                  icon="briefcase"
                />
                <SideNavItem link="#" text="My reviews" icon="star" />
                <SideNavItem link="#" text="Billing" icon="credit-card" />
              </ul>
              {currentUser.role === 'admin' && (
                <div className="admin-nav">
                  <h5 className="admin-nav__heading">Admin</h5>
                  <ul className="side-nav">
                    <SideNavItem link="#" text="Manage Tour" icon="map" />
                    <SideNavItem link="#" text="Manage users" icon="users" />
                    <SideNavItem link="#" text="Manage reviews" icon="star" />
                    <SideNavItem
                      link="#"
                      text="Manage bookings"
                      icon="credit-card"
                    />
                  </ul>
                </div>
              )}
            </nav>

            <div className="user-view__content">
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">
                  Your account settings
                </h2>
                <form
                  onSubmit={this.updateUserData}
                  className="form form-user-data"
                >
                  <FormGroup
                    className="form__group"
                    htmlFor="name"
                    label="Name"
                    type="text"
                    value={name}
                    inputChange={this.onInputChange}
                    name="name"
                  />
                  <FormGroup
                    className="form__group ma-bt-md"
                    htmlFor="email"
                    label="Email address"
                    type="email"
                    value={email}
                    inputChange={this.onInputChange}
                    name="email"
                  />
                  <div className="form__group form__photo-upload">
                    <img
                      src={`/img/users/${currentUser.photo}`}
                      alt="User Pics"
                      className="form__user-photo"
                      ref={this.displayImageRef}
                    />
                    <input
                      type="file"
                      accept="image/*"
                      name="photo"
                      className="form__upload"
                      id="photo"
                      onChange={this.showPic}
                      ref={this.displayInputRef}
                    />
                    <label htmlFor="photo">Choose new photo</label>
                  </div>
                  <FormButton
                    className="form__group right"
                    btnClass="btn btn--small btn--green"
                    buttonText="Save settings"
                  />
                </form>
              </div>
              <div className="line">&nbsp;</div>
              <div className="user-view__form-container">
                <h2 className="heading-secondary ma-bt-md">Password change</h2>
                <form
                  onSubmit={this.updatePassword}
                  className="form form-user-settings"
                >
                  <FormGroup
                    className="form__group"
                    htmlFor="password-current"
                    label="Current password"
                    type="password"
                    placeholder="********"
                    inputChange={this.onInputChange}
                    name="passwordCurrent"
                    minlength="8"
                    value={passwordCurrent}
                  />

                  <FormGroup
                    className="form__group"
                    htmlFor="password"
                    label="New password"
                    type="password"
                    placeholder="********"
                    inputChange={this.onInputChange}
                    name="password"
                    minlength="8"
                    value={password}
                  />

                  <FormGroup
                    className="form__group"
                    htmlFor="password-confirm"
                    label="Current password"
                    type="password"
                    placeholder="********"
                    inputChange={this.onInputChange}
                    name="passwordConfirm"
                    minlength="8"
                    value={passwordConfirm}
                  />

                  <FormButton
                    className="form__group right"
                    btnClass="btn btn--small btn--green"
                    buttonText="Save password"
                  />
                </form>
              </div>
            </div>
          </div>
        </main>
      )
    );
  }
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
  isLoading: state.user.isLoading,
});

const mapDispatchToProps = (dispatch) => ({
  updateUserDataAsync: (data, type) =>
    dispatch(updateUserDataAsync(data, type)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Account);

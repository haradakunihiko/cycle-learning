import React from 'react';
import Relay from 'react-relay';

import {browserHistory} from 'react-router';
import SignUpMutation from 'route/SignUpMutation';

import {Link} from 'react-router';
import {Checkbox} from 'react-icheck';


const SignUpComponent = ({ onClickSignup, signupEmail,signupPassword, setSignupEmail,setSignupPassword, signupEmailError}) => {
  return (

    <div className="middle-box text-center loginscreen   animated fadeInDown">
        <div>
            <div>

                <h1 className="logo-name">IN+</h1>

            </div>
            <h3>Register to IN+</h3>
            <p>Create account to see it in action.</p>
            <div className="m-t">
                <div className="form-group">
                    <input type="text" className="form-control" placeholder="Name" required="" />
                </div>
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Email" required="" value={signupEmail} onChange={setSignupEmail} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" required="" value={signupPassword} onChange={setSignupPassword} />
                </div>
                <div className="form-group">
                  <Checkbox checkboxClass="icheckbox_square-green" label="Agree the terms and policy"/>

                </div>
                <button className="btn btn-primary block full-width m-b" onClick={onClickSignup}>Register</button>

                <p className="text-muted text-center"><small>Already have an account?</small></p>
                <Link className="btn btn-sm btn-white btn-block" to="/login">Login</Link>
            </div>
            <p className="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>
        </div>
    </div>
  )
}


class SignUpComponentContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signupEmail: '',
      signupPassword: '',
      signupErrors: {},
    }
  }

  componentWillMount() {
    if (!this.props.viewer.anonymous) {
        this.props.router.replace('/');
    }
  }

  componentWillUpdate(nextProps) {
    if (!nextProps.viewer.anonymous) {
        nextProps.router.replace('/');
    }
  }

  handleSignup(e) {
    e.preventDefault();
    this.props.relay.commitUpdate(new SignUpMutation({
      viewer: this.props.viewer,
      email: this.state.signupEmail,
      password: this.state.signupPassword
    }), {
      onSuccess: (data) => {
        if (data.signUpMutation.errors.length > 0) {
          this.setState({
            signupErrors: data.signUpMutation.errors.reduce((acc, error) => {
              acc[error.key] = error.message;
              return acc;
            }, {})
          }); 
        } else {
          browserHistory.push(`/home`);
        }
      }
    });
  }

  render() {

    return (
      <SignUpComponent
        onClickSignup={::this.handleSignup}
        signupEmail={this.state.signupEmail}
        signupEmailError={this.state.signupErrors.email}
        signupPassword={this.state.signupPassword}
        setSignupEmail={(e) => this.setState({signupEmail: e.target.value})}
        setSignupPassword={(e) => this.setState({signupPassword: e.target.value})}
      />
    )
  }
}

export default Relay.createContainer(SignUpComponentContainer, {
  fragments: {
    viewer: () => {
      return Relay.QL`
        fragment on Viewer {
          anonymous
        }
      `;
    }
  }
});

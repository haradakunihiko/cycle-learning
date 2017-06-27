import React from 'react';
import Relay from 'react-relay';

import {browserHistory} from 'react-router';

import SignInMutation from 'route/SignInMutation';

import {Link} from 'react-router';

const LogInComponent = ({ onClickSignin,signinEmail,signinPassword,setSigninEmail,setSigninPassword, signinEmailError}) => {
  return (

    <div className="middle-box text-center loginscreen animated fadeInDown">
        <div>
            <div>

                <h1 className="logo-name">IN+</h1>

            </div>
            <h3>Welcome to IN+</h3>
            <p>Perfectly designed and precisely prepared admin theme with over 50 pages with extra new web app views.
            </p>
            <p>Login in. To see it in action.</p>
            <div className="m-t" >
                <div className="form-group">
                    <input type="email" className="form-control" placeholder="Username" required="" value={signinEmail} onChange={setSigninEmail} />
                </div>
                <div className="form-group">
                    <input type="password" className="form-control" placeholder="Password" required="" value={signinPassword} onChange={setSigninPassword} />
                </div>
                <button className="btn btn-primary block full-width m-b" onClick={onClickSignin}>Login</button>

                <a href="#"><small>Forgot password?</small></a>
                <p className="text-muted text-center"><small>Do not have an account?</small></p>
                <Link className="btn btn-sm btn-white btn-block" to="/signup">Create an account</Link>
            </div>
            <p className="m-t"> <small>Inspinia we app framework base on Bootstrap 3 &copy; 2014</small> </p>
        </div>
    </div>
  )
}


class LogInComponentContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      signinEmail: '',
      signinPassword: '',
      signupEmail: '',
      signupPassword: '',
      signinErrors: {},
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

  handleSignin(e) {
    e.preventDefault();
    // console.log('siginin');
    this.props.relay.commitUpdate(new SignInMutation({
      viewer: this.props.viewer,
      email: this.state.signinEmail,
      password: this.state.signinPassword
    }), {
      onSuccess: (data) => {
        if (data.signInMutation.errors.length > 0) {
          this.setState({
            signinErrors: data.signInMutation.errors.reduce((acc, error) => {
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
      <LogInComponent
        onClickSignin={::this.handleSignin}
        signinEmail={this.state.signinEmail}
        signinPassword={this.state.signinPassword}
        signinEmailError={this.state.signinErrors.email}
        setSigninEmail={(e) => {this.setState({signinEmail: e.target.value})}}
        setSigninPassword={(e) => this.setState({signinPassword: e.target.value})}
      />
    )
  }
}

export default Relay.createContainer(LogInComponentContainer, {
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

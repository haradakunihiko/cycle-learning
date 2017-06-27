import React from 'react'
import Relay from 'react-relay'

import SignOutMutation from 'route/SignOutMutation';
import {Link} from 'react-router';

class Root extends React.Component {

  constructor(props, context) {
    super(props, context);

  }

  handleSignout() {
    this.props.relay.commitUpdate(new SignOutMutation({
      viewer: this.props.viewer,
    }), {
      onSuccess: (data) => {
        // browserHistory.push(`/login`);
      }
    });
  }

  componentDidMount() {
    // need to load after dom is constructed.
    require('../lib/inspinia/js/inspinia');
  }

  render() {
    return (
    	<div id="wrapper">
        <nav className="navbar-default navbar-static-side" role="navigation">
            <div className="sidebar-collapse">
                <ul className="nav metismenu" id="side-menu">
                    <li className="nav-header">
                        <div className="dropdown profile-element">
                                <a data-toggle="dropdown" className="dropdown-toggle" href="#">
                                <span className="clear"> <span className="block m-t-xs"> <strong className="font-bold">David Williams</strong>
                                 </span> <span className="text-muted text-xs block">Art Director <b className="caret"></b></span> </span> </a>
                                <ul className="dropdown-menu animated fadeInRight m-t-xs">
                                    <li><a href="#">Logout</a></li>
                                </ul>
                        </div>
                        <div className="logo-element">
                            IN+
                        </div>
                    </li>
                    <li className="active">
                        <Link to="/training"><i className="fa fa-th-large"></i> <span className="nav-label">Training</span></Link>
                    </li>
                </ul>

            </div>
        </nav>


        <div id="page-wrapper" className="gray-bg">
            <div className="row border-bottom">
                <nav className="navbar navbar-static-top white-bg" role="navigation" style={{marginBottom: 0}}>
                    <div className="navbar-header">
                        <a className="navbar-minimalize minimalize-styl-2 btn btn-primary " href="#"><i className="fa fa-bars"></i> </a>
                        <form role="search" className="navbar-form-custom" method="post" action="#">
                            <div className="form-group">
                                <input type="text" placeholder="Search for something..." className="form-control" name="top-search" id="top-search" />
                            </div>
                        </form>
                    </div>
                    <ul className="nav navbar-top-links navbar-right">
                        <li>
                            <a href="#" onClick={::this.handleSignout}>
                                <i className="fa fa-sign-out"></i> Log out
                            </a>
                        </li>
                    </ul>

                </nav>
            </div>
            {this.props.children}
            <div className="footer">
                <div className="pull-right">
                    10GB of <strong>250GB</strong> Free.
                </div>
                <div>
                    <strong>Copyright</strong> Example Company &copy; 2014-2017
                </div>
            </div>
        </div>
    	</div>
    );
  }
}


export default Relay.createContainer(Root, {
  fragments: {
    viewer: (params) => {
        return Relay.QL`
          fragment on Viewer {
            anonymous
            user {
                name
                email
            }
          }
        `;
    },
  },
});

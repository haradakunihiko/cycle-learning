import React from 'react'
import Relay from 'react-relay'

class Auth extends React.Component {

    static childContextTypes = {
        viewer: React.PropTypes.object
    }

    getChildContext() {
        return {
            viewer: this.props.viewer
        }
    }

    componentWillMount() {
        if (this.props.routes.find(({ requireAuth }) => requireAuth) && this.props.viewer.anonymous) {
            this.props.router.replace('/login');
        }
    }
    componentWillUpdate(nextProps) {
        if (nextProps.routes.find(({ requireAuth }) => requireAuth) && nextProps.viewer.anonymous) {
            nextProps.router.replace('/login');
        }
    }
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )
    }
}

export default Relay.createContainer(Auth, {
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

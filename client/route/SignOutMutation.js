import Relay from 'react-relay';

class SignOutMutation extends Relay.Mutation {

	getMutation() {
		return Relay.QL`mutation Signup($input: SignOutMutationInput!){ signOutMutation }`
	}

	getVariables() {
		return {}
	}

	getFatQuery() {
		return Relay.QL`
			fragment on SignOutMutationPayload {
				viewer {
					user
					anonymous
				}
			}
		`
	}
	getConfigs() {
		return [{
			type: 'FIELDS_CHANGE',
			fieldIDs : {
				viewer: this.props.viewer.__dataID__
			}
		}]
	}
}

export default SignOutMutation;

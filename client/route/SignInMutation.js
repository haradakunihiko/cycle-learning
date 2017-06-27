import Relay from 'react-relay';

class SignInMutation extends Relay.Mutation {

	getMutation() {
		return Relay.QL`mutation Signin($input: SignInMutationInput!){ signInMutation }`
	}
	getVariables() {
		return {
			email: this.props.email,
			password: this.props.password,
		}
	}
	getFatQuery() {
		return Relay.QL`
			fragment on SignInMutationPayload {
				viewer {
					user
					anonymous
				}
				errors
			}
		`
	}
	getConfigs() {
		return [{
			type: 'FIELDS_CHANGE',
			fieldIDs : {
				viewer: this.props.viewer.__dataID__
			}
		},
		{
			type: 'REQUIRED_CHILDREN',
			children: [
				Relay.QL`
					fragment on SignInMutationPayload {
						errors {
							key
							message
						}
					}
				`
			]
		}]
	}
}

export default SignInMutation;

import Relay from 'react-relay';

class SignUpMutation extends Relay.Mutation {

	getMutation() {
		return Relay.QL`mutation Signup($input: SignUpMutationInput!){ signUpMutation }`
	}
	getVariables() {
		return {
			email: this.props.email,
			password: this.props.password,
		}
	}
	getFatQuery() {
		return Relay.QL`
			fragment on SignUpMutationPayload {
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
					fragment on SignUpMutationPayload {
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

export default SignUpMutation;

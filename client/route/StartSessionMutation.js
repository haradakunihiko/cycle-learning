import Relay from 'react-relay';

class StartSessionMutation extends Relay.Mutation {

	getMutation() {
		return Relay.QL`mutation CreateSession($input: CreateSessionMutationInput!){ createSessionMutation }`
	}
	getVariables() {
		return {
			namespaces: this.props.namespaces,
			bookLog: this.props.bookLog.ndbId
		}
	}
	getFatQuery() {
		return Relay.QL`
			fragment on CreateSessionMutationPayload {
				bookLog {
			      bookHistgram {
			        quizLogStats {
			          logs
			        }
			      }
				}
			}
		`
	}
	getConfigs() {
		return [{
			type: 'FIELDS_CHANGE',
			fieldIDs : {
				bookLog: this.props.bookLog.__dataID__
			}
		}, {
			type: 'REQUIRED_CHILDREN',
			children: [
				Relay.QL`
					fragment on CreateSessionMutationPayload {
						session {
							id
						}
					}
				`
			]
		}]
	}
}

export default StartSessionMutation;

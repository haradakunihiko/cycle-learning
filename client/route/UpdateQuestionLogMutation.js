import Relay from 'react-relay';

class UpdateQuestionLogMutation extends Relay.Mutation {

	getMutation() {
		return Relay.QL`mutation updateQuestionLog($input: UpdateQuestionLogMutationInput!){ updateQuestionLogMutation }`
	}
	getVariables() {
		return {
			questionLogId: this.props.questionLog.ndbId,
			selected: this.props.selected,
		}
	}
	getFatQuery() {
		return Relay.QL`
			fragment on UpdateQuestionLogMutationPayload {
				quizLog,
				session
			}
		`
	}
	getConfigs() {
		return [{
			type: 'FIELDS_CHANGE',
			fieldIDs : {
				quizLog: this.props.quizLog.__dataID__,
				session: this.props.session.__dataID__,
			}
		}]
	}
	getOptimisticResponse() {
		const { quizLog } = this.props;
		return {
			quizLog: {
				...quizLog,
				id: quizLog.__dataID__,
				questionLogs : quizLog.questionLogs.map((questionLog) => {
					if (questionLog.__dataID__ === this.props.questionLog.__dataID__) {
						return {
							...questionLog,
							selected: this.props.selected
						}
					} else {
						return questionLog
					}
				})
			}
		}
	}
}

export default UpdateQuestionLogMutation;

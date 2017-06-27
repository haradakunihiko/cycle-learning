import React from 'react';
import Relay from 'react-relay'
import marked  from 'marked';
import { Radio, RadioGroup } from 'react-icheck';

import QuizCard from './QuizCard'
import { show } from './QuizSolutionDialog'

import UpdateQuestionLogMutation from 'route/UpdateQuestionLogMutation';

const styles = {
	container : {
		margin: 10
	},
	content : {
		marginBottom: 10
	},
	radio : {
		minWidth: 22
	},
	options: {
		marginTop: 10
	},
	radiolabel : {
		paddingLeft: 0,
		display: 'flex'
	},
	radioLabelText : {
		marginLeft: 10
	},
	bar : {
	    display: 'flex',
	    justifyContent: 'flex-end',
	    overflow: 'hidden'
	}
}

class Quiz extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			expanded: false,
		};
	}

	componentDidMount() {
		const { quizLog } = this.props;
		$('.bar').sparkline(quizLog.quizLogs.filter(({score}) => score != null).map(({score}) => score || 0), {type: 'tristate', zeroBarColor: 'red'});
	}

	componentDidUpdate() {
		const { quizLog } = this.props;
		$('.bar').sparkline(quizLog.quizLogs.filter(({score}) => score != null).map(({score}) => score || 0), {type: 'tristate', zeroBarColor: 'red'});
	}

	handleToggle(event, toggle) {
		this.setState({
			expanded: toggle
		});
	};

	updateLog(questionLog, value) {
		const { quizLog, relay, session } = this.props;

		relay.commitUpdate(new UpdateQuestionLogMutation({
			session,
			quizLog,
			questionLog,
			selected: value
		}));
	}

	handleOnRadioChange(questionLog, value) {
		return () => {
			this.updateLog(questionLog, value)
		}
	}

	handleOnSolutionClick() {
		const { quizLog: {quiz, questionLogs} } = this.props;

		show(quiz, questionLogs, {dismissOnOk: true});
	}

	render() {
		const { correctCount, quizLog, bookLabel, quizCount, currentQuiz, onClickPrevious, onClickNext } = this.props;
		const { quiz, questionLogs } = quizLog

		const previousLogs = quizLog.quizLogs.filter(({ __dataID__ }) => {
			return quizLog.__dataID__ !== __dataID__;
		})
		const aggregatedScore = previousLogs.filter(({ score }) => {
			return score == 1;
		}).length;

		return (
			<div className="row">
				<QuizCard bookLabel={bookLabel} quiz={quiz} questionLogs={questionLogs} onClickRadio={::this.handleOnRadioChange} />
				<div className="col-md-3">
					<div className="ibox-content text-center">
						<h4>Session</h4>
						<div>正答数： {correctCount} / {quizCount}</div>
						<div>ページ：{currentQuiz + 1} / {quizCount}</div>
						<div className="text-right m-t-sm">
							<button className="btn" disabled={currentQuiz === 0} onClick={onClickPrevious}>Previous</button>
							<button className="btn m-l-sm" disabled={quizCount <= currentQuiz + 1} onClick={onClickNext}>Next</button>
						</div>
					</div>
					<div className="ibox-content text-center m-t">
						<h4>Quiz anazlysis</h4>
						<div>点数： {quizLog.score}</div>
						<div>過去の正答数： {aggregatedScore} / {previousLogs.length}</div>
						<div className="bar" style={styles.bar}></div>
						<div className="text-right m-t-sm"><button className="btn" onClick={::this.handleOnSolutionClick}>解説</button></div>
					</div>
				</div>
			</div>
		)
	}
}

export default Relay.createContainer(Quiz, {
 	fragments: {
		quizLog : () => Relay.QL`
			fragment on QuizLog {
				ndbId
				score
				quiz {
					text
					solution
				}
				questionLogs {
					ndbId
					selected
					question {
						ndbId
						text
						solution
						options {
							ndbId
							label
							value
						}
					}
				}
				quizLogs {
					score
				}				
			}
		`
	}
});

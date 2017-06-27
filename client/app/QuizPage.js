import React from 'react';
import Quiz from './Quiz';

import { Card, CardText, CardTitle, CardActions } from 'material-ui/Card';
import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation';
import FlatButton from 'material-ui/FlatButton';
import {RadioButton, RadioButtonGroup} from 'material-ui/RadioButton';
import Toggle from 'material-ui/Toggle';
import marked  from 'marked';

import FontIcon from 'material-ui/FontIcon';
import Page from 'app/Page';
import Relay from 'react-relay';

const styles = {
	container : {
		margin: 10,
		display: 'flex'
	},
	sessionSummaryCard : {
		marginBottom: 10,
		// minWidth: 300
	},
	quizSummaryCard : {
		// marginLeft: 10,
		// minWidth: 300
	},
	right : {
		marginLeft: 10,
		minWidth: 300,
		display: 'flex',
		flexDirection: 'column'
	}
}

class QuizPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			currentQuiz: 0,
		};
	}

	handleToggle(event, toggle) {
		this.setState({
			expanded: toggle
		});
	};

	handleNext() {
		this.setState({
			currentQuiz: this.state.currentQuiz + 1
		});
	};
	handlePrevious() {
		this.setState({
			currentQuiz: this.state.currentQuiz - 1
		});
	};

	render() {
		const { node: { correctCount, quizLogs: { edges }, bookLog: { id : bookLogId ,book: { id, label } } }, relay } = this.props;
		const quizLog = edges[this.state.currentQuiz].node

		return (
			<Page title='quiz' breadcrumbList={[{label: label, to: `/training/${bookLogId}`}, {label: 'quiz'}]}>
				<Quiz
					session={this.props.node}
					quizLog={quizLog}
					correctCount={correctCount}
					relay={relay}
					bookLabel={label}
					quizCount={edges.length}
					currentQuiz={this.state.currentQuiz}
					onClickPrevious={::this.handlePrevious}
					onClickNext={::this.handleNext}
				/>
			</Page>
		)
	}
}

export default Relay.createContainer(QuizPage, {
	initialVariables : {
		sessionId: null
	},
  fragments: {
    node: (params) => {
		return Relay.QL`
			fragment on Session {
				correctCount
				bookLog {
					id
					book {
						id
						label	
					}
				}
				quizLogs(first: 10) {
					edges {
						node {
							${Quiz.getFragment('quizLog')}
						}
					}
				}
			}
    	`
		},
  },
});

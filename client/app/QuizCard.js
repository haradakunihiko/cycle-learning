import React from 'react';
import { Radio, RadioGroup } from 'react-icheck';

const styles = {
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
	}
}

export default ({ bookLabel, quiz, questionLogs, onClickRadio}) => (
	<div className="col-md-9">
		<div className="ibox-content">
			<h2>{bookLabel}<span>by ___</span></h2>
			{quiz.text}
			{questionLogs.map((questionLog, index) => {
				const {selected, question: { ndbId: questionId, text, options}} = questionLog;
				return (
					<div key={index} className="form-horizontal">
						{text}
						<div style={styles.options}>
							{
								options.map((option) => {
									return (
										<div key={option.ndbId} className="radio">
											<label style={styles.radiolabel}>
												<div style={styles.radio}>
													<Radio radioClass="iradio_square-green" name={questionId} checked={option.value == selected} onChange={onClickRadio(questionLog, option.value)}/>
												</div>
												<span style={styles.radioLabelText}>{option.label}</span>
											</label>
										</div>
									)
								})
							}
						</div>
					</div>
				);
			})}

		</div>
	</div>
)
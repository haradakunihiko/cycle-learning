import React, {PropTypes} from 'react'
import { confirmable, createConfirmation } from 'react-confirm';
import Modal from 'react-bootstrap/lib/Modal'
import Button from 'react-bootstrap/lib/Button'
import marked  from 'marked';

class Dialog extends React.Component {
  render() {
    const {
      okLabbel = 'OK',
      cancelLabel,
      title,
      confirmation,
      show,
      proceed,
      dismiss,
      cancel,
      enableEscape = true,
      dismissOnOk,
      quiz,
      questionLogs
    } = this.props;
    return (
      <div className="static-modal">
        <Modal show={show} onHide={dismiss} backdrop={enableEscape ? true : 'static'} keyboard={enableEscape}>
        	{
        		title && (
					<Modal.Header>
						<Modal.Title>{title}</Modal.Title>
					</Modal.Header>
    			)
        	}
          <Modal.Body>
				{
					quiz.solution && (
						<div dangerouslySetInnerHTML={{__html: marked(quiz.solution)}} />
					)
				}
				{questionLogs.filter(({ question: { solution }}) => !!solution).map(({ question: { question, solution } }, index) => {
					return (
						<div key={index} dangerouslySetInnerHTML={{__html: marked(solution)}} />
					)
				})}
          </Modal.Body>
          <Modal.Footer>
            {cancelLabel && (<Button onClick={cancel}>{cancelLabel}</Button>)}
            <Button className='button-l' bsStyle="primary" onClick={dismissOnOk ? dismiss : proceed}>{okLabbel}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}

Dialog.propTypes = {
  okLabbel: PropTypes.string,
  cancelLabel: PropTypes.string,
  title: PropTypes.string,
  confirmation: PropTypes.string,
  show: PropTypes.bool,
  proceed: PropTypes.func,     // called when ok button is clicked.
  cancel: PropTypes.func,      // called when cancel button is clicked.
  dismiss: PropTypes.func,     // called when backdrop is clicked or escaped.
  enableEscape: PropTypes.bool,
}

const defaultConfirmation = createConfirmation(confirmable(Dialog));

export function show(quiz, questionLogs, options = {}) {
  return defaultConfirmation({ quiz, questionLogs, ...options });
}

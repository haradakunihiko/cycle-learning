import React from 'react';
import Relay from 'react-relay';

import {browserHistory} from 'react-router';

const styles = {
  card : {
    cursor: 'pointer'
  }
}

class BookShelfPage extends React.Component {

  constructor(props) {
    super(props);
  }

  handleCellClick(selection) {
    return () => {
      const { viewer : { user : { bookLogs } } } = this.props
      browserHistory.push(`/training/${bookLogs[selection].id}`); 
    }
  }

  render() {
    const { viewer : { user : { bookLogs } } } = this.props

    return (
      <div className="wrapper wrapper-content animated fadeInRight">
        <div className="row">
        {bookLogs.map(({ book: { label } }, index) => {
          return (
            <div className="col-md-4" key={index} style={styles.card} onClick={::this.handleCellClick(index)}>
              <div className="ibox-content text-center">
                  <h1>{label}</h1>
                  <div className="m-b-sm">
                          <img alt="image" className="img-circle" src="img/a8.jpg" />
                  </div>
                          <p className="font-bold">Consectetur adipisicing</p>

                  <div className="text-center">
                      <a className="btn btn-xs btn-white"><i className="fa fa-thumbs-up"></i> Like </a>
                      <a className="btn btn-xs btn-primary"><i className="fa fa-heart"></i> Love</a>
                  </div>
              </div>
          </div>
          )
        })}
        </div>
      </div>
    );
  }
}

export default Relay.createContainer(BookShelfPage, {
  fragments: {
    viewer: () => Relay.QL`
    fragment on Viewer {
      user {
        bookLogs {
          id
          book {
            id
            label
          }
        }
      } 
    }
    `,
  },
});

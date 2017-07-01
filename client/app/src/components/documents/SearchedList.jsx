import React from 'react';
import PropTypes from 'prop-types';
import striptags from 'striptags';

class SearchedList extends React.Component {
  render() {
    return (
      <div>
        <div className="container">
          <div className="row" >
            {this.props.document.map(document => (
              <div className="col s12 m4" key={document.id}>
                <div className="card small  grey lighten-4">
                  <div className="card-content black-text">
                    <span className="card-title" value={document.id}>
                      {document.title}
                    </span>
                    <p>{striptags(document.content)}</p>
                  </div>
                  <div className="card-action">
                    <p>{document.access}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default SearchedList;

import React from 'react';
import PropTypes from 'prop-types';

class SearchedDocumentList extends React.Component {
  render() {
    const rowStyle = {
      marginLeft: '200px',
      marginTop: '60px',
    };
    return (
      <div>
         <div className="container">
          <div className="row" style={rowStyle}>
        {this.props.document.map((document) => {
          return (
                <div className="col s12 m4" key={document.id}>
                  <div className="card small  grey lighten-4">
                    <div className="card-content black-text">
                      <span className="card-title" value={document.id}>{document.title}</span>
                      <p>{document.content}</p>
                    </div>
                    <div className="card-action">
                       <p>{document.access}</p>
                  </div>
                </div>
                </div>
            );
        })
        }
         </div>
      </div>
    </div>
    )
  }
}
export default SearchedDocumentList;

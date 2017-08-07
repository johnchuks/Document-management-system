import React from 'react';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';


/**
 * This component renders the array of document objects
 *
 * @param {array} props - array of document objects
 * @returns {array} returns the document list in cards
 */
const SearchedDocumentList = props => (
    <div>
      <div className="container">
        <div className="row" >
          {props.document.map(document => (
            <div className="col s12 m4" key={document.id}>
              <div className="card small  grey lighten-4">
                <div className="card-content black-text">
                  <span className="card-title" value={document.id}>
                    {document.title}
                  </span>
                 {Parser(document.content)}
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
SearchedDocumentList.propTypes = {
  document: PropTypes.array
};
export default SearchedDocumentList;

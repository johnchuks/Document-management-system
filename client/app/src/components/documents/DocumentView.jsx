import React from 'react';
import { Modal } from 'react-materialize';
import PropTypes from 'prop-types';
import Parser from 'html-react-parser';

/**
 *
 *
 * @param {object} props - contains an object of documents to be rendered
 * @returns {*} returns a jsx marrkup for the modal and document in it
 */
const DocumentView = props => (
    <div>
      <Modal
        id={`title${props.documentView.id}`}
        header={props.documentView.title}
        trigger={
          <a id="viewdocs"href="#">
            View
          </a>
        }
      >
       {Parser(props.documentView.content)}
      </Modal>
    </div>
  );
DocumentView.propTypes = {
  documentView: PropTypes.object.isRequired
};
export default DocumentView;

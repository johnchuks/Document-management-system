import React from 'react';
import { Modal } from 'react-materialize';
import PropTypes from 'prop-types';
import striptags from 'striptags';

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
          <a href="#">
            View
          </a>
        }
      >
        <p>{striptags(props.documentView.content)}</p>
      </Modal>
    </div>
  );
DocumentView.propTypes = {
  documentView: PropTypes.object.isRequired
};
export default DocumentView;

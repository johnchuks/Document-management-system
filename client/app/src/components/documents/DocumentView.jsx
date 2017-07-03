import React from 'react';
import { Modal } from 'react-materialize';
import striptags from 'striptags';

const DocumentView = props => {
  console.log(props.documentView);
  return (
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
}
export default DocumentView;

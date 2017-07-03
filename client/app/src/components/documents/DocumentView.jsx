import React from 'react';
import { Modal } from 'react-materialize';
import striptags from 'striptags';

class DocumentView extends React.Component {
  render() {
    const styleButton = {
      marginTop: '20px'
    };
    return (
      <div>
        <Modal
          id={this.props.documentView.id}
          header={this.props.documentView.title}
          trigger={
            <button
              className="waves-effect waves-light btn orange"
              style={styleButton}
            >
              View
            </button>
          }
        >
          <p>{striptags(this.props.documentView.content)}</p>
        </Modal>
      </div>
    );
  }
}
export default DocumentView;

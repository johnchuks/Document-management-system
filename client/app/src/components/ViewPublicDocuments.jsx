import React from 'react';
import { connect } from 'react-redux';
import { fetchAllDocuments } from '../actions/documentActions';

class ViewPublicDouments extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.dispatch(fetchAllDocuments());
  }
  render() {
    return (
      <div>
        </div>
    )
  }
}
export default connect()(ViewPublicDouments);

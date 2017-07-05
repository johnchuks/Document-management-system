import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import DocumentForm from '../documents/DocumentForm.jsx';
import AllDocuments from '../documents/AllDocuments.jsx';
import NavigationBar from './NavigationBar.jsx';

class Dashboard extends React.Component {

  componentWillMount() {
    if (this.props.isAuthenticated === false) {
      this.props.history.push('/');
    }
  }
  render() {
    if (this.props.isAuthenticated === false) return null;
    return (
      <div>
        <NavigationBar />
        <h5>Public And Role Documents</h5>
        <AllDocuments />
        <DocumentForm />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.usersReducer.isAuthenticated,
  }
}
export default connect(mapStateToProps)(withRouter(Dashboard));

import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import DocumentForm from '../documents/DocumentForm.jsx';
import AllDocuments from '../documents/AllDocuments.jsx';
import  NavigationBar from './NavigationBar.jsx';

/**
 * renders all documents component and document form component
 *
 * @class Dashboard
 * @extends {React.Component}
 */
class Dashboard extends React.Component {

  /**
   * @return {*}
   * checks if the user is authenticated before mounting the component
   * @memberof Dashboard
   */
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
Dashboard.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  history: PropTypes.object.isRequired
};
const mapStateToProps = state => ({
  isAuthenticated: state.usersReducer.isAuthenticated,
});
export default connect(mapStateToProps)(withRouter(Dashboard));

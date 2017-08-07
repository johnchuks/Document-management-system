import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import AllDocuments from '../documents/AllDocuments.jsx';
import  NavigationBar from './NavigationBar.jsx';
import Footer from '../users/Footer.jsx';

/**
 * renders all documents component and document form component
 *
 * @class Dashboard
 * @extends {React.Component}
 */
export class Dashboard extends React.Component {

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
        <h5 className="all-documents">All Documents</h5>
        <AllDocuments />
        <Footer />
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

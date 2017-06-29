import React from 'react';
import DocumentForm from '../documents/DocumentForm.jsx';
import ViewPublicRoleDocuments from '../documents/ViewPublicRoleDocuments.jsx';
import NavigationBar from './NavigationBar.jsx';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <h4 id="searchHeading">Public And Role Documents</h4>
        <ViewPublicRoleDocuments />
        <DocumentForm />
      </div>
    );
  }
}
export default Dashboard;

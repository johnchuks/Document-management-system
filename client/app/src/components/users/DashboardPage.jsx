import React from 'react';
import DocumentForm from '../documents/DocumentForm.jsx';
import ViewPublicRoleDocuments from '../documents/ViewPublicRoleDocuments.jsx';
import NavigationBar from './NavigationBar.jsx';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <h5>Public And Role Documents</h5>
        <ViewPublicRoleDocuments />
        <DocumentForm />
      </div>
    );
  }
}
export default Dashboard;

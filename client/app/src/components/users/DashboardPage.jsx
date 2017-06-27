import React from 'react';
import DocumentForm from '../documents/DocumentForm';
import ViewPublicRoleDocuments from '../documents/ViewPublicRoleDocuments';
import NavigationBar from './NavigationBar';

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

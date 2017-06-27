import React from 'react';
import DocumentForm from '../documents/DocumentForm';
import ViewPublicDocuments from '../documents/ViewPublicDocuments';
import ViewRoleDocuments from '../documents/ViewRoleDocuments';
import NavigationBar from './NavigationBar';

class Dashboard extends React.Component {
  render() {
    return (
        <div>
        <NavigationBar />
        <h4 id="searchHeading">Public And Role Documents</h4>
        <ViewPublicDocuments />
         <DocumentForm />
    </div>
    );
  }
}
export default Dashboard;

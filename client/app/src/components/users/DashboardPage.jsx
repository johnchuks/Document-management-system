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
        <ViewPublicDocuments />
        <ViewRoleDocuments />
         <DocumentForm />
    </div>
    );
  }
}
export default Dashboard;

import React from 'react';
import DocumentForm from './DocumentForm.jsx';
import ViewPublicDocuments from './ViewPublicDocuments';
import ViewRoleDocuments from './ViewRoleDocuments';
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

import React from 'react';
import DocumentForm from './DocumentForm.jsx';
import ViewUserDocuments from './ViewPublicDocuments';
import NavigationBar from './NavigationBar';

class Dashboard extends React.Component {

  render() {
    return (
        <div>
        <NavigationBar />
        <ViewUserDocuments />
        <DocumentForm />
      </div>
    )
  }
}
export default Dashboard;

import React from 'react';
import DocumentForm from './DocumentForm.jsx';
import ViewPublicDocuments from './ViewPublicDocuments';
import NavigationBar from './NavigationBar';

class Dashboard extends React.Component {

  render() {
    return (
        <div>
        <NavigationBar />
        <ViewPublicDocuments />
        <DocumentForm />
      </div>
    )
  }
}
export default Dashboard;

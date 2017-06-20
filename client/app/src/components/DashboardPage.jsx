import React from 'react';
import DocumentForm from './DocumentForm.jsx';
import ViewPublicDocuments from './ViewPublicDocuments';

class Dashboard extends React.Component {

  render() {
    return (
      <div>
        <ViewPublicDocuments />
        <DocumentForm />
      </div>
    )
  }
}
export default Dashboard;

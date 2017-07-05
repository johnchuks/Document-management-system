import React from 'react';
import DocumentForm from '../documents/DocumentForm.jsx';
import AllDocuments from '../documents/AllDocuments.jsx';
import NavigationBar from './NavigationBar.jsx';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <NavigationBar />
        <h5>Public And Role Documents</h5>
        <AllDocuments />
        <DocumentForm />
      </div>
    );
  }
}
export default Dashboard;

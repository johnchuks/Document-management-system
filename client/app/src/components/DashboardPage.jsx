import React from 'react';
import DocumentForm from './DocumentForm.jsx';
import ViewPublicDocuments from './ViewPublicDocuments';
import NavigationBar from './NavigationBar';

class Dashboard extends React.Component {

  render() {
    return (
        <div>
        <NavigationBar />
        <div className="row">
           <div className="col s12">
          <ul className="tabs">
        <li className="tab col s4"><a href="/documents">Public</a><ViewPublicDocuments /></li>
        <li className="tab col s4"><a className="active" href="/login">Role</a></li>
        <li className="tab col s4"><a href="/profile">Role</a></li>
      </ul>
    </div>
    </div>
      </div>
    )
  }
}
export default Dashboard;

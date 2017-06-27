import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import toastr from 'toastr';
import NavigationBar from '../users/NavigationBar';
import { searchDocument } from '../../actions/documentActions';
import SearchedDocumentList from '../documents/SearchedDocumentList';

class SearchDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      searchList: [],
      error: {}
    }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onHandleChange(event) {
    this.setState({ searchString: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.setState({ errors: {} });
    this.props.searchDocument(this.state).then((error) => {
      if (!error) {
        this.setState({ searchList: this.props.search });
      } else {
        this.setState({ error: error.response.data.message });
        toastr.error(this.state.error);
      }
    });
  }
  render() {
    const searchList = this.state.searchList;
    const searchListFiltered = searchList.filter((document) => {
      if (document.access === 'public' && document.access === 'role') {
        return document;
      } else if (document.access === 'role') {
        if (document.User.roleId === this.props.user || this.props.user === 1) {
          return document;
        }
      }
      return 'No Document Found';
    });
    const inputStyle = {
      width: '50%',
      marginLeft:'350px'
    };
    return (
      <div>
      <NavigationBar />
      <br/>
      <h4 id="searchHeading">Search For Documents</h4>
      <div className="searchBar">
        <input id="searchBar" type="text" name="search" onChange={this.onHandleChange} placeholder="Search.." style={inputStyle} />
        <button className="waves-effect waves-light btn orange" id="searchButton" onClick={this.onSubmit} type="submit">Search</button>
        </div>
        <SearchedDocumentList document={searchListFiltered} />
    </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    search: state.fetchDocuments.document.rows,
    user: state.usersReducer.user.roleId
  };
};
export default connect(mapStateToProps, { searchDocument })(SearchDocument);

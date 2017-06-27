import React from 'react';
import { connect } from 'react-redux';
import NavigationBar from '../users/NavigationBar';
import { searchDocument } from '../../actions/documentActions';

class SearchDocument extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
    }
    this.onHandleChange = this.onHandleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onHandleChange(event) {
    this.setState({ searchString: event.target.value });
  }
  onSubmit(event) {
    event.preventDefault();
    this.props.searchDocument(this.state);
    console.log(this.state);
  }
  render() {
    console.log(this.props.document);
    const inputStyle = {
      width: '50%',
      marginLeft:'350px'
    }

    return (
      <div>
      <NavigationBar />
        <input id="searchBar" type="text" name="search" onChange={this.onHandleChange} placeholder="Search.." style={inputStyle} />
        <button className="waves-effect waves-light btn orange" onClick={this.onSubmit} type="submit">Search</button>
    </div>
    )
  }
}
const mapStateToProps = (state) => {
  return {
    document: state.fetchDocuments.document.rows,
    user: state.usersReducer.user.roleId
  };
}

export default connect(mapStateToProps, { searchDocument })(SearchDocument);

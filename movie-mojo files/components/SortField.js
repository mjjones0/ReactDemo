import React, { Component } from 'react';
 
class SortField extends Component {
	sortBy(e, type) {
		e.preventDefault();
		this.props.sorter(type);
	}
  render() {
    return (
      <div className="sort-field">
				<button onClick={(e) => this.sortBy(e, "title")}>Title</button>
				<button onClick={(e) => this.sortBy(e, "year")}>Year</button>
				<button onClick={(e) => this.sortBy(e, "description")}>Description</button>
			</div>
    );
  }
}
 
export default SortField;
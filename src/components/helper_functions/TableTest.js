import React, { Component } from 'react';
import PropTypes from 'prop-types';


class TableTest extends Component {
	
  constructor() {
    super();
	console.log(this.props);
    this.state = {
      currentTableData: [],
      columnsToDisplay: []
    };
	console.log("+");
	console.log(this.props.data);
	
    this.renderHeaders = this.renderHeaders.bind(this);
    this.renderRows = this.renderRows.bind(this);
    this.renderIndividualRow = this.renderIndividualRow.bind(this);
  }
  
  componentDidUpdate(){
	  this.setState({
		  
		currentTableData: Object.assign([], this.props.data),
		columnsToDisplay: Object.assign([], this.props.columns)
	  })
	  
  }
  
  
  renderHeaders() {
    return this.state.columnsToDisplay.map((item, index) => {
      const headerCssClassName = `col-md-${item.columnSize}`;
      if (item.visible) {
        return (
          <div className={headerCssClassName} key={index}>
            <span className="table-column-header-text">    
              {item.displayText}
            </span>
          </div>
        );
      } else {
        return (
          <div className={headerCssClassName} key={index} hidden>
            <span className="table-column-header-text">
              {item.displayText}
            </span>
          </div>
        );
      }
    });
  }
  
  renderIndividualRow(data, dataKeys) {
    return dataKeys.map((item, index) => {
      let columnWidth = `col-md-${this.state.columnsToDisplay[index].columnSize}`;
      if (item.visible) {
        return (
          <div className={columnWidth} key={index}> 
            {data[item.fieldName]}
          </div>
        );
      } else {
        return null;
      }
    });
  }
  
  renderRows() {
    let dataKeys = Object.assign([], this.state.columnsToDisplay);
    let dataRows = Object.assign([], this.state.currentTableData);
	
    if (dataRows.length > 0) {
      return dataRows.map((row, index) => {
        return (
          <div key={index} className="row">
            {this.renderIndividualRow(row, dataKeys)}
          </div>
        );
      });
    }
  }
  
  //render function
  render() {
    return (
      <div className="col-md-12">
        <div className="row column-header-row">
          {this.renderHeaders()}
        </div>
        {this.renderRows()}
      </div>
    );
  }
}

export default TableTest
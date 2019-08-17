import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import PartialMatchFilter from "./partialMatchFilter.jsx";

class TabelaPlano extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [{
        headerName: "Nome", field: "nome", sortable: true, checkboxSelection: true, rowDrag: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, filter: "partialMatchFilter"
      }, {
        headerName: "Situacao", field: "situacao", sortable: true, filter: "agNumberColumnFilter",
        
        filterParams: {
          filterOptions: [
            "contains",
            {
              displayKey: "emdia",
              displayName: "Em dia",
              test: function(filterValue, cellValue) {
                return cellValue != null && cellValue % 2 === 0;
              },
              hideFilterInput: true
            },
            {
              displayKey: "oddNumbers",
              displayName: "Odd Numbers",
              test: function(filterValue, cellValue) {
                return cellValue != null && cellValue % 2 !== 0;
              },
              hideFilterInput: true
            },
            {
              displayKey: "blanks",
              displayName: "Blanks",
              test: function(filterValue, cellValue) {
                return cellValue == null;
              },
              hideFilterInput: true
            }
          ],
          suppressAndOrCondition: true
        }
      }, {
        headerName: "Valor", field: "valor", sortable: true 
      }],
      rowData: [{
        nome: "Fulano", situacao: "Em dia", valor: 180.00
      }, {
        nome: "Ciclano", situacao: "Em atraso", valor: 320.00
      }, {
        nome: "Beltrano", situacao: "Em dia", valor: 720.00
      }],
      frameworkComponents: { partialMatchFilter: PartialMatchFilter }
    }
  }

  render() {
    return (
      <div 
        className="ag-theme-balham"
        style={{ 
        height: '500px', 
        width: '600px' }} 
      >
        <AgGridReact
          rowSelection="multiple"
          columnDefs={this.state.columnDefs}
          rowData={this.state.rowData}
          rowDragManaged={true}
          animateRows={true}
          frameworkComponents={this.state.frameworkComponents}
        >
        </AgGridReact>
      </div>
    );
  }
}

export default TabelaPlano;
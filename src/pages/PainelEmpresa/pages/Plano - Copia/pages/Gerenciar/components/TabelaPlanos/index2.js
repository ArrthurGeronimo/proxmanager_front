import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import PartialMatchFilter from "./partialMatchFilter.jsx";

class TabelaPlano extends Component {
  constructor(props) {
    super(props);
    this.state = {
      width: '100%', 
      height: '100%',
      columnDefs: [
        {
          headerName: "Nome", 
          field: "nome", 
          sortable: true, 
          checkboxSelection: true, 
          rowDrag: true, 
          headerCheckboxSelection: true, 
          headerCheckboxSelectionFilteredOnly: true, 
          filter: "partialMatchFilter"
        }, 
        {
        headerName: "Situacao", 
        field: "situacao", 
        sortable: true, 
        filter: "agNumberColumnFilter",
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
        }, 
        {
        headerName: "Valor", 
        field: "valor", 
        sortable: true 
        },
        {
          headerName: "Sport",
          field: "sport",
          width: 110,
          filter: "agTextColumnFilter"
        }
      ],

      rowData: 
      [
        {
        nome: "Fulano", situacao: "Em dia", valor: 180.00, sport: 'Qualquer'
        }, 
        {
          nome: "Ciclano", situacao: "Em atraso", valor: 320.00, sport: 'Testando'
        }, 
        {
          nome: "Beltrano", situacao: "Em dia", valor: 720.00, sport: 'Campo qualquer'
        }
      ],
      defaultColDef: {
        sortable: true,
        filter: false,
        resizable: true
      },
      frameworkComponents: { partialMatchFilter: PartialMatchFilter }
    }

    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    //this.updateWindowDimensions();
   // window.addEventListener('resize', this.updateWindowDimensions);
  }
  componentWillUnmount() {
    //window.removeEventListener('resize', this.updateWindowDimensions);
  }
  updateWindowDimensions() {
    //this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  render() {
    return (
      <div style={{height: '100%', width: '100%'}} className="ag-theme-balham">
        <div style={{width: this.state.width, height: this.state.height}} >
          <AgGridReact
            rowSelection="multiple"
            columnDefs={this.state.columnDefs}
            rowData={this.state.rowData}
            rowDragManaged={true}
            animateRows={true}
            frameworkComponents={this.state.frameworkComponents}
            floatingFilter={true}
          />
        </div>
      </div>
    );
  }
}

export default TabelaPlano;
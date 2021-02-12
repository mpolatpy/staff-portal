import React from 'react';

import WithSpinner from '../with-spinner/with-spinner.component';

import { DataGrid } from '@material-ui/data-grid';


const DataTable = ({ rows, columns, pageSize, checkboxSelection}) => {
    return (
        <div style={{ height: 400, width: '100%' }}>
            <DataGrid 
            rows={rows} 
            columns={columns} 
            pageSize={pageSize} 
            checkboxSelection={checkboxSelection} 
            />
        </div>
    );
}

export default WithSpinner(DataTable);




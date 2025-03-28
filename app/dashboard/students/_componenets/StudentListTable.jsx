import React, { useEffect, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community'; 
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';


function StudentListTable({studentList}){

  const CustomButton=(props)=>{
    return <Button variant="destructive">{<Trash/>}</Button>
  }
  const [colDef, setColDef] = useState([
    {field: 'id',filter: true},
    {field: 'name',filter: true},
    {field: 'address',filter: true},
    {field: 'contact',filter: true},
    {field:"action",cellRenderer:CustomButton }
  ])

  const [rowData, setRowData] = useState();

  useEffect(()=>{
    studentList&&setRowData(studentList)
  },[studentList])
  return (
    <div>
          <div style={{ height: 500 }}>
        <AgGridReact
            rowData={rowData}
            columnDefs={colDef}
        />
    </div>

    </div>
  )
}

export default StudentListTable
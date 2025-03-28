import React, { useEffect, useState } from 'react'
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';
// Register all Community features
ModuleRegistry.registerModules([AllCommunityModule]);
import { AgGridReact } from 'ag-grid-react';
import { Button } from '@/components/ui/button';
import { Search, Trash } from 'lucide-react';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'react-toastify';

const pagination = true;
const paginationPageSize = 500;
const paginationPageSizeSelector = [25, 50, 100]
function StudentListTable({ studentList,refresData }) {

  const DeleteRecord=(id)=>{
    GlobalApi.DeleteStudentRecord(id).then(res=>{
      if(res)
      {
        toast('Record deleted successfully !');
        refresData()
      }
    })
  }
  const CustomButton = (props) => {
    return (
      <Dialog>
        <DialogTrigger>
          <Button variant="destructive">{<Trash />}</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
          <Button onClick={()=>DeleteRecord(props?.data?.id)}>Continue</Button>
        </DialogFooter>
        </DialogContent>
      </Dialog>

    )
  }
  const [colDef, setColDef] = useState([
    { field: 'id', filter: true },
    { field: 'name', filter: true },
    { field: 'address', filter: true },
    { field: 'contact', filter: true },
    { field: "action", cellRenderer: CustomButton }
  ])

  const [rowData, setRowData] = useState();
  const [searchInput, setSearchInput] = useState();

  useEffect(() => {
    studentList && setRowData(studentList)
  }, [studentList]);

  return (
    <div className='my-7'>
      <div
        className='ag-theme-quartz'
        style={{ height: 500 }}
      >
        <div className='p-2 rounded-lg border shadow-sm flex  gap-2 mb-4 max-w-sm'>
          <Search />
          <input
            type='text'
            placeholder='Search on Anything ...'
            className='outline-none w-full'
            onChange={(event) => setSearchInput(event.target.value)}
          />
        </div>
        <AgGridReact
          rowData={rowData}
          columnDefs={colDef}
          quickFilterText={searchInput}
          pagination={pagination}
          paginationPageSize={paginationPageSize}
          paginationPageSizeSelector={paginationPageSizeSelector}
        />
      </div>

    </div>
  )
}

export default StudentListTable
'use client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React, { useEffect, useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useForm } from 'react-hook-form'
import GlobalApi from '@/app/_services/GlobalApi'
import { toast } from 'react-toastify'
import { LoaderIcon } from 'lucide-react'

function AddNewStudent({ refresData}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState();
  const [grades, setGrades] = useState([]);
  const onSubmit = (data) => {
    setLoading(true)
    GlobalApi.CreateNewStudent(data).then(resp => {
      console.log("---", resp);
      if (resp.data) {
        setLoading(false)
        reset();
        setOpen(false)
        toast("New student addes!")
        refresData();
      }
      setLoading(false);
    })
  }

  useEffect(() => {
    GetAllGradesList()
  }, [])

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then(resp => {
      setGrades(resp.data);
      console.log(resp.data)
    })
  }


  return (
    <div>
      <Button onClick={() => setOpen(true)} className="font-bold text-2xl">+ Add New Student</Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add new student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className='py-2'>
                  <label>Full Name</label>
                  <Input placeholder='Ex. Jhon Carry'
                    {...register('name', { required: true })}
                  />
                </div>
                <div className='flex flex-col py-2'>
                  <label>Select Grade</label>
                  <select className='p-3 border rounded-lg'
                    {...register('grade', { required: true })}
                  >
                    {grades.map((item, index) => (
                      <option key={`${item.grade}`} value={`${item.grade}`}>{item.grade}</option>
                    ))}
                  </select>
                </div>
                <div className='py-2'>
                  <label>Contact Number</label>
                  <Input placeholder='Ex. 785161487'   {...register('contact')} />
                </div>
                <div className='py-2'>
                  <label>Address</label>
                  <Input placeholder='No. 310 Laggala Pallegama'   {...register('address')} />
                </div>
                <div className='flex gap-2 items-center justify-end mt-5'>
                  <Button onClick={() => setOpen(false)} variant="ghost">Cancel</Button>
                  <Button type='submit'
                    disable={loading}
                    onClick={() => onSubmit}>
                    {loading ? <LoaderIcon className='animate-spin' /> :
                      'Save'}</Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AddNewStudent
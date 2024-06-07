"use client"
import { useFormState } from 'react-dom'
const UpdateBtn = () => {
    const {pending} = useFormState();

  return (
<button className='bg-narsa cursor-pointer text-white p-2 rounded-md disabled:bg-pink-200 disabled:cursor-not-allowed max-w-96'>{pending ? "Updating..." : "Update"}</button>
  )
}

export default UpdateBtn
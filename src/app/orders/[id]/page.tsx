import React from 'react'

const odersPage = ({params}:{params:{id:string}}) => {
  return (
    <div className='h-[90vh] w-full flex bg-gray-200 items-center font-semibold text-green-600'><div className='mx-auto'>
        <p className='bg-white shadow-xl shadow-green-600 rounded-lg text-6xl py-3 px-4'>{params.id}</p></div></div>
  )
}

export default odersPage
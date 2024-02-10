import React from 'react'
import AddPrompt2Gen from './AddPrompt2Gen'
import PrevChecklists from './PrevChecklists'

const Checklist = () => {
  return (
    <div>
      <div className='bg-gradient-to-r from-blue-600 to-blue-200 text-white font-extrabold'>
        <p className="text-4xl px-10 pb-5 pt-5 text-center">Generate Compliance Checklist</p>
        <p className="text-normal italic px-10 pb-5 text-center">Generate compliance checklist to manage you compliances and stay up to date</p>
      </div>

      <AddPrompt2Gen />

      <PrevChecklists />
    </div>
  )
}

export default Checklist
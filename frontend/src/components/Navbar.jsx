import { PlusIcon } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Navbar = () => {
  return (
    <header className='bg-base-100 border-accent/25 border-b-2'>
        <div className='mx-auto p-4 flex justify-between'>
            <h1 className='text-7xl text-secondary font-light tracking-tight'>
                Music Control Panel
            </h1>
            <input type="checkbox" value="forest" className="toggle theme-controller my-auto mr-4" />
        </div>
    </header>
  )
}

export default Navbar
import React from 'react'
import Logo from '../assets/logo.png'

const AuthLayouts = ({children}) => {
    return (
        <>
            <header className='flex items-center justify-between px-10 py-2 shadow-md'>
                <div className='flex items-center'>
                    <img src={Logo} alt="logo" className='h-10 w-10'/> 
                    <h3 className='text-lg ml-3'>Messenger</h3>
                </div>
            </header>

            { children }
        </>
    )
}

export default AuthLayouts

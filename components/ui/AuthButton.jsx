"use client"
import React, { useState } from 'react'
import { Button } from './button'
import { LogIn, LogOut } from 'lucide-react'
import { AuthModal } from './AuthModal'
import { signOut } from '@/app/actions'

const AuthButton = ({user}) => {
    const [showAuthModal , setShowAuthModal] = useState(false);

    if(user)
    {
        return(
            <>
                <form action={signOut}>
                    <Button variant='ghost' size='sm' type="submit" className="gap-2">
                    <LogOut className="w-4 h-4"/>
                    Sign Out
                    </Button>
                </form>
            </>
        )
    }
  return (
    <>
          <Button 
          onClick={()=>setShowAuthModal(true)}
          className="bg-amber-500 hover:bg-amber-600 text-white">
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
            <AuthModal
                isOpen={showAuthModal}
                onClose={()=>setShowAuthModal(false)}
            /> 
    </>

)
}

export default AuthButton
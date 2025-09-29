import { AlertTriangle } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router-dom' // 👈 use react-router-dom here

const NotFoundPage = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center py-16 space-y-6 max-w-md mx-auto text-center'>
      <div className='bg-error/10 rounded-full p-8'>
        <AlertTriangle className='size-10 text-error' />
      </div>
      <h3 className='text-2xl font-bold'>404 - Page Not Found</h3>
      <p className='text-base-content/70'>
        Oops! The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link to='/' className='btn btn-primary'>
        Back to Home
      </Link>
    </div>
  )
}

export default NotFoundPage

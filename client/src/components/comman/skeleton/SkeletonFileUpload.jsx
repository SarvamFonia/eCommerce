import { Skeleton } from '@/components/ui/skeleton'
import React from 'react'

const SkeletonFileUpload = () => {
    return (
        <div className='w-full flex flex-col justify-center items-center'>
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-4 w-[250px] mb-1" />
            <Skeleton className="h-4 w-[250px] mb-1" />
        </div>
    )
}

export default SkeletonFileUpload

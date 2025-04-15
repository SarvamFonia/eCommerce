import React, { useEffect, useRef } from 'react'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { CloudUpload, FileIcon, XIcon } from 'lucide-react'
import { Button } from '../ui/button'
import axios from 'axios'
import SkeletonFileUpload from '../comman/skeleton/SkeletonFileUpload'
import { SERVER_URL } from '@/config/config'

const ImageUpload = ({ file, setFile, uploadedImageUrl, setUploadedImageUrl, imageLoadingState, setImageLoadingState, isEditMode }) => {

    const inputRef = useRef(null)

    const handelImageFileChange = (e) => {
        console.log(e.target.files);
        const selectedFile = e.target.files?.[0];
        if (selectedFile) setFile(selectedFile);

    }

    const hangelDragOver = (e) => {
        e.preventDefault()
    }

    const handelDrop = (e) => {
        e.preventDefault()
        const droppedFile = e.dataTransfer.files?.[0];
        if (droppedFile) setFile(droppedFile)
    }

    const handelRemove = () => {
        setFile(null)
        if (inputRef.current) {
            inputRef.current.value = ''
        }
    }
    const uploadImageToCloudinary = async () => {
        if (imageLoadingState || !file) return;
        setImageLoadingState(true)
        const data = new FormData();
        data.append('my_file', file);
        const response = await axios.post(`${SERVER_URL}/admin/products/upload-image`, data);
        console.log(response)
        if (response?.data?.success) {
            setUploadedImageUrl(response?.data?.result?.url)
            setImageLoadingState(false)
        }
    }
    useEffect(() => {
        if (file !== null) uploadImageToCloudinary()
    }, [file])

    // const handelUploadClick = (e) => {
    //     e.preventDefault()
    //     uploadImageToCloudinary()
    // }

    return (
        <div className='w-full max-w-md mx-auto mt-4'>
            <label className='text-lg font-semibold mb-2 block'>Upload Image</label>
            <div onDragOver={hangelDragOver} onDrop={handelDrop} className="border-2 border-dashed rounded-lg p-4">
                <Input id='image-upload' type='file'
                    className="hidden"
                    ref={inputRef}
                    onChange={handelImageFileChange}
                    disabled = {isEditMode}
                    />

                {
                    !file ?
                        <Label htmlFor='image-upload' className={` ${isEditMode ? 'cursor-not-allowed ': 'cursor-pointer' } flex flex-col items-center justify-center h-32 `}>
                            <CloudUpload className='w-10 h-10 text-muted-foreground mb-2' />
                            <span>Drag & drop or click to upload image</span>
                        </Label> :
                        imageLoadingState ? <SkeletonFileUpload /> :
                            <div className='flex items-center justify-between '>
                                <div className="flex items-center ">
                                    <FileIcon className='w-8 h-8 text-primary mr-2'></FileIcon>
                                </div>
                                <p className='text-sm font-medium'>{file?.name}</p>
                                <Button variant='ghost' size='icon' className='text-muted-foreground hover:text-foreground' onClick={handelRemove}>
                                    <XIcon className='w-4 h-4 '></XIcon>
                                    <span className='sr-only'>Remove File</span>
                                </Button>
                            </div>
                }
            </div>
            {/* <div className='w-full flex flex-row justify-end items-center'>
                <Button onClick={handelUploadClick} className='mt-2 h-[25px]'>upload</Button>
            </div> */}

        </div>
    )
}

export default ImageUpload

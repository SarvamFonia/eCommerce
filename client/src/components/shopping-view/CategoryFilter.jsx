import { filterOption } from '@/config/config'
import React from 'react'
import { Label } from '../ui/label'
import { Checkbox } from '../ui/checkbox'
import { Separator } from '../ui/separator'

const CategoryFilter = ({ filters, handelFilter }) => {
    return (
        <div className='bg-background rounded-lg shadow-sm'>
            <div className="p-4 border-b">
                <h2 className='text-lg font-extrabold '>Filters</h2>
            </div>
            <div className="p-4 space-y-4 ">
                {
                    Object.keys(filterOption).map(key => <>
                        <div className=''>
                            <h3 className='text-base font-bold'>{key}</h3>
                            <div className='grid gap-2 mt-2'>
                                {
                                    filterOption[key].map(options => <Label className='flex font-medium items-center gap-2 '>
                                        {/* <Checkbox
                                        checked={ filters && Object.keys(filters) > 0 && filters[key] && filters[key].indexOf(options.id) > -1 }
                                        onCheckedChange={
                                                () => { handelFilter(key, options.id) }
                                            }></Checkbox>  */}
                                        <Checkbox
                                            checked={filters?.[key] && Array.isArray(filters[key]) && filters[key].includes(options.id)}
                                            onCheckedChange={() => handelFilter(key, options.id)}
                                        />
                                        {options?.label}
                                    </Label>)
                                }
                            </div>
                        </div>
                        <Separator />
                    </>)
                }
            </div>
        </div>
    )
}

export default CategoryFilter

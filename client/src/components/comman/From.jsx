
import React from 'react'
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { SelectValue } from '@radix-ui/react-select';
import { Button } from '../ui/button';

const From = ({ formControls, formData, setFromData, onSubmit, buttonText, isBtnDisabled }) => {

    const renderInputsByComponentType = (getControlItem) => {
        let element = null;
        const value = formData[getControlItem.name] || '';
        switch (getControlItem.componentType) {
            case 'input':
                element = <Input name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    type={getControlItem.type}
                    id={getControlItem.name}
                    value={value}
                    onChange = {event => setFromData({
                        ...formData,
                        [getControlItem.name] : event.target.value
                    })}></Input>
                break;
            case 'select':
                element = <Select onValueChange = {(value) => setFromData({
                    ...formData,
                    [getControlItem.name]: value
                })} name={getControlItem.name} id={getControlItem.name} value={value}>
                    <SelectTrigger className='w-full'>
                        <SelectValue placeholder={getControlItem.label}></SelectValue>
                    </SelectTrigger>
                    <SelectContent>
                        {
                            getControlItem.options && getControlItem.options.length > 0 ?
                                getControlItem.options.map(optionItem => <SelectItem key={optionItem.id} value={optionItem.id}>{optionItem.label}</SelectItem>) :
                                null
                        }
                    </SelectContent>
                </Select>
                break;
            case 'textarea':
                element = <Textarea name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    type={getControlItem.type}
                    id={getControlItem.name} 
                    value={value}
                    onChange = {event => setFromData({
                        ...formData,
                        [getControlItem.name] : event.target.value
                    })}></Textarea>
                break;

            default:
                element = <Input name={getControlItem.name}
                    placeholder={getControlItem.placeholder}
                    type={getControlItem.type}
                    id={getControlItem.name}
                    value={value}
                    onChange = {event => setFromData({
                        ...formData,
                        [getControlItem.name] : event.target.value
                    })}></Input>
        }
        return element;
    }
    return (
        <form onSubmit={onSubmit}>
            <div className='flex flex-col gap-3'>
                {
                    formControls.map(controlItem => <div key={controlItem.name} className='grid w-full gap-1.5'>
                        <Select className='mb-1'>{controlItem.label}</Select>
                        {
                            renderInputsByComponentType(controlItem)
                        }
                    </div>)
                }
            </div>
            <Button type='submit' className={'mt-2 w-full'} disabled ={isBtnDisabled}>{buttonText || 'Submit'}</Button>
        </form>
    )
}

export default From

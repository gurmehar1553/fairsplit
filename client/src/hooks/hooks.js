import {useState} from "react";

function useField(type){
    const [value, setValue] = useState('');

    function onChange(e){
        if(e===''){
            setValue('')
            return
        }
        setValue(e.target.value)
    }
    return ({
        value,
        onChange,
        type
    })
}

export {useField}
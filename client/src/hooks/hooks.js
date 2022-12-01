import {useRef, useState} from "react";

function useField(type){
    const [value, setValue] = useState('');

    const ref = useRef()

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
        type,
        ref
    })
}

export {useField}
import React, {useEffect, useState} from 'react';
import '../../src/css/input.css';

const Input = ({ value, onChange, binaryString, clear, resetAnimation }) => {
    const [inputValue, setInputValue] = useState('');
    const [trigger, setTrigger] = useState(false);


    useEffect(() => {
        if(!trigger)
        setInputValue(binaryString);
        else
            setInputValue(value);
        
        if(clear && trigger) {
            setTrigger(false);
            resetAnimation(false);
            setInputValue('');
        }


    }, [value, binaryString, trigger, clear, resetAnimation]);


    const handleChange = (e) => {
        setInputValue(e.target.value);
        onChange(e);
    };

    const handleClear = (e) => {
        setTrigger(true);
    };

    return (
        <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            onClick={handleClear}
            className="input-field"
            maxLength={1}
        />
    );
};

export default Input;
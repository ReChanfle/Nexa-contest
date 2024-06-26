import React, {useEffect, useState} from 'react';
import '../../src/css/button.css';
import '../../src/css/button-sm.css';
import {useGetRichListsQuery} from "../redux/features/getRichListQuery";


const Button = ({text, onClick, id, small}) => {

    const className =  small ? "gradient-button-sm" :  "gradient-button";



    return (
        <div>
            <button className={className} onClick={onClick}  id={id} >
                {text}
            </button>

        </div>

    );
};

export default Button;
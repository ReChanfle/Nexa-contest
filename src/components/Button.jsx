import React, {useEffect, useState} from 'react';
import '../../src/css/button.css';
import {useGetRichListsQuery} from "../redux/features/getRichListQuery";


const Button = ({text, onClick, id}) => {

    const [fetchTrigger, setFetchTrigger] = useState(false);

    const { data, error, isLoading, isSuccess, refetch } = useGetRichListsQuery(fetchTrigger);

    const handleFetchData = () => {
        setFetchTrigger(true);
    };



    return (
        <div>
            <button className="gradient-button" onClick={onClick}  id={id} >
                {text}
            </button>

        </div>

    );
};

export default Button;
import React, {useEffect, useState} from 'react';
import '../../src/css/button.css';
import {useGetRichListsQuery} from "../redux/features/getRichListQuery";
import Table from "./Table";

const Button = () => {

    const [binaryString, setBinaryString] = useState('');
    const [fetchTrigger, setFetchTrigger] = useState(false);

    const { data, error, isLoading, isSuccess, refetch } = useGetRichListsQuery(fetchTrigger);


    const handleFetchData = () => {
        setFetchTrigger(true);
        console.log(data);
    };


    const generateBinaryString = (length) => {
        let binary = '';
        for (let i = 0; i < length; i++) {
            binary += Math.random() < 0.5 ? '0' : '1'; // Genera aleatoriamente 0 o 1
        }
        return binary;
    };


    useEffect(() => {
        const interval = setInterval(() => {
            const newBinaryString = generateBinaryString(10);
            setBinaryString(newBinaryString);
        }, 50);

        return () => clearInterval(interval);
    }, []);


    return (
        <div>
            <button className="gradient-button" onClick={handleFetchData}>
                {binaryString}
            </button>
            <Table data={data} isLoading={isLoading} error={error} isSuccess={isSuccess}/>
        </div>

    );
};

export default Button;
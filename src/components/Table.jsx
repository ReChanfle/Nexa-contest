import React from 'react';
import '../../src/css/table.css';
import Spinner from "./Spinner";
const Table = ({ data, isLoading, error }) => {
    return (
        <div className="table-container">
            {isLoading ? (
                <Spinner />
            ) : error ? (
                <div>Error: {error.message}</div>
            ) : (
                <table className="table">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Ticker</th>
                        <th>Transaction Count</th>
                    </tr>
                    </thead>
                    <tbody>
                    {data && data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.ticker}</td>
                            <td>{item.txCount}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Table;


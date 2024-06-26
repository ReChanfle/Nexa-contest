import React from 'react';
import '../../src/css/table.css';
const Table = ({ data }) => {

    return (
        <div className="table-container">
            <table className="table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Ticker</th>
                    <th>Transaction Count</th>
                </tr>
                </thead>
                <tbody>
                { data && (
                    data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.name}</td>
                            <td>{item.ticker}</td>
                            <td>{item.txCount}</td>
                        </tr>
                    ))
                ) }
                </tbody>
            </table>
        </div>
    );
};

export default Table;
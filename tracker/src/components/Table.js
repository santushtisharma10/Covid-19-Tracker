import React from 'react';

const Table = ({countriesData}) => {
    return (
        <div className='table'>
            {countriesData.map(({country, cases}) => (

                <tr>
                    <td>{country}</td>
                    <td>{cases}</td>
                </tr>
            )
            )}
        </div>
    );
};

export default Table;


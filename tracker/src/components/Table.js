import React from 'react';
import numeral from 'numeral';

const Table = ({countriesData}) => {
    return (
        <div className='table'>
            {countriesData.map(({country, cases}) => (

                <tr>
                    <td>{country}</td>
                    <td>{numeral(cases).format(0,0)}</td>
                </tr>
            )
            )}
        </div>
    );
};

export default Table;


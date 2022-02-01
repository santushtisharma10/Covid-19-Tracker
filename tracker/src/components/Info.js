import React from 'react';
import {Card, CardContent} from "@material-ui/core"

function Info({title, active, changeRed, cases, total, ...props}) {
    return (
        <div className="info">
            <Card className={`${active && "info-green"} ${active && changeRed && "info-red"}`} onClick={props.onClick} >
                <CardContent>
                    <h4 className="info-title" >{title}</h4>
                    <h2 className={`info-cases ${!changeRed && "info-green-cases"}`}>{cases}</h2>
                    <h4 className='info-total' color="textSecondary">{total}</h4>
                </CardContent>
            </Card>
        </div>
    )
}

export default Info;

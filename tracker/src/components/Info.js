import React from 'react';
import {Card, CardContent, Typography} from "@material-ui/core"

function Info({title, cases, total}) {
    return (
        <div>
            <Card className="info">
                <CardContent>
                    <Typography className="title" color="textSecondary">{title}</Typography>
                    <h2 className='cases'>{cases}</h2>
                    <Typography className='total' color="textSecondary">{total}</Typography>
                </CardContent>
            </Card>
        </div>
    )
}

export default Info;

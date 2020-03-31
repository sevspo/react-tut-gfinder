import React, { Fragment } from 'react'
import spinner from './spinner.gif'

const Spinner = () => {
    return (
        <Fragment>
            <div class="lds-ripple"><div></div><div></div></div>
        </Fragment>
    )
}

export default Spinner


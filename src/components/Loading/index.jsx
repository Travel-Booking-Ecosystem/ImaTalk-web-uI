import "./style.scss";
import React from "react";

export default function ({ loading }) {

    if (!loading) {
        return null;
    }
    
    return (
        <div className="Loading">
            {/* <div className="background"></div> */}
            <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
        </div>
    )
}
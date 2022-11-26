import React from 'react'
import "./Loader.scss"
const Loader = ({ size, height, border, className, color }) => {
    return (
        <div className={`loadingio-spinner-rolling-daoiuzlm498 ${className}`} style={{ height: height }}>
            <div className="ldio-gcsicpsikdq">
                <div style={{ height: size, width: size, borderWidth: border, borderBottomColor: color, borderRightColor: color, borderLeftColor: color }} ></div>
            </div>
        </div>
    )
}

export default Loader
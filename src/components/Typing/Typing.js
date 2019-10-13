import React from 'react';

import './typing.css';

const Typing = ({ typing }) => (
    <div className="messageContainer justifyStart">
        <div>
            <span className="loadingDots">
                <span className="dot1"></span>
                <span className="dot2"></span>
                <span className="dot3"></span>
            </span>
        </div>
        <span className="sentText pl-10">{typing}</span>
    </div> 
)

export default Typing;
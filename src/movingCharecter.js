import React from "react";
import './movingCharacter.css'
// import database from "./FireBaseConfig";
// import { ref, set } from "firebase/database";

const MovingCharacter = (props) => {

    console.log("these are the props",props)
    return (
        <>
            <div id="character" className="character" style={{ backgroundColor: props.color , left : props.x, top : props.y }}>
                <div className="light" ></div>
            </div>
        </>
    );
};

export default MovingCharacter;

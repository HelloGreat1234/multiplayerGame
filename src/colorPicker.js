import React, { useState } from "react";

const ColorPicker = () => {

    const [color,setColor] = useState("red")

    const changeColor = (e) => {
        const newColorValue = e.target.value
        console.log(newColorValue)
        setColor(newColorValue)
    }

    return(
        <>
        <div style={{backgroundColor : color}} >
            Hello
        </div>

        <input type="color" onChange={changeColor}/>
        </>
    );
}

export default ColorPicker;
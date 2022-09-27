import React, {useEffect, useRef, useState} from "react"
import { useDispatch } from "react-redux";

import { dragRefWith, resizeRefWith} from '../../utils/windowUtils';


//Possible ways to forward ref of the window to the App component
//Method 1 Failed
//2. Forward the ref from app using React.forwardRef

type GenericXPWindowProps = {
    //Title of the window
    text: string
    //Component children
    children?: React.ReactNode
    width?: number
    height?: number
    //Starting offset from left of screen
    offsetX?: number
    //Starting offset from top of screen
    offsetY?: number
    
}

export const GenericXPWindow = (
    {text, children, width, height, offsetX, offsetY}: GenericXPWindowProps, 
) => {
    const windowRef = useRef<HTMLDivElement>(null);
    const titleBarRef = useRef<HTMLDivElement>(null);


    //TODO: Find way to change restrictions when browser window is resized
    useEffect(() => {
        dragRefWith(windowRef, titleBarRef)
    }, [])

    //NOTE: Use relative or absolute position for window
    return (
        <div className="window" style={{
            "position": "absolute",
            "height": height ? `${height}px`: "500px", 
            "width": width ? `${width}px` : "500px", 
            "top": offsetY ? `${offsetY}px` : "10px",
            "left": offsetX ? `${offsetX}px` : "10px"}} ref={windowRef}>
            <div className='title-bar' ref={titleBarRef}>
                <div className='title-bar-text' style={{"margin": "0.25rem"}}>{text}</div>
                <div className="title-bar-controls">
                    <button aria-label="Close" />
                </div>
            </div>
            {children}
        </div>
    );
}

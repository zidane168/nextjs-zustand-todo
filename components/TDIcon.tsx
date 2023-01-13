interface IConAttribute { 
    bgColor: string;
    width: number
}

export const TDEditIcon = ({ bgColor, width } : IConAttribute ) => {
    return (
        <>   
            <svg width={ width } height={ width }   viewBox="0 0 48 48"  xmlns="http://www.w3.org/2000/svg">
                <path
                    fill = { bgColor }
                    d="M6 34.5v7.5h7.5l22.13-22.13-7.5-7.5-22.13 22.13zm35.41-20.41c.78-.78.78-2.05 0-2.83l-4.67-4.67c-.78-.78-2.05-.78-2.83 0l-3.66 3.66 7.5 7.5 3.66-3.66z"/>
                <path d="M0 0h48v48h-48z" fill="none"/>
            </svg>
        </> 
    )
} 

export const TDMarkCompleteIcon = ({ bgColor, width } : IConAttribute ) => {
    return (
        <>   
            <svg 
                width = { width }
                height = { width }
                viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
                <title/>
                <g>
                    <path 
                        fill={ bgColor }
                        d="M58.3945,32.1563,42.9961,50.625l-5.3906-6.4629a5.995,5.995,0,1,0-9.211,7.6758l9.9961,12a5.9914,5.9914,0,0,0,9.211.0059l20.0039-24a5.9988,5.9988,0,1,0-9.211-7.6875Z"/>
                    <path 
                        fill={ bgColor } 
                        d="M48,0A48,48,0,1,0,96,48,48.0512,48.0512,0,0,0,48,0Zm0,84A36,36,0,1,1,84,48,36.0393,36.0393,0,0,1,48,84Z"/>
                </g>
            </svg>
        </> 
    )
} 

export const TDRemoveIcon = ({ bgColor, width } : IConAttribute ) => {
    return (
        <> 
            <svg 
              width={ width }    // them width height moi co the hien thi dc
              height={ width }
              fillstyle="enable-background:new 0 0 24 24;" version="1.1" viewBox="0 0 24 24"   xmlns="http://www.w3.org/2000/svg">
              <g id="info"/>
                <g id="icons">
                    <g id="delete">
                        <path fill={ bgColor } d="M18.9,8H5.1c-0.6,0-1.1,0.5-1,1.1l1.6,13.1c0.1,1,1,1.7,2,1.7h8.5c1,0,1.9-0.7,2-1.7l1.6-13.1C19.9,8.5,19.5,8,18.9,8z"/>
                        <path fill={ bgColor } d="M20,2h-5l0,0c0-1.1-0.9-2-2-2h-2C9.9,0,9,0.9,9,2l0,0H4C2.9,2,2,2.9,2,4v1c0,0.6,0.4,1,1,1h18c0.6,0,1-0.4,1-1V4    C22,2.9,21.1,2,20,2z"/>
                    </g>
                </g>
            </svg>   
        </> 
    )
} 
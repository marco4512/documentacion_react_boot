import React from "react";
import styled from 'styled-components';

function Frames(){
    return(
        <>
        <SFrames>
            <div className="hold">

            </div>
        </SFrames>
        </>
    )
}
export default Frames;
const SFrames = styled.nav`
.hold{
    width: 100vw;
    height: 100vh;
    background-color: #282c34;
}
`
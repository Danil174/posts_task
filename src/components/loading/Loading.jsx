import React from 'react';
import styled from 'styled-components';

const Ring = styled.div`
    display: inline-block;
    width: 8rem;
    height: 8rem;

    :after {
        content: " ";
        display: block;
        width: 6.4rem;
        height: 6.4rem;
        margin: 8px;
        border-radius: 50%;
        border: 6px solid ${props => props.theme.postBlue};
        border-color: ${props => props.theme.postBlue} transparent ${props => props.theme.postBlue} transparent;
        animation: ring 1.2s linear infinite;
    }

    @keyframes ring {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const Loading = () => {
    return <Ring />;
}

export default Loading;
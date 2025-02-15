import styled from "styled-components";

export const DefaultStyle = styled.div``;

export const LocalStyle = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 16px;
`;

export const TouristStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;

    & > div {
        max-width: 200px;
        width: 100%;
    }
`;

export const BlaStyle = styled.div`
    display: flex;
    flex-direction: column;
    gap: 156px;
`;
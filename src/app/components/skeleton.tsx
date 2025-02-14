import React from "react";
import styled from "styled-components";

const SkeletonContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const SkeletonCard = styled.div`
    width: 100%;
    height: 120px;
    background-color: #e0e0e0;
    border-radius: 8px;
`;

const Skeleton = () => (
    <SkeletonContainer>
        {Array.from({ length: 7 }).map((_, i) => <SkeletonCard key={i} />)}
    </SkeletonContainer>
);

export default Skeleton;
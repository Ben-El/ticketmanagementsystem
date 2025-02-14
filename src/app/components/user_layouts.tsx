import React from "react";
import styled from "styled-components";
import { UserType } from "@/app/types/ticket";
import {USER_TYPE} from "@/app/components/constants/consts";

const DefaultLayout = styled.div``;

const UserLayouts: Record<UserType, React.ElementType> = {
    [USER_TYPE.LOCAL]: styled.div`
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 16px;
    `,
    [USER_TYPE.TOURIST]: styled.div`
        display: flex;
        flex-direction: column;
        gap: 16px;

        & > div {
            max-width: 200px;
            width: 100%;
        }
    `,
    [USER_TYPE.BLA]: styled.div`
        display: flex;
        flex-direction: column;
        gap: 156px;
    `,
};

export const getUserLayout = (userType: UserType) => UserLayouts[userType] || DefaultLayout;

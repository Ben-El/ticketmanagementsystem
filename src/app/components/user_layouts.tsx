import React from "react";
import { UserType } from "@/app/types/ticket";
import {USER_TYPE} from "@/app/components/constants/consts";
import {BlaStyle, DefaultStyle, LocalStyle, TouristStyle} from "@/app/components/user_styles";

const UserLayouts: Record<UserType, React.ElementType> = {
    [USER_TYPE.LOCAL]: LocalStyle,
    [USER_TYPE.TOURIST]: TouristStyle,
    [USER_TYPE.BLA]: BlaStyle,
};

export const getUserLayout = (userType: UserType) => UserLayouts[userType] || DefaultStyle;

import {USER_TYPE} from "@/app/components/constants/consts";

export type UserType = typeof USER_TYPE[keyof typeof USER_TYPE];

export type Ticket = {
    id: string;
    title: string;
    description: string;
    date: string;
    location: string;
    image?: string;
};
import { UserType } from "@/app/types/ticket";
import {USER_TYPE} from "@/app/components/constants/consts";

export type UserConfig = {
    showImage: boolean;
    descriptionLength: number;
    showDate: boolean;
};

export const defaultUserConfig: UserConfig = {
    showImage: false,
    descriptionLength: 50,
    showDate: true,
} as const;

export const UserTypeConfigs: Record<UserType, UserConfig> = {
    [USER_TYPE.LOCAL]: {
        showImage: false,
        descriptionLength: Infinity,
        showDate: true,
    },
    [USER_TYPE.TOURIST]: {
        showImage: true,
        descriptionLength: 35,
        showDate: false,
    },
    [USER_TYPE.BLA]: {
        showImage: false,
        descriptionLength: 40,
        showDate: false,
    },
} as const;

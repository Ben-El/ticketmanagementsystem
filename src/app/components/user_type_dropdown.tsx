import React, {useCallback} from "react";
import {useRouter} from "next/navigation";
import {USER_TYPE} from "@/app/components/constants/consts";
import {UserType} from "@/app/types/ticket";

const UserTypeDropdown = ({ userType }: {  userType: UserType }) => {
    const router = useRouter();

    const onUserTypeChange = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
        const newUserType = e.target.value as UserType;
        router.push(`?userType=${newUserType}`, { scroll: false });
    }, [router]);

    return (
        <select value={userType} onChange={onUserTypeChange}>
            {Object.entries(USER_TYPE).map(([key, value]) => (
                <option key={value} value={value}>{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}</option>
            ))}
        </select>
    );
}

export default UserTypeDropdown;

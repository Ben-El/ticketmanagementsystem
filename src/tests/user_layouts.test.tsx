import { getUserLayout } from "@/app/components/user_layouts";
import { USER_TYPE } from "@/app/components/constants/consts";
import {UserType} from "@/app/types/ticket";

describe("getUserLayout", () => {
    it("should return correct layout for LOCAL userType", () => {
        const Layout = getUserLayout(USER_TYPE.LOCAL);
        expect(Layout).toBeDefined();
    });

    it("should return default layout for an unknown userType", () => {
        const invalidUserType = "nonexistent_user_type" as UserType;
        const Layout = getUserLayout(invalidUserType);
        expect(Layout).toBeDefined();
    });
});

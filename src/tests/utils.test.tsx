import {getTodayDate} from "@/app/components/utils";

describe("getTodayDate", () => {
    it("should return today's date in YYYY-MM-DD format", () => {
        const expectedDate = new Date().toISOString().split("T")[0];
        const result = getTodayDate();
        expect(result).toBe(expectedDate);
    });

    it("should return a valid date format", () => {
        const result = getTodayDate();
        expect(result).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
});

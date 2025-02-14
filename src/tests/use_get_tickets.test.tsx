import { renderHook, act } from "@testing-library/react";
import { useGetTickets } from "@/app/components/use_get_tickets";
import useSWRInfinite from "swr/infinite";

jest.mock("swr/infinite", () => ({
    __esModule: true,
    default: jest.fn(),
}));

describe("useGetTickets Hook", () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("should return initial state", () => {
        (useSWRInfinite as jest.Mock).mockReturnValue({
            data: undefined,
            isValidating: false,
            error: null,
            setSize: jest.fn(),
        });

        const { result } = renderHook(() => useGetTickets(""));

        expect(result.current.tickets).toEqual([]);
        expect(result.current.hasMore).toBe(false);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBeNull();
    });

    it("should return tickets when data is available", () => {
        const mockTickets = [
            { id: "1", title: "Event 1", description: "Description 1", date: "2024-02-14" },
            { id: "2", title: "Event 2", description: "Description 2", date: "2024-02-15" },
        ];

        (useSWRInfinite as jest.Mock).mockReturnValue({
            data: [{ tickets: mockTickets, hasMore: false }],
            isValidating: false,
            error: null,
            setSize: jest.fn(),
        });

        const { result } = renderHook(() => useGetTickets(""));

        expect(result.current.tickets).toEqual(mockTickets);
        expect(result.current.hasMore).toBe(false);
        expect(result.current.isLoading).toBe(false);
        expect(result.current.isError).toBeNull();
    });

    it("should indicate loading state when fetching", () => {
        (useSWRInfinite as jest.Mock).mockReturnValue({
            data: undefined,
            isValidating: true,
            error: null,
            setSize: jest.fn(),
        });

        const { result } = renderHook(() => useGetTickets(""));

        expect(result.current.isLoading).toBe(true);
    });

    it("should indicate error state when API fails", () => {
        const mockError = new Error("Failed to fetch");

        (useSWRInfinite as jest.Mock).mockReturnValue({
            data: undefined,
            isValidating: false,
            error: mockError,
            setSize: jest.fn(),
        });

        const { result } = renderHook(() => useGetTickets(""));

        expect(result.current.isError).toBe(mockError);
    });

    it("should load additional pages when requested", async () => {
        const mockTicketsPage = [{ id: "1", title: "Event 1" }];
        const setSizeMock = jest.fn();

        (useSWRInfinite as jest.Mock).mockReturnValue({
            data: [{ tickets: mockTicketsPage, hasMore: true }],
            isValidating: false,
            error: null,
            setSize: setSizeMock,
        });

        const { result } = renderHook(() => useGetTickets(""));

        expect(result.current.tickets).toEqual(mockTicketsPage);
        expect(result.current.hasMore).toBe(true);

        act(() => {
            result.current.setSize((prevSize) => prevSize + 1);
        });

        expect(setSizeMock).toHaveBeenCalledWith(expect.any(Function));
    });

    it("should accumulate tickets across multiple pages", () => {
        const mockTicketsPage1 = [{ id: "1", title: "Event 1" }];
        const mockTicketsPage2 = [{ id: "2", title: "Event 2" }];

        (useSWRInfinite as jest.Mock).mockReturnValue({
            data: [
                { tickets: mockTicketsPage1, hasMore: true },
                { tickets: mockTicketsPage2, hasMore: false },
            ],
            isValidating: false,
            error: null,
            setSize: jest.fn(),
        });

        const { result } = renderHook(() => useGetTickets(""));

        expect(result.current.tickets).toEqual([...mockTicketsPage1, ...mockTicketsPage2]);
    });

    it("should not fetch more pages if hasMore is false", async () => {
        const setSizeMock = jest.fn();

        (useSWRInfinite as jest.Mock).mockReturnValue({
            data: [{ tickets: [{ id: "1", title: "Event 1" }], hasMore: false }],
            isValidating: false,
            error: null,
            setSize: setSizeMock,
        });

        const { result } = renderHook(() => useGetTickets(""));

        act(() => {
            result.current.setSize((prevSize) => prevSize + 1);
        });

        expect(setSizeMock).toHaveBeenCalledTimes(1);
    });

    it("should not re-fetch data if search term does not change", () => {
        (useSWRInfinite as jest.Mock).mockReturnValue({
            data: [{ tickets: [{ id: "1", title: "Event 1" }], hasMore: true }],
            isValidating: false,
            error: null,
            setSize: jest.fn(),
        });

        const { result, rerender } = renderHook(({ search }) => useGetTickets(search), {
            initialProps: { search: "Event" },
        });

        const firstResult = result.current.tickets;

        rerender({ search: "Event" });

        expect(result.current.tickets).toStrictEqual(firstResult);
    });
});

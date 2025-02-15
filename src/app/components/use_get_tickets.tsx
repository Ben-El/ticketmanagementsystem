import useSWRInfinite from "swr/infinite";
import { Ticket } from "@/app/types/ticket";
import { TICKETS_PARAMS } from "@/app/components/constants/consts";

const fetcher = async (url: string) => {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed to fetch tickets.");
    return response.json();
};

const getKey = (searchInput: string) =>
    (pageIndex: number, previousPageData: { tickets: Ticket[], hasMore: boolean } | null) => {
        if (previousPageData && !previousPageData.hasMore) return null;
        return `/api/tickets?${TICKETS_PARAMS.PAGE}=${pageIndex + 1}&${TICKETS_PARAMS.SEARCH_INPUT}=${searchInput}`;
    };

export const useGetTickets = (searchInput: string) => {
    const { data, setSize, isValidating, error } = useSWRInfinite(
        getKey(searchInput),
        fetcher,
        { revalidateFirstPage: false, shouldRetryOnError: false }
    );

    return {
        tickets: data ? data.flatMap(page => page.tickets) : [],
        hasMore: data?.[data.length - 1]?.hasMore || false,
        isError: error,
        isLoading: isValidating,
        setSize,
    };
};

import useSWRInfinite from "swr/infinite";
import { Ticket } from "@/app/types/ticket";
import { TICKETS_PARAMS } from "@/app/components/constants/consts";

export const useGetTickets = (searchInput: string) => {
    const fetcher = (url: string) => fetch(url).then((res) => res.json());

    const getKey = (pageIndex: number, previousPageData: { tickets: Ticket[], hasMore: boolean } | null) => {
        if (previousPageData && !previousPageData.hasMore) return null;
        return `/api/tickets?${TICKETS_PARAMS.PAGE}=${pageIndex + 1}&${TICKETS_PARAMS.SEARCH_INPUT}=${searchInput}`;
    };

    const { data, setSize, isValidating, error } = useSWRInfinite(
        (index, prev) => getKey(index, prev),
        fetcher,
        { revalidateFirstPage: false,  shouldRetryOnError: false }
    );

    return {
        tickets: data ? data.flatMap(page => page.tickets) : [],
        hasMore: data?.[data.length - 1]?.hasMore || false,
        isError: error,
        isLoading: isValidating,
        setSize,
    };
};

"use client";

import React, {useEffect, useState} from "react";
import styled from "styled-components";
import DOMPurify from "dompurify";
import {EMPTY_STRING, TICKETS_PARAMS, USER_TYPE} from "@/app/components/constants/consts";
import {FAILED_LOAD_TICKETS, Message, NO_TICKETS_FOUND} from "@/app/components/constants/messages";
import { useSearchParams } from "next/navigation";
import { useGetTickets } from "@/app/components/use_get_tickets";
import { useInView } from "react-intersection-observer";
import { UserType } from "@/app/types/ticket";
import SearchInputBox from "@/app/components/search_input_box";
import Skeleton from "@/app/components/skeleton";
import Tickets from "@/app/components/tickets";
import useDebouncedValue from "@/app/components/useDebouncedValue";
import UserTypeDropdown from "@/app/components/user_type_dropdown";

const Container = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
`;

const HeadWrapper = styled.div`
    display: flex;
    gap: 16px;
`;

const App = () => {
    const searchParams = useSearchParams();
    const { ref, inView } = useInView({ threshold: 1.0 });
    const [searchInput, setSearchInput] = useState(EMPTY_STRING);
    const [sanitizedSearch, setSanitizedSearch] = useState(EMPTY_STRING);
    const debouncedSearch = useDebouncedValue(sanitizedSearch, 500);
    const userType = (searchParams.get(TICKETS_PARAMS.USER_TYPE) as UserType) || USER_TYPE.LOCAL;

    const { tickets, hasMore, isLoading, isError, setSize } = useGetTickets(debouncedSearch);

    const showSkeleton = isLoading && !tickets.length && !debouncedSearch;
    const noResults = !isLoading && !tickets.length;

    useEffect(() => {
        setSanitizedSearch(prev => {
            const cleanInput = DOMPurify.sanitize(searchInput);
            return prev !== cleanInput ? cleanInput : prev;
        });
    }, [searchInput]);

    useEffect(() => {
        if (inView && hasMore && !isLoading) {
            setSize(prev => prev + 1).catch(() => {});
        }
    }, [inView, hasMore, isLoading, setSize]);

    return (
        <Container>
            <HeadWrapper>
                <UserTypeDropdown userType={userType}/>
                <SearchInputBox setSearchInput={setSearchInput} />
            </HeadWrapper>
            { showSkeleton ? (
                <Skeleton />
            ) : noResults ? (
                <Message>{NO_TICKETS_FOUND}</Message>
            ) : isError ? (
                <Message>{FAILED_LOAD_TICKETS}</Message>
            ) : (
                <Tickets tickets={tickets} userType={userType} />
            )}
            <div ref={ref}></div>
        </Container>
    );
};

export default App;

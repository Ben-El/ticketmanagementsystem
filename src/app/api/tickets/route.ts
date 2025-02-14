import { Ticket } from "@/app/types/ticket";
import { NextResponse } from "next/server";
import {PAGE_SIZE, TICKETS_PARAMS, EMPTY_STRING} from "@/app/components/constants/consts";

const generateTickets = (count: number) =>
    Array.from({ length: count }, (__, i) => i + 1).map(i => ({
        id: `${i}`,
        title: `Event ticket ${i}`,
        description: `Description for event ${i}. This is a very nice description, a very lovely one.`,
        date: new Date().toISOString().split("T")[0],
        location: `Location ${i}`,
        image: `https://picsum.photos/200/200?random=${i}`,
    }));

const tickets: Ticket[] = generateTickets(150);

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get(TICKETS_PARAMS.PAGE) || "1");
    const search = searchParams.get(TICKETS_PARAMS.SEARCH_INPUT)?.toLowerCase() || EMPTY_STRING;

    let filteredTickets = tickets;

    if (search) {
        filteredTickets = filteredTickets.filter(ticket =>
            ticket.title.toLowerCase().includes(search) ||
            ticket.description.toLowerCase().includes(search)
        );
    }

    const startIndex = (page - 1) * PAGE_SIZE;
    const paginatedTickets = filteredTickets.slice(startIndex, startIndex + PAGE_SIZE);

    return NextResponse.json({
        tickets: paginatedTickets,
        total: filteredTickets.length,
        hasMore: startIndex + PAGE_SIZE < filteredTickets.length,
    });
}
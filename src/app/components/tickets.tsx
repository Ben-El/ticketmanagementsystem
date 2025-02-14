import React from "react";
import {Ticket, UserType} from "@/app/types/ticket";
import { getUserLayout } from "@/app/components/user_layouts";
import TicketCard from "@/app/components/ticket_card";

const Tickets = ({ tickets, userType }: { tickets: Ticket[], userType: UserType }) => {
    const Layout = getUserLayout(userType);

    return (
        <Layout>
            {tickets.map(ticket => (
                <TicketCard key={ticket.id} ticket={ticket} userType={userType} />
            ))}
        </Layout>
    );
};

export default Tickets;

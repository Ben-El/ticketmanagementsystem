import Image from "next/image";
import styled from "styled-components";
import { EMPTY_STRING, THREE_DOTS } from "@/app/components/constants/consts";
import { defaultUserConfig, UserTypeConfigs } from "@/app/components/user_type_configs";
import { Ticket, UserType } from "@/app/types/ticket";

const Card = styled.div`
    padding: 16px;
    border: 1px solid #ddd;
    border-radius: 8px;
`;

const TicketCard = ({ ticket, userType }: { ticket: Ticket; userType: UserType }) => {
    const config = UserTypeConfigs[userType] || defaultUserConfig;

    return (
        <Card>
            {config.showImage && ticket.image && <Image src={ticket.image} alt={ticket.title} width={200} height={200} />}
            <h3>{ticket.title}</h3>
            <p>
                {ticket.description.slice(0, config.descriptionLength)}
                {config.descriptionLength < Infinity ? THREE_DOTS : EMPTY_STRING}
            </p>
            {config.showDate && <span>{ticket.date}</span>}
        </Card>
    );
};

export default TicketCard;

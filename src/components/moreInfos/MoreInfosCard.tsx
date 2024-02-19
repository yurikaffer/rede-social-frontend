import { Box } from "@mui/material";
import { MoreInfosCardContainer, MoreInfosCardLink } from "./MoreInfosStyles";

const MoreInfosCard: React.FC = () => {
    return (
        <Box width="100%" display="flex" justifyContent="center">
            <MoreInfosCardContainer>
                <MoreInfosCardLink href="#">Terms of Service</MoreInfosCardLink>
                <MoreInfosCardLink href="#">Privacy Policy</MoreInfosCardLink>
                <MoreInfosCardLink href="#">Cookie Policy</MoreInfosCardLink>
                <MoreInfosCardLink href="#">Accessibility</MoreInfosCardLink>
                <MoreInfosCardLink href="#">Ads Info</MoreInfosCardLink>
                <MoreInfosCardLink href="#">More...</MoreInfosCardLink>
            </MoreInfosCardContainer>
        </Box>
    );
};

export default MoreInfosCard;
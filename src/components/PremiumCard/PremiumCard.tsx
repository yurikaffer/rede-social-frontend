import { Box } from "@mui/material";
import { PremiumCardButton, PremiumCardContainer, PremiumCardText, PremiumCardTitle } from "./PremiumCardStyles";

const PremiumCard: React.FC = () => {
    return (
        <PremiumCardContainer>
            <Box width={'90%'}>
                <PremiumCardTitle>Assine o Premium</PremiumCardTitle>
                <Box borderBottom={1.8} borderColor='#323d45' width="111%" mt={1} />
                <PremiumCardText>Assine para desbloquear novos recursos e, se for elegível, receba uma parte da receita de anúncios.</PremiumCardText>
                <Box alignSelf={'center'} width={'100%'} padding={2}>
                    <PremiumCardButton>
                        Assinar
                    </PremiumCardButton>
                </Box>
            </Box>
        </PremiumCardContainer>
    );
};

export default PremiumCard;
import { Box, Button, Stack } from "@mui/material";
import { FC } from "react";

export type StepperNavigationProps = {
    activeStep: number,
    handleBack: () => void,
    onNextClick: () => void,
}

const StepperNavigation:FC<StepperNavigationProps> = 
    ({activeStep, handleBack, onNextClick}: StepperNavigationProps) => {
    
    return <Stack direction="row" mt={2}>
    {activeStep !== 0 &&
        <Button onClick={handleBack}>
            Anterior
        </Button>
    }
    <Box sx={{flex: '1 1 auto'}}/>
    <Button onClick={onNextClick}>
        {activeStep === 2 ? 'Comprar':'Siguiente'}
    </Button>
</Stack>
}

export default StepperNavigation;
import { FC } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";

type Props = {
  name: string;
  lastname: string;
  email: string;
  address1: string;
  city: string;
  state: string;
};
export const DetalleCompra: FC<Props> = ({
  name,
  lastname,
  email,
  address1,
  city,
  state

}) => {
  return (
    <Box>
      <Stack spacing={2} flexDirection="row" alignItems="center">
        <Card>
          <CardContent>
          <h4>Datos Personales</h4>
            <Typography variant="subtitle2" color="text.primary">
              {name} {lastname}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {email}
            </Typography>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <h4>Dirección de entrega</h4>
            <Typography variant="subtitle2" color="text.primary">
              {address1}
            </Typography>
            <Typography variant="body2" color="text.primary">
              {city} {state} 
            </Typography>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
};

import { CSS, ROUTES } from "@/Constants";
import { SELECTABLE_SERVICES } from "@/interfaces";
import {
  FormControl,
  InputLabel,
  Link,
  MenuItem,
  Select,
  Stack,
  TextField,
  type SelectChangeEvent,
} from "@mui/material";
import { ActionButton } from "../buttons";
import { Text } from "@chakra-ui/react";
import { useNavigationService, useRequestCallbackShortForm } from "@/hooks";

export const RequestCallbackShortForm = () => {
  const { toQuote } = useNavigationService();

  const {
    firstName,
    setFirstName,

    lastName,
    setLastName,

    phone,
    setPhone,

    service,
    setService,
  } = useRequestCallbackShortForm();

  return (
    <Stack
      sx={{
        bgcolor: CSS.colors.blue,
        width: "100%",

        p: 2,
        borderRadius: 5,
      }}
    >
      <Stack
        sx={{
          bgcolor: CSS.colors.white,
          width: "100%",
          height: "100%",
          borderRadius: 5,
          alignItems: "center",
          justifyContent: "start",
          p: 2,
        }}
        spacing={2}
      >
        <Text fontWeight={"bold"} fontSize={24}>
          Request Quote Callback
        </Text>

        <TextField
          required
          fullWidth
          label="First Name"
          placeholder="John"
          value={firstName}
          onChange={({ target: { value } }) => setFirstName(value)}
        />
        <TextField
          required
          fullWidth
          label="Last Name"
          placeholder="Doe"
          value={lastName}
          onChange={({ target: { value } }) => setLastName(value)}
        />
        <TextField
          required
          fullWidth
          label="Phone #"
          placeholder="(716) 222-333"
          value={phone}
          onChange={({ target: { value } }) => setPhone(value)}
        />

        <FormControl required fullWidth>
          <InputLabel id="service-label">Service</InputLabel>
          <Select
            labelId="service-label"
            id="service-select"
            value={service}
            label="Service"
            onChange={({ target: { value } }: SelectChangeEvent) =>
              setService(value)
            }
          >
            {SELECTABLE_SERVICES.map((serv) => (
              <MenuItem key={serv} value={serv}>
                {serv}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Stack
          direction={"row"}
          sx={{
            width: "100%",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Link
            onClick={(e) => (
              e.preventDefault(),
              toQuote({ firstName, lastName, phone, service })
            )}
            href={ROUTES.QUOTES}
            color="primary"
          >
            <Text>Tell us more about your vehicle</Text>
          </Link>
        </Stack>

        <ActionButton color="red">Request Call Now</ActionButton>
      </Stack>
    </Stack>
  );
};

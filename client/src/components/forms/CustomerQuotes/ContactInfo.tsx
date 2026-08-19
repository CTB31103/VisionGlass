import { RadioInput, SelectInput, TextInput } from "@/components/inputs";
import {
  useScreenSize,
  type UseCreateCustomerQuoteServiceResponse,
} from "@/hooks";
import { SERVICES } from "@/interfaces";
import { Stack } from "@mui/material";

type ContactInfoProps = {
  state: UseCreateCustomerQuoteServiceResponse["contactInfo"];

  tellUsMoreRadio?: boolean;
};

export const ContactInfo = ({
  state: {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    phone,
    setPhone,
    email,
    setEmail,
    tellUsMore,
    setTellUsMore,
    service,
    setService,
  },
  tellUsMoreRadio,
}: ContactInfoProps) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  return (
    <Stack spacing={2}>
      <Stack spacing={2} direction={sizeUnder.xs ? "column" : "row"}>
        <TextInput
          required
          label="First Name"
          value={firstName}
          setValue={setFirstName}
        />
        <TextInput
          required
          label="Last Name"
          value={lastName}
          setValue={setLastName}
        />
      </Stack>

      <Stack spacing={2} direction={sizeUnder.xs ? "column" : "row"}>
        <TextInput
          required
          label="Phone"
          placeholder="(xxx) xxx-xxxx"
          value={phone}
          setValue={setPhone}
        />
        <TextInput optional label="Email" value={email} setValue={setEmail} />
      </Stack>

      <Stack
        spacing={2}
        direction={
          sizeUnder.xs
            ? "column-reverse"
            : tellUsMoreRadio
              ? "row"
              : "row-reverse"
        }
      >
        {tellUsMoreRadio ? (
          <RadioInput
            label="Tell us more about your vehicle"
            boxLabel="Tell us more"
            checked={tellUsMore}
            onClick={() => setTellUsMore((prev) => !prev)}
          />
        ) : (
          <Stack sx={{ width: "100%" }} />
        )}
        <SelectInput
          required
          label="Service"
          selectedItem={service}
          onSelect={setService}
          items={SERVICES.map((service) => ({ value: service }))}
        />
      </Stack>
    </Stack>
  );
};

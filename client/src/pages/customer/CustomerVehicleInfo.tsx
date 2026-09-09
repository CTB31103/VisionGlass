import {
  ActionButton,
  Icons,
  LabledRowText,
  LargeSquareIcon,
  TBody,
  THeading,
} from "@/components";
import { ROUTES } from "@/Constants";
import { useScreenSize } from "@/hooks";
import { type ICustomerQuote } from "@/interfaces";
import { capitalize, damageInfoString } from "@/utils";
import { Link, Stack } from "@mui/material";
import { useEffect, useState } from "react";

type CustomerVehicleInfoProps = {
  customer: ICustomerQuote;
};

export const CustomerVehicleInfo = ({ customer }: CustomerVehicleInfoProps) => {
  const damageMainLocation = customer.damage?.location
    ? customer.damage.location
    : "";
  const damageSide = customer.damage?.windowSide ?? "";
  const damageRows = customer.damage?.rows ?? [];

  const { lessThanEqualTo } = useScreenSize();

  const [damageCardTitle, setDamageCardTitle] = useState(
    capitalize(
      damageInfoString(damageSide, damageMainLocation, damageRows, false),
    ),
  );

  useEffect(() => {
    setDamageCardTitle(
      capitalize(
        damageInfoString(damageSide, damageMainLocation, damageRows, false),
      ),
    );
  }, [damageSide, damageMainLocation, damageRows]);

  return (
    <Stack
      direction={lessThanEqualTo.xs ? "column" : "row"}
      spacing={4}
      sx={{ alignItems: lessThanEqualTo.xs ? "center" : "start" }}
    >
      <LargeSquareIcon Icon={Icons.Car} />

      <Stack spacing={0} sx={{ alignItems: "start", width: "100%" }}>
        <THeading>Vehicle Information</THeading>
        {customer.car ? (
          <Stack sx={{ width: "100%", alignItems: "start" }}>
            <LabledRowText
              bold="Car:"
              text={`${customer.car.year} ${customer.car.model} ${customer.car.make}`}
            />

            {customer.car.plateInfo && (
              <LabledRowText
                bold="Plate Number:"
                text={customer.car.plateInfo.plate}
              />
            )}
            {customer.car.plateInfo && (
              <LabledRowText
                bold="Zip Code:"
                text={customer.car.plateInfo.zip}
              />
            )}
            {customer.car.vin && (
              <LabledRowText bold="Vin:" text={customer.car.vin} />
            )}
            {customer.address && (
              <LabledRowText bold="Location:" text={customer.address} />
            )}

            {customer.damage && (
              <Stack sx={{ width: "100%", alignItems: "start" }}>
                {customer.damage.location && (
                  <LabledRowText
                    bold="Damage:"
                    text={capitalize(damageCardTitle)}
                  />
                )}
              </Stack>
            )}
          </Stack>
        ) : (
          <Stack spacing={2} sx={{ width: "100%", alignItems: "center" }}>
            <TBody>No vehicle information provided</TBody>
            <Link
              color="inherit"
              underline="none"
              href={ROUTES.CUSTOMERS_EDIT + `/${customer.customerQuoteId}`}
            >
              <ActionButton color="red">Add Vehicle Information</ActionButton>
            </Link>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
};

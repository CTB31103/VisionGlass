import { TBody, THeading } from "@/components";
import { Stack } from "@mui/material";
import { useState } from "react";
import { NumberedContactItem } from "./NumberedContactItem";

export const ShopLocations = () => {
  const [activeLocation, setActiveLocation] = useState(0);

  const locations: {
    title: string;
    address: string;
    phone: string;
    mobile: boolean;
    inShop: boolean;
    src: string;
  }[] = [
    {
      title: "Lockport NY",
      address: "7671 Tonawanda Creek Rd Lockport, NY 14094",
      phone: "(716) 336-7222",
      inShop: true,
      mobile: true,
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2914.1626960461294!2d-78.60829812372674!3d43.08007477113505!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d38325d5a8069d%3A0x5e3ea8f6ce32a902!2s7671%20Tonawanda%20Creek%20Rd%2C%20Lockport%2C%20NY%2014094!5e0!3m2!1sen!2sus!4v1786460033709!5m2!1sen!2sus",
    },
    {
      title: "Attica NY",
      address: "3364 E Main Street Rd Attica, NY 14011",
      phone: "(716) 336-7222",
      inShop: true,
      mobile: true,
      src: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2924.5334722628363!2d-78.26194772373765!3d42.861583071150726!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89d3c03826a0d1dd%3A0x16b1d6933928ace7!2s3364%20E%20Main%20Street%20Rd%2C%20Attica%2C%20NY%2014011!5e0!3m2!1sen!2sus!4v1786460820511!5m2!1sen!2sus",
    },
  ];

  return (
    <Stack direction={"row"}>
      <Stack
        sx={{
          width: "100%",
          paddingInline: 8,
          paddingBlock: 16,
        }}
        spacing={4}
      >
        <Stack spacing={0} sx={{ alignItems: "start" }}>
          <THeading align="center">Our Shop Locations</THeading>
          <TBody align="center">Availble in shop by appointment only</TBody>
        </Stack>

        {locations.map((loc, i) => (
          <NumberedContactItem
            key={i}
            number={i + 1}
            {...loc}
            active={i === activeLocation}
            onClick={() => setActiveLocation(i)}
          />
        ))}
      </Stack>

      <Stack
        sx={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          paddingInline: 4,
          paddingBlock: 8,
          position: "relative",
        }}
      >
        <iframe
          src={locations[activeLocation].src}
          width="100%"
          height="100%"
          style={{
            borderWidth: 0,
            borderTopLeftRadius: 25,
            borderBottomRightRadius: 25,
            position: "sticky",
            top: 0,
            maxHeight: "65vh",
          }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </Stack>
    </Stack>
  );
};

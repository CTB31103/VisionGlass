import { LOCATIONS } from "@/Constants";
import { Menu, type MenuProps } from "../inputs";

type LocationsMenuProps = Omit<MenuProps, "items"> & {};

export const LocationsMenu = (props: LocationsMenuProps) => {
  return (
    <Menu
      {...props}
      items={LOCATIONS.map((loc) => ({
        text: loc.title,
        linkPath: loc.linkPath,
      }))}
    />
  );
};

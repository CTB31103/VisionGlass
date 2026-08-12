import { produce } from "immer";
import { useEffect, useState } from "react";

const fullServiceAreas = {
  SouthCarolina: {
    viewMore: false,
    title: "South Carolina",
    items: ["Columbia", "Charleston"],
  },
  Florida: {
    viewMore: false,
    title: "Florida",
    items: [
      "Jacksonville",
      "Tampa",
      "West Palm Beach",
      "Fort Myers",
      "Naples",
      "Sarasota",
      "Bradenton",
      "Ocala",
      "Orlando",
      "Daytona",
    ],
  },
  Kentucky: {
    viewMore: false,
    title: "Kentucky",
    items: ["Louisville", "Lexington"],
  },
  Massachusetts: {
    viewMore: false,
    title: "Massachusetts",
    items: ["Springfield"],
  },
  Connecticut: {
    viewMore: false,
    title: "Connecticut",
    items: ["Windsor Locks"],
  },
  NewYork: {
    viewMore: false,
    title: "New York",
    items: [
      "Buffalo",
      "Rochester",
      "Syracuse",
      "Utica",
      "Albany",
      "Troy",
      "Schneidermanville",
      "Ithaca",
      "Watertown",
      "Ogdensburg",
    ],
  },
};

export type FullServiceAreasType = typeof fullServiceAreas;

export const useServiceAreas = () => {
  const [short, setShort] = useState(fullServiceAreas);

  useEffect(() => {
    setShort(
      produce(fullServiceAreas, (draft) => {
        for (const key in draft) {
          const item = draft[key as keyof typeof draft];
          item.viewMore = item.items.length > 3;
          item.items = item.items.slice(0, 3);
        }
      }),
    );
  }, []);

  return {
    short,
    full: fullServiceAreas,
  };
};

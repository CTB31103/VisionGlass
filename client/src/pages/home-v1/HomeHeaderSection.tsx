import { IMAGES_V1 } from "@/assets";
import { QuoteButton } from "@/components";
import { useScreenSize } from "@/hooks";
import { Center, Stack, Heading, Box } from "@chakra-ui/react";
import clsx from "clsx";

export const HomeHeaderSection = () => {
  const { lessThanEqualTo } = useScreenSize();
  return (
    <Box
      className="relative"
      display={"flex"}
      flexDirection={lessThanEqualTo.sm ? "column-reverse" : "row"}
      p={0}
      gap={0}
    >
      <Center
        className={clsx(
          "flex",
          lessThanEqualTo.sm
            ? "absolute top-0 left-0 w-full h-full z-2 translate-y-[25%]"
            : "flex-[.45]",
        )}
      >
        <Center className={clsx("text-center", lessThanEqualTo.sm ? "" : "")}>
          <Stack gap={2} className={lessThanEqualTo.sm ? "" : ""}>
            <Heading
              size={lessThanEqualTo.sm ? "5xl" : "6xl"}
              className="bungee-outline"
            >
              Vision Auto
              <br />
              Glass
            </Heading>

            <Heading size={"2xl"} fontWeight={"black"} className="text-outline">
              How Big Is Your Crack?
            </Heading>

            <QuoteButton />
          </Stack>
        </Center>
      </Center>

      <Box
        className={clsx(
          "flex relative overflow-hidden",
          lessThanEqualTo.sm ? "h-[65vh]" : "flex-[.65]",
        )}
      >
        <img
          style={{
            borderBottomLeftRadius: lessThanEqualTo.sm
              ? 0
              : window.innerWidth / 4,
          }}
          className="w-full"
          src={IMAGES_V1.WindowInstall}
          alt="Vision Auto Glass - Car Windshield Installation"
        />
        <div
          style={{
            background: lessThanEqualTo.sm
              ? "linear-gradient(180deg, rgba(48, 92, 222, 0%) 50%, #305CDE 100%)"
              : "linear-gradient(49.3deg, #305CDE 15%, rgba(26, 50, 120, 0%) 65%)",
          }}
          className="absolute top-0 left-0 w-full h-full"
        ></div>
      </Box>
    </Box>
  );
};

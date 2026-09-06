import { IMAGES } from "@/assets";
import {
  ActionButton,
  FullPage,
  HeroImage,
  Icons,
  TBody,
  THeading,
  Uploader,
} from "@/components";
import { CONSTANTS, CSS, ROUTES } from "@/Constants";
import { useApi, useScreenSize, useUploaderState } from "@/hooks";
import { useUserStore } from "@/stores";
import { Spinner } from "@chakra-ui/react";
import { Link, Stack, Tooltip } from "@mui/material";
import { useState } from "react";

export const Fairs = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  const user = useUserStore((state) => state.user);

  const {
    snackbar: [_, errorSnack],
    attatchmentRoutes,
  } = useApi();

  const [loading, setLoading] = useState(false);

  const uploader = async (selectedFiles: File[], reset: () => void) => {
    console.log(`Uploader: ${selectedFiles.length}`);
    if (selectedFiles.length !== 1) return;

    const formData = new FormData();
    formData.append("file", selectedFiles[0]);

    setLoading(true);

    const res = await attatchmentRoutes.uploadFairs(formData);

    setLoading(false);
    reset();

    if (res.err || !res.data) return errorSnack(res.err);
  };

  const { inputRef, onFileSelect } = useUploaderState(uploader);

  const toUrl = (urlPath: string) =>
    `http${CONSTANTS.api.isHttps() ? "s" : ""}://${CONSTANTS.api.hostname()}/${urlPath[0] === "/" ? urlPath.slice(1) : urlPath}`;

  return (
    <FullPage screen>
      <HeroImage src={IMAGES.Carnival}>
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            paddingInline: sizeUnder.sm ? 1 : undefined,
            paddingBlock: sizeUnder.sm ? 4 : undefined,
          }}
          spacing={2}
        >
          <Stack
            sx={{
              width: "100%",
              alignItems: "center",
              justifyContent: "center",
              color: CSS.colors.white,
            }}
          >
            <THeading large bungee align="center">
              Vision Glass
            </THeading>
            <THeading bungee thin align="center">
              Catch us at a fair near you!
            </THeading>
            <TBody medium bungee align="center">
              or
            </TBody>
          </Stack>
          <Link href={ROUTES.QUOTES}>
            <ActionButton color="red">Get your quote today!</ActionButton>
          </Link>
        </Stack>
      </HeroImage>

      <Stack
        sx={{
          paddingInline: 8,
          p: 8,
          alignItems: "center",
          width: "100%",
        }}
        spacing={4}
      >
        <Stack
          sx={{
            borderWidth: 2,
            borderColor: CSS.colors.black,
            borderRadius: 5,
            overflow: "hidden",

            width: "60vw",
            maxWidth: "60vw",
            minHeight: "10vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Spinner size={"xl"} />
          ) : (
            <img
              style={{ width: "100%" }}
              src={toUrl("/api/media/fairs")}
              onError={(e) => (e.currentTarget.style = "")}
              alt="Fairs-Schedule"
            />
          )}
        </Stack>

        {user.isRootUser && (
          <Stack
            sx={{ width: "60vw", alignItems: "end", position: "relative" }}
          >
            <Tooltip title="Only the root admin account may alter the fairs schedule photo">
              <Stack>
                <ActionButton
                  loading={loading}
                  onClick={() => inputRef.current?.click()}
                  color="red"
                  StartIcon={<Icons.Upload />}
                >
                  Upload new fair schedule
                </ActionButton>
              </Stack>
            </Tooltip>

            <Uploader ref={inputRef} onFileSelect={onFileSelect} />
          </Stack>
        )}
      </Stack>
    </FullPage>
  );
};

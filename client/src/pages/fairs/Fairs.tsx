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
import {
  useApi,
  useScreenSize,
  useTimeoutEffect,
  useUploaderState,
} from "@/hooks";
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
  const [imageError, setImageError] = useState(false);
  const [attempts, setAttempts] = useState(0);

  const uploader = async (selectedFiles: File[], reset: () => void) => {
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

  useTimeoutEffect(
    () => {
      if (imageError && attempts < 3) {
        setImageError(false);
        setAttempts((prev) => prev + 1);
      }
    },
    [imageError],
    5000,
  );

  const toUrl = (urlPath: string) =>
    `${CONSTANTS.api.url()}/${urlPath[0] === "/" ? urlPath.slice(1) : urlPath}`;

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
          p: 8,
          paddingInline: sizeUnder.xs ? 4 : 8,
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

            width: sizeUnder.xs ? undefined : "60vw",
            maxWidth: sizeUnder.xs ? undefined : "60vw",
            minHeight: "10vh",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {loading ? (
            <Spinner size={"xl"} />
          ) : imageError ? (
            <Stack sx={{ p: 2, width: "100%" }}>
              <TBody align="center">
                We are currently preparing our schedule for the upcoming season,
                please check back on this page later to see where we'll be next!
              </TBody>
            </Stack>
          ) : (
            <img
              style={{ width: "100%" }}
              src={toUrl("/api/media/fairs")}
              onError={(e) => (
                (e.currentTarget.style = ""),
                setImageError(true)
              )}
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
                  autoHeight={sizeUnder.xs}
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

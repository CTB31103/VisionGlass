import { Button, Stack } from "@mui/material";
import { BorderButton } from "./BorderButton";
import { Icons } from "../icons";
import { CSS } from "@/Constants";
import { useScreenSize, useTextSizingService } from "@/hooks";

type PlayButtonsProps = {
  onFastForward?: () => void;
  onNext?: () => void;
  onFastBackward?: () => void;
  onPrev?: () => void;
  onPlay?: () => void;
  paused?: boolean;
};

export const PlayButtons = ({
  onFastBackward,
  onFastForward,
  onNext,
  onPlay,
  onPrev,
  paused,
}: PlayButtonsProps) => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();
  const TextSize = useTextSizingService();

  const sx = sizeUnder.sm ? { fontSize: TextSize.medium1 } : {};
  return (
    <Stack
      sx={{ alignItems: "center", justifyContent: "center" }}
      spacing={sizeUnder.sm ? 1 : 2}
      direction={"row"}
    >
      {onFastBackward && (
        <BorderButton thin={sizeUnder.sm} onClick={onFastBackward} color="blue">
          <Icons.FastRewindIcon sx={sx} />
        </BorderButton>
      )}
      {onPrev && (
        <BorderButton thin={sizeUnder.sm} onClick={onPrev} color="blue">
          <Icons.ChevronLeft sx={sx} />
        </BorderButton>
      )}
      {onPlay && (
        <Button
          onClick={onPlay}
          variant="outlined"
          sx={{
            borderWidth: 1,
            borderColor: CSS.colors.blue,
            p: 2,
            paddingInline: sizeUnder.sm ? 1 : undefined,
            borderRadius: 50,
          }}
        >
          {paused ? <Icons.Pause sx={sx} /> : <Icons.Play sx={sx} />}
        </Button>
      )}
      {onNext && (
        <BorderButton thin={sizeUnder.sm} onClick={onNext} color="blue">
          <Icons.ChevronRight sx={sx} />
        </BorderButton>
      )}
      {onFastForward && (
        <BorderButton thin={sizeUnder.sm} onClick={onFastForward} color="blue">
          <Icons.FastForwardIcon sx={sx} />
        </BorderButton>
      )}
    </Stack>
  );
};

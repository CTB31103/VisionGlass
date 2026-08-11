import {
  BorderButton,
  Icons,
  StarRow,
  TBody,
  THeading,
  type StarRating,
} from "@/components";
import { CSS } from "@/Constants";
import { usePastReviews } from "@/hooks";
import { Button, Paper, Stack } from "@mui/material";
import { useState } from "react";

export const OurReviews = () => {
  const { allReviews } = usePastReviews();
  const [fast, setFast] = useState(false);
  const [paused, setPaused] = useState(false);
  const [forward, setForward] = useState(true);
  const [extraReviews, _setExtraReviews] = useState<
    {
      name: string;
      desc: string;
      stars: StarRating;
    }[]
  >([...allReviews, ...allReviews, ...allReviews, ...allReviews]);

  const setDirection = (
    regularDir: boolean = true,
    fasterSpeed: boolean = false,
  ): void => (
    setPaused(true),
    setForward(regularDir),
    setFast(fasterSpeed),
    setPaused(false)
  );

  return (
    <Stack
      sx={{
        alignItems: "center",
        paddingBlock: 8,
        paddingInline: 4,
      }}
      spacing={4}
    >
      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-50%); }
          }
        `}
      </style>
      <THeading>Our Reviews</THeading>

      <Stack
        sx={{
          width: "100%",
          maxWidth: "100%",
          overflow: "hidden",
          paddingBlock: 2,
        }}
      >
        <Stack
          onClick={() => setPaused((prev) => !prev)}
          direction={"row"}
          sx={{
            width: "max-content",
            transform: `translateX(calc(-50% - calc(var(--mui-spacing) * 1)))`,
            animation: `scroll ${fast ? "25" : "120"}s linear infinite`,
            animationDirection: forward ? "normal" : "reverse",
            color: CSS.colors.black,
            animationPlayState: paused ? "paused" : "running",
            cursor: "pointer",
          }}
          spacing={4}
        >
          {extraReviews.map((review, i) => (
            <Paper
              key={i}
              sx={{
                width: "50vw",
                bgcolor:
                  i === 0
                    ? "cyan"
                    : i % allReviews.length === 0
                      ? "red"
                      : CSS.colors.grey,

                border: 1,
                borderColor: CSS.colors.black,
                borderRadius: 5,
              }}
              elevation={2}
            >
              <Stack
                sx={{
                  p: 2.5,
                  width: "100%",
                }}
              >
                <TBody bold medium>
                  {review.name}
                </TBody>
                <StarRow filled={review.stars} />
                <TBody>{review.desc}</TBody>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Stack>

      <Stack
        sx={{ alignItems: "center", justifyContent: "center" }}
        spacing={2}
        direction={"row"}
      >
        <BorderButton onClick={() => setDirection(false, true)} color="blue">
          <Icons.FastRewindIcon />
        </BorderButton>
        <BorderButton onClick={() => setDirection(false, false)} color="blue">
          <Icons.ChevronLeft />
        </BorderButton>
        <Button
          onClick={() => setPaused((prev) => !prev)}
          variant="outlined"
          sx={{
            borderWidth: 1,
            borderColor: CSS.colors.blue,
            p: 2,
            borderRadius: 50,
          }}
        >
          {paused ? <Icons.Pause /> : <Icons.Play />}
        </Button>
        <BorderButton onClick={() => setDirection(true, false)} color="blue">
          <Icons.ChevronRight />
        </BorderButton>
        <BorderButton onClick={() => setDirection(true, true)} color="blue">
          <Icons.FastForwardIcon />
        </BorderButton>
      </Stack>
    </Stack>
  );
};

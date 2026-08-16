import {
  PlayButtons,
  StarRow,
  TBody,
  THeading,
  type StarRating,
} from "@/components";
import { CSS } from "@/Constants";
import { usePastReviews, useScreenSize } from "@/hooks";
import { Paper, Stack } from "@mui/material";
import { useRef, useState } from "react";

export const OurReviews = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();

  const { allReviews } = usePastReviews();
  const timeoutRef = useRef(0);
  const [fade, setFade] = useState(false);
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
  ): void => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setPaused(true);
    setFade(true);
    timeoutRef.current = setTimeout(() => {
      setForward(regularDir);
      setFast(fasterSpeed);
      setPaused(false);
      setFade(false);
    }, 250);
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        paddingBlock: sizeUnder.sm ? 4 : 8,
        paddingInline: sizeUnder.sm ? 2 : 4,
      }}
      spacing={sizeUnder.sm ? 2 : 4}
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
            animationDirection: !forward ? "normal" : "reverse",
            color: CSS.colors.black,
            animationPlayState: paused ? "paused" : "running",
            cursor: "pointer",

            opacity: fade ? 0 : 1,
            transition: "opacity .25s linear",
          }}
          spacing={4}
        >
          {extraReviews.map((review, i) => (
            <Paper
              key={i}
              sx={{
                width: sizeUnder.sm ? "85vw" : "50vw",
                bgcolor: CSS.colors.grey,
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

      <PlayButtons
        onFastBackward={() => setDirection(false, true)}
        onFastForward={() => setDirection(true, true)}
        onNext={() => setDirection(true, false)}
        onPlay={() => setPaused((prev) => !prev)}
        onPrev={() => setDirection(false, false)}
        paused={paused}
      />
    </Stack>
  );
};

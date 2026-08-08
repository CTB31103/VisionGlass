import { SelectableTriangles, QuoteButton } from "@/components";
import {
  Center,
  Stack,
  Heading,
  Box,
  Card,
  Text,
  RatingGroup,
} from "@chakra-ui/react";
import { IMAGES_V1 } from "@/assets";
import { useState } from "react";
import {
  ExactScreenSizeEnums,
  useExactScreenSizeValues,
  useNavigationService,
  useScreenSize,
  useTimeoutEffect,
} from "@/hooks";

export const HomeReviewsSection = () => {
  const { lessThanEqualTo } = useScreenSize();
  const { exactScreenSizeValues } = useExactScreenSizeValues();

  const { toContact } = useNavigationService();

  const [selected, setSelected] = useState(0);
  const [change, setChange] = useState(0);
  const [autoSelect, setAutoSelect] = useState(true);

  const reviews: { img: string; name: string; msg: string; rating: number }[] =
    [
      {
        img: IMAGES_V1.HappyDriver,
        rating: 5,
        name: "David Butler",
        msg: `Wyatt done a good job installing my windshield. It looks great. Scheduling was easy
        These guys are a lifesaver. Vision auto glass made my old van look like new, the windshield was so clean. These guys are who you want to call if you need a windshield put on they came all the way out to West Seneca for my install. I'd recommend them over the top dogs at Safelite any day.`,
      },
      {
        img: IMAGES_V1.HappyDriver2,
        rating: 5,
        name: "Diesel inc David Donda",
        msg: `Awesome experience from start to finish. Rj set my appointment and the next day Sammy the installer came out the to replace my windshield so I could trade it in. 5 stars all the way around!
  
  The dealership was going to dock me 1000+ dollars on the trade value for the crack if it wasn’t replaced and the dealership themselves were 3 weeks out for the same glass.
  
  Thanks you guys`,
      },
      {
        img: IMAGES_V1.HappyDriver3,
        rating: 5,
        name: "Michael Dodolak",
        msg: "Vision Auto Glass provided excellent service when I needed my windshield replaced. From the initial phone call, they were professional and courteous, clearly explaining the process and giving me a fair price quote. Scheduling was easy and they were able to fit me in quickly. The technician arrived on time, was friendly and efficient, and did a fantastic job. The new windshield looks perfect, and the entire replacement process was smooth and hassle-free. They even took the time to explain the recalibration process needed for my vehicle's safety features. I highly recommend Vision Auto Glass for anyone needing auto glass repair or replacement. Their quality of work and customer service are top-notch!",
      },
      {
        img: IMAGES_V1.HappyDriver4,
        rating: 5,
        name: "thedraftdoctor1",
        msg: "Spoke with Robert R. on Sunday about glass replacement. Scheduled us for the next day! Talk about quick service. Now Monday and both vehicles were done by 2:00pm. Exactly 24 hrs after scheduling. Installer was on time, friendly and worked quickly. OEM glass as promised. A+ job. Would definitely recommend.",
      },
      {
        img: IMAGES_V1.HappyDriver5,
        rating: 5,
        name: "Diane Waite",
        msg: "We were on vacation from Texas and had no clue who to call after a rock hit our windshield causing 2 good-sized cracks. We found this service by Googling. Three men were knowledgeable, efficient, and polite. Dave helped navigate the roiling waters of insurance coverage; Wyatt and Kenny came to us asap where Wyatt replaced the windshield within about 20 minutes then Kenny calibrated everything within another 15 min or so on our brand new '25 Toyota Camry. Great job. No problems. Vacation intact!! Thank you gentlemen.",
      },
      {
        img: IMAGES_V1.HappyDriver6,
        rating: 5,
        name: "Montez Simmons",
        msg: "The guys came out in the time-frame they promised, called to let me know when they were on the way and explained in detail what was happening when they arrived. The team was fast and efficient and were done replacing the windshield before we knew it. Job well done! Highly recommend.",
      },
    ];

  const reviewTextSize = exactScreenSizeValues(
    [[0, 350], ExactScreenSizeEnums.xs],
    ["md", "xl"],
    "3xl",
  );

  useTimeoutEffect(
    () => {
      if (autoSelect)
        setSelected((prev) => (prev < reviews.length - 1 ? prev + 1 : 0));
    },
    [selected, autoSelect],
    5000,
  );

  useTimeoutEffect(
    () => {
      setAutoSelect(true);
    },
    [change],
    lessThanEqualTo.sm ? 10000 : 7500,
  );

  const selectReview = (number?: number) => {
    setChange((prev) => prev + 1);
    setAutoSelect(false);
    if (number !== undefined) setSelected(number);
  };

  return (
    <Center className="w-full" paddingInline={lessThanEqualTo.sm ? 5 : 40}>
      <Stack gap={lessThanEqualTo.sm ? 10 : 20} className="w-full">
        <Heading
          textAlign={"center"}
          size={exactScreenSizeValues(
            [ExactScreenSizeEnums.xs],
            ["3xl"],
            "6xl",
          )}
          className="bungee"
        >
          Hear what others
          <br />
          have to say
        </Heading>

        <Stack gap={10} className="w-full">
          <SelectableTriangles
            imgs={
              reviews.map((review) => review.img).slice(0, 3) as [
                string,
                string,
                string,
              ]
            }
            selected={selected}
            setSelected={(clicked) => {
              console.log(`Clicked: ${clicked}`);
              if (clicked !== undefined) selectReview(clicked);
            }}
          />

          <Center>
            <Box className="min-w-[35vw] ">
              <Card.Root className="">
                <Card.Body>
                  <Stack paddingInline={lessThanEqualTo.sm ? 0 : 20}>
                    <Center>
                      <Box className="scale-150">
                        <RatingGroup.Root
                          readOnly
                          count={5}
                          defaultValue={reviews[selected].rating}
                          size={exactScreenSizeValues([[0, 350]], ["sm"], "lg")}
                        >
                          <RatingGroup.HiddenInput />
                          <RatingGroup.Control />
                        </RatingGroup.Root>
                      </Box>
                    </Center>
                    <Center className="w-full">
                      <Heading
                        textAlign={"center"}
                        className="bungee"
                        fontSize={reviewTextSize}
                      >
                        {reviews[selected].name}
                      </Heading>
                    </Center>

                    <Center>
                      <Text
                        whiteSpace={"pre-wrap"}
                        textAlign={"center"}
                        fontSize={reviewTextSize}
                      >
                        {reviews[selected].msg}
                      </Text>
                    </Center>
                  </Stack>
                </Card.Body>
              </Card.Root>
            </Box>
          </Center>

          <SelectableTriangles
            imgs={
              reviews.map((review) => review.img).slice(3) as [
                string,
                string,
                string,
              ]
            }
            selected={selected > 2 ? selected % 3 : undefined}
            setSelected={(clicked) => {
              console.log(`Clicked: ${3 + (clicked ?? 0)}`);
              if (clicked !== undefined) selectReview(3 + clicked);
            }}
          />

          <QuoteButton text="Leave your own review!" onClick={toContact} />
        </Stack>
      </Stack>
    </Center>
  );
};

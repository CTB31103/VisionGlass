import type { StarRating } from "@/components";
import { useState } from "react";

export const usePastReviews = () => {
  const allReviews: { name: string; desc: string; stars: StarRating }[] = [
    {
      stars: 5,
      name: "David Butler",
      desc: `Wyatt done a good job installing my windshield. It looks great. Scheduling was easy
            These guys are a lifesaver. Vision auto glass made my old van look like new, the windshield was so clean. These guys are who you want to call if you need a windshield put on they came all the way out to West Seneca for my install. I'd recommend them over the top dogs at Safelite any day.`,
    },
    {
      stars: 5,
      name: "Diesel inc David Donda",
      desc: `Awesome experience from start to finish. Rj set my appointment and the next day Sammy the installer came out the to replace my windshield so I could trade it in. 5 stars all the way around!
      
      The dealership was going to dock me 1000+ dollars on the trade value for the crack if it wasn’t replaced and the dealership themselves were 3 weeks out for the same glass.
      
      Thanks you guys`,
    },
    {
      stars: 5,
      name: "Michael Dodolak",
      desc: "Vision Auto Glass provided excellent service when I needed my windshield replaced. From the initial phone call, they were professional and courteous, clearly explaining the process and giving me a fair price quote. Scheduling was easy and they were able to fit me in quickly. The technician arrived on time, was friendly and efficient, and did a fantastic job. The new windshield looks perfect, and the entire replacement process was smooth and hassle-free. They even took the time to explain the recalibration process needed for my vehicle's safety features. I highly recommend Vision Auto Glass for anyone needing auto glass repair or replacement. Their quality of work and customer service are top-notch!",
    },
    {
      stars: 5,
      name: "thedraftdoctor1",
      desc: "Spoke with Robert R. on Sunday about glass replacement. Scheduled us for the next day! Talk about quick service. Now Monday and both vehicles were done by 2:00pm. Exactly 24 hrs after scheduling. Installer was on time, friendly and worked quickly. OEM glass as promised. A+ job. Would definitely recommend.",
    },
    {
      stars: 5,
      name: "Diane Waite",
      desc: "We were on vacation from Texas and had no clue who to call after a rock hit our windshield causing 2 good-sized cracks. We found this service by Googling. Three men were knowledgeable, efficient, and polite. Dave helped navigate the roiling waters of insurance coverage; Wyatt and Kenny came to us asap where Wyatt replaced the windshield within about 20 minutes then Kenny calibrated everything within another 15 min or so on our brand new '25 Toyota Camry. Great job. No problems. Vacation intact!! Thank you gentlemen.",
    },
    {
      stars: 5,
      name: "Montez Simmons",
      desc: "The guys came out in the time-frame they promised, called to let me know when they were on the way and explained in detail what was happening when they arrived. The team was fast and efficient and were done replacing the windshield before we knew it. Job well done! Highly recommend.",
    },
  ];

  const [index, setIndex] = useState(0);

  const onNext = () => {
    setIndex((prev) => (allReviews.length - 1 === prev ? 0 : prev + 1));
  };

  const onPrev = () => {
    setIndex((prev) =>
      0 === prev
        ? allReviews.length - 1 >= 0
          ? allReviews.length - 1
          : 0
        : prev - 1,
    );
  };

  return {
    allReviews,
    review: allReviews[index],
    onNext,
    onPrev,
  };
};

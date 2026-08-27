import moment from "moment";
import { IReview } from "../interfaces";
import { HashUtils } from "../utils";
import { ReviewModel } from "../models";

const randBtwn = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createReviews = async () => {
  for (let reviewData of REVIEWS) {
    const creation = moment(new Date())
      .subtract(randBtwn(0, 3), "days")
      .toDate();
    const review: IReview = {
      ...reviewData,
      createdOn: creation.getTime(),
      reviewId: HashUtils.uniqueId(),
    };
    await ReviewModel.create([review]);
  }
};

/**
  I am going to give you a typescript type used to format data; I want you to generate an array of 10 objects with values that fit their keys. Your generation should be in JSON suitable to be copied and pasted into a code editor. This is the typescript type:
  
  {
    person: {
      firstName: string;
      lastName: string;
      email: string;
      phone: string;
    };

    rating: number;
    message: string;

    createdOn: number;
  }
*/

const REVIEWS = [
  {
    person: {
      firstName: "John",
      lastName: "Doe",
      email: "johndoe@example.com",
      phone: "+1234567890",
    },
    rating: 5,
    message: "Excellent service!",
  },
  {
    person: {
      firstName: "Jane",
      lastName: "Smith",
      email: "janesmith@example.com",
      phone: "+9876543210",
    },
    rating: 4,
    message: "Good service, but slow!",
  },
  {
    person: {
      firstName: "Bob",
      lastName: "Johnson",
      email: "bobjohnson@example.com",
      phone: "+5551234567",
    },
    rating: 5,
    message: "Very good experience!",
  },
  {
    person: {
      firstName: "Alice",
      lastName: "Williams",
      email: "alicewilliams@example.com",
      phone: "+2223334444",
    },
    rating: 3,
    message: "Decent service, but with some issues.",
  },
  {
    person: {
      firstName: "Mike",
      lastName: "Davis",
      email: "mikedavis@example.com",
      phone: "+7778889999",
    },
    rating: 5,
    message: "Excellent customer service!",
  },
  {
    person: {
      firstName: "Emma",
      lastName: "Miller",
      email: "emmiller@example.com",
      phone: "+6667778888",
    },
    rating: 4,
    message: "Good experience, but with some delays.",
  },
  {
    person: {
      firstName: "Oliver",
      lastName: "Taylor",
      email: "olivertaylor@example.com",
      phone: "+5551234567",
    },
    rating: 3,
    message: "Satisfactory service, but not great.",
  },
  {
    person: {
      firstName: "Sophia",
      lastName: "White",
      email: "sophiawhite@example.com",
      phone: "+7778889999",
    },
    rating: 5,
    message: "Excellent service, highly recommended!",
  },
  {
    person: {
      firstName: "William",
      lastName: "Hall",
      email: "williamball@example.com",
      phone: "+2223334444",
    },
    rating: 4,
    message: "Good service, but some room for improvement.",
  },
  {
    person: {
      firstName: "Lily",
      lastName: "Martin",
      email: "lilymartin@example.com",
      phone: "+6667778888",
    },
    rating: 5,
    message: "Very good experience, would use again.",
  },
];

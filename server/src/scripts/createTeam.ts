import { IUser, UserType } from "../interfaces";
import { UserModel } from "../models";
import { HashUtils } from "../utils";

const coinFlip = () => Math.round(Math.random()) === 1;

const randBtwn = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createTeam = async () => {
  const userIds: string[] = [];
  for await (let person of PEOPLE) {
    const canBeAdmin = coinFlip();
    const userTypeNum = randBtwn(1, 3);
    let user: IUser = {
      userId: HashUtils.uniqueId(),
      username: `${person.firstName}${person.lastName}`.toLowerCase(),
      password: await HashUtils.encrypt(person.firstName),
      userType:
        userTypeNum === 1 && canBeAdmin
          ? UserType.ADMIN
          : userTypeNum === 3
            ? UserType.TECH
            : UserType.SALES,
      profilePictureId: "",
      info: person,
      isRootUser: false,
    };
    await UserModel.create(user);
    userIds.push(user.userId);
  }
  return userIds;
};

/**
  I am going to give you a typescript type used to format data; I want you to generate an array of 10 objects with values that fit their keys. Your generation should be in JSON suitable to be copied and pasted into a code editor. This is the typescript type:
  
  {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  }

  Use names that are more real sounding than typical dummy values, also make all phone numbers be from the buffalo area or florida area
*/
const PEOPLE = [
  {
    firstName: "Amanda",
    lastName: "Kowalski",
    email: "akowalsk@gmail.com",
    phone: "(716) 555-8901",
  },
  {
    firstName: "Ryan",
    lastName: "Garcia",
    email: "rgarcia123@yahoo.com",
    phone: "+1 (813) 234-5678",
  },
  {
    firstName: "Samantha",
    lastName: "Hernandez",
    email: "shernandez456@gmail.com",
    phone: "(716) 902-3456",
  },
  {
    firstName: "Christopher",
    lastName: "Martinez",
    email: "cmartinez789@yahoo.com",
    phone: "+1 (863) 567-8901",
  },
  {
    firstName: "Jennifer",
    lastName: "Woods",
    email: "jwoods123@gmail.com",
    phone: "(716) 345-6789",
  },
  {
    firstName: "Matthew",
    lastName: "Rodriguez",
    email: "mrodriguez456@yahoo.com",
    phone: "+1 (813) 234-5678",
  },
  {
    firstName: "Elizabeth",
    lastName: "Brown",
    email: "ebrown789@gmail.com",
    phone: "(716) 902-3456",
  },
  {
    firstName: "Jessica",
    lastName: "Davis",
    email: "jdavis123@yahoo.com",
    phone: "+1 (863) 567-8901",
  },
  {
    firstName: "Nicholas",
    lastName: "Walker",
    email: "nwalker456@gmail.com",
    phone: "(716) 345-6789",
  },
  {
    firstName: "Ashley",
    lastName: "Harris",
    email: "aharris789@yahoo.com",
    phone: "+1 (813) 234-5678",
  },
];

import moment from "moment";
import {
  CarDamageLocation,
  ICustomerQuote,
  IServiceType,
  UserType,
} from "../interfaces";
import { HashUtils, Log, toNearestHalfHour } from "../utils";
import { getAdmin } from "./createAdmin";
import { CarDamage, CustomerQuoteModel, UserModel } from "../models";

const coinFlip = () => Math.round(Math.random()) === 1;

const randBtwn = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const createCustomers = async () => {
  const customers: ICustomerQuote[] = [];
  const admin = await getAdmin();

  const salesUsers = await UserModel.find({ userType: UserType.SALES });
  const technicians = await UserModel.find({ userType: UserType.TECH });

  const randSales = () => salesUsers[randBtwn(0, salesUsers.length - 1)];
  const randTech = () => technicians[randBtwn(0, technicians.length - 1)];

  for (let i = 0; i < 10; i++) {
    const isScheduled = coinFlip();
    const isInsured = coinFlip();
    const callbackAsap = coinFlip();
    const gaveVin = coinFlip();
    const quoted = coinFlip();

    const sideDamage = coinFlip();

    const fullCoverage = i % 2 === 0;
    const price = randBtwn(100, 300);
    const taxed = price * (1 + randBtwn(7, 13) / 100);
    const shouldHavePrice = isScheduled || isInsured || quoted;

    const insurance = INSURANCE[i];
    const from = moment(toNearestHalfHour(new Date()))
      .hours(randBtwn(7, 19))
      .add(randBtwn(0, 3), "days")
      .toDate();
    const to = moment(from).add(30, "minutes").toDate();

    const eightAM = moment()
      .hours(7)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .toDate();
    const eightPM = moment()
      .hours(7 + 12)
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .toDate();
    const createdOn = moment()
      .subtract(randBtwn(0, 5), "days")
      .hours(randBtwn(7, 19))
      .minutes(0)
      .seconds(0)
      .milliseconds(0)
      .toDate()
      .getTime();

    const allServiceTypes: IServiceType[] = [
      "ADAS Calibration",
      "Auto Glass Replacement",
      "Crack & Chip Repair",
      "Windshield Replacement",
    ];

    const teamMembers = [randSales().userId];

    if (isScheduled && coinFlip()) {
      teamMembers.push(randTech().userId);
    }

    const customer: ICustomerQuote = {
      serviceType: allServiceTypes[randBtwn(0, 3)],
      customerQuoteId: HashUtils.uniqueId(),
      teamMembers: teamMembers,
      attatchments: [],
      status: isScheduled
        ? "scheduled"
        : isInsured
          ? "insurance_validated"
          : quoted
            ? "quoted"
            : "new",
      customer: PEOPLE[i],

      car: {
        ...CARS[i],
        vin: gaveVin ? VINS[i] : undefined,
        plateInfo: !gaveVin ? CAR_PLATES[i] : undefined,
      },
      damage: {
        location: sideDamage
          ? LOCATIONS[LOCATIONS.length - 1]
          : LOCATIONS[coinFlip() ? 1 : 0],
        windowSide: sideDamage ? (coinFlip() ? "left" : "right") : undefined,
        rows: sideDamage ? (coinFlip() ? [3] : [1, 2]) : undefined,
      },

      paymentInfo: shouldHavePrice
        ? {
            serviceAmount: price,
            serviceAmountAfterTax: taxed,
            type: isInsured ? "insurance" : "out_of_pocket",
            insurance: isInsured
              ? {
                  insuranceName: insurance.insuranceCompany,
                  policyNumber: insurance.policyNumber,
                  coverageAmount: fullCoverage
                    ? taxed
                    : randBtwn(price * 0.1, price * 0.75),
                  fullCoverage,
                }
              : undefined,
          }
        : undefined,

      address: isScheduled ? ADDRESSES[i] : undefined,
      meetingTime: isScheduled
        ? {
            from: from.getTime(),
            to: to.getTime(),
          }
        : undefined,

      callbackTime:
        !isScheduled && !isInsured
          ? {
              asap: callbackAsap,
              dayPrefrence: callbackAsap ? [] : ["Monday", "Tuesday", "Friday"],
              timePreference: callbackAsap
                ? undefined
                : {
                    from: eightAM.getTime(),
                    to: eightPM.getTime(),
                  },
            }
          : undefined,
      createdOn,
      notes: "",
    };

    customers.push(customer);
  }

  await CustomerQuoteModel.create(customers, {});
};

const LOCATIONS = [
  CarDamageLocation.BACK,
  CarDamageLocation.FRONT,
  CarDamageLocation.SIDE,
];

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
    firstName: "John",
    lastName: "Doe",
    email: "johndoe@example.com",
    phone: "1234567890",
  },
  {
    firstName: "Jane",
    lastName: "Smith",
    email: "janesmith@example.com",
    phone: "0987654321",
  },
  {
    firstName: "Bob",
    lastName: "Johnson",
    email: "bobjohnson@example.com",
    phone: "1112223333",
  },
  {
    firstName: "Alice",
    lastName: "Williams",
    email: "aliciawilliams@example.com",
    phone: "4445556666",
  },
  {
    firstName: "Mike",
    lastName: "Brown",
    email: "mikebrown@example.com",
    phone: "7778889999",
  },
  {
    firstName: "Emily",
    lastName: "Davis",
    email: "emilydavis@example.com",
    phone: "1234567890",
  },
  {
    firstName: "Tom",
    lastName: "Miller",
    email: "tommiller@example.com",
    phone: "0987654321",
  },
  {
    firstName: "Sarah",
    lastName: "Wilson",
    email: "sarahwilson@example.com",
    phone: "1112223333",
  },
  {
    firstName: "David",
    lastName: "Anderson",
    email: "davidanderson@example.com",
    phone: "4445556666",
  },
  {
    firstName: "Jessica",
    lastName: "Thomas",
    email: "jessicathomas@example.com",
    phone: "7778889999",
  },
];

const CARS = [
  {
    make: "Toyota",
    model: "Camry",
    year: 2015,
  },
  {
    make: "Honda",
    model: "Civic",
    year: 2018,
  },
  {
    make: "Ford",
    model: "Mustang",
    year: 2020,
  },
  {
    make: "Chevrolet",
    model: "Silverado",
    year: 2012,
  },
  {
    make: "Nissan",
    model: "Maxima",
    year: 2019,
  },
  {
    make: "Kia",
    model: "Optima",
    year: 2016,
  },
  {
    make: "Jeep",
    model: "Wrangler",
    year: 2017,
  },
  {
    make: "Hyundai",
    model: "Elantra",
    year: 2014,
  },
  {
    make: "Mazda",
    model: "3",
    year: 2021,
  },
  {
    make: "BMW",
    model: "320i",
    year: 2013,
  },
];

const CAR_PLATES = [
  {
    plate: "ABC123",
    zip: "12345",
  },
  {
    plate: "DEF456",
    zip: "67890",
  },
  {
    plate: "GHI789",
    zip: "34567",
  },
  {
    plate: "JKL012",
    zip: "90123",
  },
  {
    plate: "MNO345",
    zip: "45678",
  },
  {
    plate: "PQR789",
    zip: "23456",
  },
  {
    plate: "STU012",
    zip: "67890",
  },
  {
    plate: "VWX345",
    zip: "90123",
  },
  {
    plate: "YZZ456",
    zip: "23456",
  },
  {
    plate: "123ABC",
    zip: "56789",
  },
];

const INSURANCE = [
  {
    policyNumber: "POL-12345",
    insuranceCompany: "Allstate",
  },
  {
    policyNumber: "INS-67890",
    insuranceCompany: "Geico",
  },
  {
    policyNumber: "POL-23456",
    insuranceCompany: "State Farm",
  },
  {
    policyNumber: "INS-90123",
    insuranceCompany: "Progressive",
  },
  {
    policyNumber: "POL-34567",
    insuranceCompany: "Liberty Mutual",
  },
  {
    policyNumber: "INS-45678",
    insuranceCompany: "USAA",
  },
  {
    policyNumber: "POL-78901",
    insuranceCompany: "Nationwide",
  },
  {
    policyNumber: "INS-01234",
    insuranceCompany: "Esurance",
  },
  {
    policyNumber: "POL-56789",
    insuranceCompany: "Farmers",
  },
  {
    policyNumber: "INS-01235",
    insuranceCompany: "Amica Mutual",
  },
];

// Create an array of 10 strings, each string have it be an address of a popular bar in a popular city around the United States East Coast
const ADDRESSES = [
  "2300 Pennsylvania Ave NW, Washington, DC 20006",
  "45 W 32nd St, New York, NY 10011",
  "1315 4th St, Wilmington, DE 19805",
  "25 Broad St, Providence, RI 02903",
  "23 Bayside Dr, Newport, RI 02840",
  "21 Atlantic Pl, Boston, MA 02110",
  "113 W Main St, Wilmington, NC 28401",
  "301 E Queen St, Raleigh, NC 27601",
  "1201 Royal St, New Orleans, LA 70116",
  "1500 Broadway, New York, NY 10036",
];

// Create an array of 10 strings, each string have it be fake vin
const VINS = [
  "4G0ZZZT7X0N123456",
  "JHMKJHTG2P012345",
  "WDBKG14Y4R120000",
  "3WPEA12B43N567890",
  "5RFLGCV63P101112",
  "1FBLUHE7HFP23456",
  "GNDT27K8Y1M789012",
  "NHHVJZT6X0S345678",
  "9TDLDHJKLMP123456",
  "CDETRGFTUVWXYZ01",
];

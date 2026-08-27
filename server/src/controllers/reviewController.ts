import { IReview } from "../interfaces";
import { ReviewModel, RootFilterQuery } from "../models";
import { ConditionalUtils, HashUtils, Log, TryCatch } from "../utils";
import Validators from "../validators";
import ControllerFunc from "./controllerFunc";

const getReviews = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { validData: validPagination, errorMsg: paginationErr } =
        Validators.PaginationValidation.paginatedQuery(req.query);
      const { validData: validQuery, errorMsg: queryErr } =
        Validators.ReviewControllerValidators.getReviews(req.query);

      const pageNumber = ConditionalUtils.getPageNumber(
        validPagination?.pageNumber,
      );
      const pageLimit = ConditionalUtils.getPageLimit(
        validPagination?.pageLimit,
      );

      let databaseQuery: RootFilterQuery<IReview> = {
        $and: [],
      };
      let sort: { [key: string]: number } = {};

      if (validQuery?.query) {
        const regexQuery = { $regex: validQuery.query, $options: "i" };
        databaseQuery.$and!.push({
          $or: [
            {
              "person.firstName": regexQuery,
            },
            {
              "person.lastName": regexQuery,
            },
            {
              "person.email": regexQuery,
            },
            {
              "person.phone": regexQuery,
            },
            {
              message: regexQuery,
            },
          ],
        });
      }

      if (validQuery?.sortBy) {
        switch (validQuery.sortBy) {
          case "First Name":
            sort = { "person.firstName": 1 };
            break;
          case "Last Name":
            sort = { "person.lastName": 1 };
            break;
          case "Rating - High/Low":
            sort = { rating: -1 };
            break;
          case "Rating - Low/High":
            sort = { rating: 1 };
            break;
          case "Earliest First":
            sort = { createdOn: 1 };
            break;
          case "Most Recent First":
            sort = { createdOn: -1 };
            break;
          default:
            break;
        }
      }

      if (
        validQuery?.from &&
        validQuery?.to &&
        !Number.isNaN(parseInt(validQuery.from)) &&
        !Number.isNaN(parseInt(validQuery.to))
      ) {
        databaseQuery.$and!.push({
          createdOn: { $gte: parseInt(validQuery.from) },
        });
        databaseQuery.$and!.push({
          createdOn: { $lte: parseInt(validQuery.to) },
        });
      }

      const reviewsPagination = await ReviewModel.paginate(databaseQuery, {
        limit: pageLimit,
        page: pageNumber,
        sort,
      });

      res.send({
        reviews: reviewsPagination.docs.map((doc) => doc.toReview()),
        page: reviewsPagination.page ?? pageNumber,
        pageLimit: reviewsPagination.limit,
        total: reviewsPagination.totalDocs,
        totalPages: reviewsPagination.totalPages,
      });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const createReview = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { rating, person, message } =
        Validators.ReviewControllerValidators.create(req.body);

      const review: IReview = {
        reviewId: HashUtils.uniqueId(),
        message,
        person,
        rating,
        createdOn: new Date().getTime(),
      };

      await ReviewModel.create([review]);

      res.send({ review });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

export const ReviewController = {
  getReviews,
  createReview,
};

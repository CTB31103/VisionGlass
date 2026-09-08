import moment from "moment";
import {
  CustomerQuoteStatus,
  ICustomerQuote,
  IServiceType,
  SYSTEM_EVENTS,
  UserType,
} from "../interfaces";
import {
  AttatchmentModel,
  CalendarEventModel,
  CustomerQuote,
  CustomerQuoteModel,
  MongoDoc,
  RootFilterQuery,
  UserModel,
} from "../models";
import {
  CalendarEventUtils,
  HashUtils,
  ImageUtils,
  ISession,
  Log,
  SessionController,
  toMidnight,
  TryCatch,
} from "../utils";
import Validators from "../validators";
import { RULES, validationV2 } from "../validators/validate";
import ControllerFunc from "./controllerFunc";
import { produce } from "immer";

const getQuotes = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      Validators.TokenValidators.resLocalsTokenValues(res.locals);
      const { validData: validQueryData, errorMsg } = validationV2<{
        query?: string;

        status?: string[] | string;
        employee?: string;
        scheduledDate?: string;
      }>(
        {
          query: [RULES.common.optionalString, ""],

          status: [
            Array.isArray(req.query["status"])
              ? RULES.common.optionalArray
              : RULES.common.optionalString,
            "",
          ],
          employee: [RULES.common.optionalString, ""],
          scheduledDate: [RULES.common.optionalString, ""],
        },
        req.query,
      );

      const { pageLimit, pageNumber } =
        Validators.PaginationValidation.getPaginatedQuery(req.query);

      let databaseQuery: RootFilterQuery<ICustomerQuote> = {
        $and: [],
      };

      if (validQueryData?.query) {
        const regexQuery = { $regex: validQueryData.query, $options: "i" };
        const queryOr: RootFilterQuery<ICustomerQuote>["$or"] = [
          {
            "customer.firstName": regexQuery,
          },
          {
            "customer.lastName": regexQuery,
          },
          {
            "customer.email": regexQuery,
          },
          {
            "customer.phone": regexQuery,
          },
          {
            "car.make": regexQuery,
          },
          {
            "car.model": regexQuery,
          },
          {
            "paymentInfo.insurance.insuranceName": regexQuery,
          },
          {
            "paymentInfo.insurance.policyNumber": regexQuery,
          },
        ];

        if (!Number.isNaN(parseInt(validQueryData.query))) {
          queryOr.push({
            "car.year": parseInt(validQueryData.query),
          });
        }

        databaseQuery.$and!.push({ $or: queryOr });
      }

      if (validQueryData?.status) {
        const statusOr: RootFilterQuery<ICustomerQuote> = {
          $or: (typeof validQueryData.status === "string"
            ? [validQueryData.status]
            : validQueryData.status
          ).map((status) => ({
            status: status as CustomerQuoteStatus,
          })),
        };
        databaseQuery.$and!.push(statusOr);
      }

      if (validQueryData?.employee) {
        const employeeOr: RootFilterQuery<ICustomerQuote> = {
          teamMembers: validQueryData.employee,
        };

        databaseQuery.$and!.push(employeeOr);
      }

      if (
        validQueryData?.scheduledDate &&
        !Number.isNaN(parseInt(validQueryData.scheduledDate))
      ) {
        const midnight = toMidnight(
          moment(new Date(parseInt(validQueryData.scheduledDate))),
        );
        const nextDay = moment(midnight).add(1, "day").toDate();
        const dateOr: RootFilterQuery<ICustomerQuote> = {
          $and: [
            {
              "meetingTime.from": { $gte: midnight.getTime() },
            },
            {
              "meetingTime.from": { $lte: nextDay.getTime() },
            },
          ],
        };

        databaseQuery.$and!.push(dateOr);
      }

      const customerQuotesPaginationResult = await CustomerQuoteModel.paginate(
        databaseQuery,
        {
          limit: pageLimit,
          page: pageNumber,
        },
      );

      const customerQuotes = customerQuotesPaginationResult.docs.map((doc) =>
        doc.toCustomerQuote(),
      );

      res.send({
        customerQuotes,
        page: customerQuotesPaginationResult.page ?? pageNumber,
        pageLimit: customerQuotesPaginationResult.limit,
        total: customerQuotesPaginationResult.totalDocs,
        totalPages: customerQuotesPaginationResult.totalPages,
      });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const _createCustomerQuoteController = async (
  session: ISession,
  body: any,
  teamMembers: string[] = [],
  fromCustomer: boolean = false,
) => {
  const {
    customer,
    carInfo,
    damageInfo,
    address,
    paymentInfo,
    callbackTime,
    meetingTime,
    notes,
    serviceType,
  } = Validators.CustomerQuoteValidators.create(body);

  const customerQuoteData: ICustomerQuote = {
    fromCustomer,
    serviceType: serviceType as IServiceType,
    customerQuoteId: HashUtils.uniqueId(),
    teamMembers,
    calendarEvents: [],
    attatchments: [],
    status:
      meetingTime !== undefined
        ? "scheduled"
        : (paymentInfo?.insurance?.coverageAmount ?? 0) > 0
          ? "insurance_validated"
          : (paymentInfo?.serviceAmount ?? 0) > 0
            ? "quoted"
            : "new",
    customer,
    car: carInfo,
    damage: damageInfo,
    address,
    paymentInfo: paymentInfo,
    callbackTime: callbackTime,
    meetingTime: meetingTime,
    createdOn: new Date().getTime(),
    notes,
  };

  // Create new event and add to customer list
  const newEvent = await CalendarEventUtils.createNewCustomerMessage(
    session,
    customerQuoteData,
    { date: new Date().getTime() },
    !fromCustomer,
  );
  customerQuoteData.calendarEvents = [newEvent.calendarEventId];

  const customerQuote: CustomerQuote = (
    await CustomerQuoteModel.create([customerQuoteData], {
      session,
      ordered: true,
    })
  )[0].toCustomerQuote();

  return {
    customerQuote,
  };
};

const create = ControllerFunc(async (req, res) =>
  SessionController(
    async ({ session, commit, abort }) =>
      await TryCatch(
        async () => {
          const { userId } = Validators.TokenValidators.resLocalsTokenValues(
            res.locals,
          );

          const { customerQuote } = await _createCustomerQuoteController(
            session,
            req.body,
            [userId],
          );

          await commit();

          res.send({
            customer: customerQuote,
          });
        },
        (err) => {
          abort();
          res.status(500).json({ error: err });
        },
      ),
  ),
);

const createWithNoTeam = ControllerFunc(async (req, res) =>
  SessionController(
    async ({ session, commit, abort }) =>
      await TryCatch(
        async () => {
          // const { userId } = Validators.TokenValidators.resLocalsTokenValues(
          //   res.locals,
          // );

          const { customerQuote } = await _createCustomerQuoteController(
            session,
            req.body,
            // [userId],
            [],
            true,
          );

          await commit();

          res.send({
            success: true,
            newCustomer: customerQuote.customer,
            customer: customerQuote,
          });
        },
        (err) => {
          abort();
          res.status(500).json({ error: err });
        },
      ),
  ),
);

const getQuote = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { validData, errorMsg } = validationV2<{ customerQuoteId: string }>(
        { customerQuoteId: [RULES.common.requiredString, ""] },
        req.params,
      );
      if (errorMsg || !validData) throw new Error(errorMsg);

      const { customerQuoteId } = validData;

      const quote = await CustomerQuoteModel.findOne({ customerQuoteId });

      if (!quote) throw new Error(`Could not find customer`);

      res.send({ customer: quote.toCustomerQuote() });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const _editQuoteSendSystemMessages = async (
  session: ISession,
  userId: string,
  customerQuoteData: ICustomerQuote,
) => {
  const prevEvents = await CalendarEventModel.find({
    calendarEventId: { $in: customerQuoteData.calendarEvents },
  }).session(session);

  const validScheduledStatus: string[] = [
    CustomerQuoteStatus.SCHEDULED,
    CustomerQuoteStatus.DONE,
  ];

  let [hasScheduled, hasDone] = [false, false];

  for (const prevEvent of prevEvents) {
    if (prevEvent.eventType === SYSTEM_EVENTS.SCHED_CUST) {
      hasScheduled = true;

      if (validScheduledStatus.includes(customerQuoteData.status)) {
        if (!customerQuoteData.meetingTime) continue; // Should not be possible
        if (prevEvent.date === customerQuoteData.meetingTime.from) continue;

        Log.colors.yellow(`Edit scheduled event`);

        // update only if times are different
        await CalendarEventModel.findOneAndUpdate(
          { calendarEventId: prevEvent.calendarEventId },
          {
            date: customerQuoteData.meetingTime.from,
            timeBlock: customerQuoteData.meetingTime,
          },
        );
        continue;
      }

      Log.colors.yellow(`Delete scheduled event`);

      await CalendarEventModel.findOneAndDelete({
        calendarEventId: prevEvent.calendarEventId,
      });
      customerQuoteData.calendarEvents = produce(
        customerQuoteData.calendarEvents,
        (draft) => draft.filter((id) => id !== prevEvent.calendarEventId),
      );
      continue;
    }

    if (prevEvent.eventType === SYSTEM_EVENTS.DONE_CUST) {
      hasDone = true;

      if (customerQuoteData.status === CustomerQuoteStatus.DONE) continue;

      Log.colors.yellow(`Delete done event`);

      await CalendarEventModel.findOneAndDelete({
        calendarEventId: prevEvent.calendarEventId,
      });
      customerQuoteData.calendarEvents = produce(
        customerQuoteData.calendarEvents,
        (draft) => draft.filter((id) => id !== prevEvent.calendarEventId),
      );
    }
  }

  if (
    customerQuoteData.status === CustomerQuoteStatus.SCHEDULED &&
    customerQuoteData.meetingTime &&
    !hasScheduled
  ) {
    Log.colors.yellow(`Create scheduled event`);

    const scheduledSystemEvent =
      await CalendarEventUtils.createScheduledMessage(
        session,
        userId,
        customerQuoteData,
        {
          date: customerQuoteData.meetingTime.from,
          timeBlock: customerQuoteData.meetingTime,
        },
      );

    customerQuoteData.calendarEvents = [
      ...customerQuoteData.calendarEvents,
      scheduledSystemEvent.calendarEventId,
    ];
  }

  if (customerQuoteData.status === CustomerQuoteStatus.DONE && !hasDone) {
    const user = await UserModel.findOne({ userId }).session(session);
    if (!user) throw new Error(`Could not find user`);

    Log.colors.yellow(`Create done event`);

    const doneSystemEvent = await CalendarEventUtils.createDoneMessage(
      session,
      user,
      customerQuoteData,
      { date: new Date().getTime() },
    );

    customerQuoteData.calendarEvents = [
      ...customerQuoteData.calendarEvents,
      doneSystemEvent.calendarEventId,
    ];
  }
};

const edit = ControllerFunc(
  async (req, res) =>
    await SessionController(
      async ({ session, abort }) =>
        await TryCatch(
          async () => {
            const { customerQuoteId: paramCustomerQuoteId } =
              Validators.CustomerQuoteValidators.customerQuoteId(req.params);
            const { userId } = Validators.TokenValidators.resLocalsTokenValues(
              res.locals,
            );
            const {
              status,
              customerQuoteId,
              customer,
              carInfo,
              damageInfo,
              address,
              paymentInfo,
              callbackTime,
              meetingTime,
              notes,
              serviceType,

              forceStatus,
            } = Validators.CustomerQuoteValidators.edit(req.body);

            if (paramCustomerQuoteId !== customerQuoteId)
              throw new Error(`Customer ID mismatch.`);

            const ogQuote: MongoDoc<CustomerQuote> | null =
              await CustomerQuoteModel.findOne({
                customerQuoteId,
              }).session(session);
            if (!ogQuote) throw new Error(`Customer could not be found.`);

            const teamMembers = [...ogQuote.teamMembers];
            if (!teamMembers.includes(userId)) teamMembers.push(userId);

            // Auto infer status from fields
            const customerQuoteData: ICustomerQuote = {
              fromCustomer: ogQuote.fromCustomer,
              serviceType: serviceType as IServiceType,
              customerQuoteId,
              teamMembers,
              calendarEvents: ogQuote.calendarEvents,
              attatchments: ogQuote.attatchments,
              status: forceStatus
                ? (status as CustomerQuoteStatus)
                : meetingTime !== undefined
                  ? "scheduled"
                  : (paymentInfo?.insurance?.coverageAmount ?? 0) > 0
                    ? "insurance_validated"
                    : (paymentInfo?.serviceAmount ?? 0) > 0
                      ? "quoted"
                      : "new",
              customer,
              car: carInfo,
              damage: damageInfo,
              address,
              paymentInfo: paymentInfo,
              callbackTime: callbackTime,
              meetingTime: meetingTime,
              notes,
              createdOn: ogQuote.createdOn,
            };

            await _editQuoteSendSystemMessages(
              session,
              userId,
              customerQuoteData,
            );

            const customerQuote = await CustomerQuoteModel.findOneAndUpdate(
              { customerQuoteId },
              {
                ...customerQuoteData,
                address: customerQuoteData.address ?? null,
                meetingTime: customerQuoteData.meetingTime ?? null,
              },
              { returnDocument: "after", session },
            );
            if (!customerQuote) throw new Error(`Could not edit customer.`);

            res.send({ customer: customerQuote.toCustomerQuote() });
          },
          async (err) => {
            await abort();
            res.status(500).json({ error: err });
          },
        ),
    ),
);

const editStatus = ControllerFunc(
  async (req, res) =>
    await SessionController(
      async ({ session, commit, abort }) =>
        await TryCatch(
          async () => {
            const { customerQuoteId: paramCustomerQuoteId } =
              Validators.CustomerQuoteValidators.customerQuoteId(req.params);
            const { userId } = Validators.TokenValidators.resLocalsTokenValues(
              res.locals,
            );
            const { customerQuoteId, status } =
              Validators.CustomerQuoteValidators.editStatus(req.body);

            if (paramCustomerQuoteId !== customerQuoteId)
              throw new Error(`Customer ID mismatch.`);

            const ogQuote: MongoDoc<CustomerQuote> | null =
              await CustomerQuoteModel.findOne({
                customerQuoteId,
              }).session(session);
            if (!ogQuote) throw new Error(`Customer could not be found.`);

            Log.colors.purple(`1`);

            ogQuote.status = status as CustomerQuoteStatus;
            Log.colors.purple(`2`);
            ogQuote.teamMembers = !ogQuote.teamMembers.includes(userId)
              ? [...ogQuote.teamMembers, userId]
              : ogQuote.teamMembers;

            Log.colors.purple(`3`);

            await _editQuoteSendSystemMessages(session, userId, ogQuote);
            Log.colors.purple(`3`);

            await ogQuote.save({ session });
            await commit();

            res.send({ customer: ogQuote.toCustomerQuote() });
          },
          async (err) => {
            await abort();
            res.status(500).json({ error: err });
          },
        ),
    ),
);

const toggleTeamMember = ControllerFunc((req, res) =>
  TryCatch(
    async () => {
      const { userId, customerQuoteId } =
        Validators.CustomerQuoteValidators.toggleTeamMember(req.body);

      const ogCustomer = await CustomerQuoteModel.findOne({ customerQuoteId });
      if (!ogCustomer) throw new Error(`Could not find customer.`);

      let teamMembers = [...ogCustomer.teamMembers];
      const nonRemovableMembers = ogCustomer.attatchments.map(
        (attatch) => attatch.userId,
      );

      if (teamMembers.includes(userId) && !nonRemovableMembers.includes(userId))
        teamMembers = teamMembers.filter((mem) => mem !== userId);
      else if (!teamMembers.includes(userId)) teamMembers.push(userId);

      ogCustomer.teamMembers = teamMembers;
      await ogCustomer.save();

      res.send({ customer: ogCustomer.toCustomerQuote() });
    },
    (err) => {
      res.status(500).json({ error: err });
    },
  ),
);

const toggleAttatchments = ControllerFunc((req, res) =>
  SessionController(
    async ({ session }) =>
      await TryCatch(
        async () => {
          const { userId } = Validators.TokenValidators.resLocalsTokenValues(
            res.locals,
          );
          const { customerQuoteId } =
            Validators.CustomerQuoteValidators.customerQuoteId(req.params);
          const { validData, errorMsg } = validationV2<{
            attatchmentIds: string[];
            deleteAttatchment?: boolean;
          }>(
            {
              attatchmentIds: [
                RULES.multiple(RULES.min(1), RULES.common.requiredArray),
                "attatchments",
              ],
              deleteAttatchment: [RULES.common.optionalBool, ""],
            },
            req.body,
          );
          if (errorMsg || !validData) throw new Error(errorMsg);

          const ogQuote = await CustomerQuoteModel.findOne({
            customerQuoteId,
          }).session(session);
          if (!ogQuote) throw new Error(`Could not find customer.`);

          const addingIds: string[] = [];
          const removingIds: string[] = [];

          validData.attatchmentIds.forEach((id) =>
            ogQuote.attatchments
              .map((quote) => quote.attatchmentId)
              .includes(id)
              ? removingIds.push(id)
              : addingIds.push(id),
          );

          if (removingIds.length > 0 && Boolean(validData.deleteAttatchment)) {
            const diskFolder = ImageUtils.getUploadsFolder();

            await Promise.all(
              removingIds.map(
                async (id) =>
                  await ImageUtils.deleteFile(ImageUtils.join(diskFolder, id)),
              ),
            );

            await AttatchmentModel.deleteMany(
              { attachmentId: { $in: removingIds } },
              { session },
            );
          }

          const attatchments = produce(ogQuote.attatchments, (draft) => {
            return draft
              .filter((ogId) => !removingIds.includes(ogId.attatchmentId))
              .concat(
                addingIds.map((addId) => ({
                  attatchmentId: addId,
                  userId,
                })),
              );
          });

          const teamMembers = ogQuote.teamMembers;
          if (!teamMembers.includes(userId)) teamMembers.push(userId);

          const updatedQuote = await CustomerQuoteModel.findOneAndUpdate(
            { customerQuoteId },
            {
              attatchments,
              teamMembers,
            },
            { session, returnDocument: "after" },
          );
          if (!updatedQuote) throw new Error(`Could not update customer`);

          res.send({ customer: updatedQuote.toCustomerQuote() });
        },
        (err) => {
          res.status(500).json({ error: err });
        },
      ),
  ),
);

const deleteQuote = ControllerFunc(
  async (req, res) =>
    await SessionController(
      async ({ session, commit, abort }) =>
        await TryCatch(
          async () => {
            const { role } = Validators.TokenValidators.resLocalsTokenValues(
              res.locals,
            );
            const { customerQuoteId } =
              Validators.CustomerQuoteValidators.customerQuoteId(req.params);

            if (role !== UserType.ADMIN) throw new Error(`Unauthorized action`);

            const customerQuote = await CustomerQuoteModel.findOne({
              customerQuoteId,
            }).session(session);
            if (!customerQuote) throw new Error(`Could not find customer`);

            const diskPath = ImageUtils.getUploadsFolder();
            for await (const {
              attatchmentId: imageName,
            } of customerQuote.attatchments) {
              await ImageUtils.deleteFile(ImageUtils.join(diskPath, imageName));
            }
            await AttatchmentModel.deleteMany({
              attachmentId: {
                $in: customerQuote.attatchments.map(
                  (attatch) => attatch.attatchmentId,
                ),
              },
            }).session(session);

            await CalendarEventModel.deleteMany({
              calendarEventId: { $in: customerQuote.calendarEvents },
            }).session(session);

            await CustomerQuoteModel.deleteOne({ customerQuoteId }).session(
              session,
            );

            await commit();
            res.send({ success: true });
          },
          async (err) => {
            await abort();
            res.status(500).json({ error: err });
          },
        ),
    ),
);

export const CustomerQuoteController = {
  create,
  createWithNoTeam,
  getQuotes,
  getQuote,
  edit,
  editStatus,
  toggleTeamMember,
  toggleAttatchments,
  deleteQuote,
};

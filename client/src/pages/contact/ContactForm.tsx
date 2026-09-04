import { IMAGES } from "@/assets";
import {
  ActionButton,
  SquareImageShape,
  StarInput,
  TextInput,
  THeading,
} from "@/components";
import { CONSTANTS } from "@/Constants";
import { useApi, useScreenSize } from "@/hooks";
import type { IPerson, IReview } from "@/interfaces";
import { RULES, validation } from "@/validation";
import { Stack } from "@mui/material";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const ContactForm = () => {
  const { lessThanEqualTo: sizeUnder } = useScreenSize();

  const {
    snackbar: [successSnack, errorSnack],
    reviewRoutes,
  } = useApi();

  const [loading, setLoading] = useState(false);

  const [rating, setRating] = useState(0);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [validCaptcha, setValidCaptcha] = useState(false);

  const clearState = () => {
    setRating(0);
    setFullName("");
    setEmail("");
    setPhone("");
    setMessage("");
    setValidCaptcha(false);
  };

  const isValid = (data: Omit<Omit<IReview, "reviewId">, "createdOn">) => {
    if (!validCaptcha) {
      errorSnack(`Missing valid reCAPTCHA`);
      return false;
    }

    const validReview = validation<
      Omit<Omit<Omit<IReview, "reviewId">, "createdOn">, "person">
    >(
      {
        message: [
          RULES.multiple(RULES.common.requiredString, RULES.max(500)),
          "",
        ],
        rating: [
          RULES.multiple(
            RULES.common.requiredNumber,
            RULES.min(0),
            RULES.max(5),
          ),
          "",
        ],
      },
      data,
    );

    const validPerson = validation<IPerson>(
      {
        firstName: [RULES.common.requiredString, "name"],
        lastName: [RULES.common.presentString, "name"],
        email: [RULES.common.presentString, ""],
        phone: [RULES.common.presentString, ""],
      },
      data.person,
    );

    if (validPerson.errorMsg) {
      errorSnack(validPerson.errorMsg);
      return false;
    }

    if (validReview.errorMsg) {
      errorSnack(validReview.errorMsg);
      return false;
    }

    return true;
  };

  const submit = async () => {
    const firstName = fullName.split(" ")[0];
    const lastName = (
      fullName.trim() === firstName ? "" : fullName.replace(`${firstName}`, "")
    ).trim();
    const data: Omit<Omit<IReview, "reviewId">, "createdOn"> = {
      person: {
        firstName,
        lastName,
        email,
        phone,
      },
      message,
      rating,
    };

    setLoading(true);

    if (!isValid(data)) {
      setLoading(false);
      return;
    }

    const res = await reviewRoutes.create(data);
    setLoading(false);

    if (res.err || !res.data) return errorSnack(res.err);

    successSnack(`Thank you for your review!`);
    clearState();
  };

  return (
    <Stack
      direction={sizeUnder.md ? "column" : "row"}
      sx={{
        paddingInline: sizeUnder.md ? 4 : 8,
        paddingBlock: sizeUnder.md ? 12 : 16,
      }}
      spacing={8}
    >
      <Stack
        sx={{
          flex: sizeUnder.md ? undefined : 0.6,
          width: sizeUnder.md ? "100%" : undefined,

          alignItems: sizeUnder.md ? "center" : "start",
          justifyContent: "center",
        }}
      >
        <Stack
          sx={{
            width: sizeUnder.xxs ? "100%" : sizeUnder.xs ? "90%" : "75%",
            pr: sizeUnder.xs ? 2 : 0,
          }}
        >
          <SquareImageShape
            heightMult={sizeUnder.md ? 0.5 : 1}
            imageSrc={IMAGES.CoolCarFront}
            alt="Camaro Auto Glass"
          />
        </Stack>
      </Stack>

      <Stack sx={{ flex: 0.4, alignItems: "center" }} spacing={4}>
        <THeading bold align="center">
          Leave us a review
        </THeading>

        <Stack
          spacing={2}
          sx={{
            width: "100%",
            alignItems: "end",
            pb: sizeUnder.xs ? 1 : 0,
          }}
        >
          <StarInput value={rating} setValue={setRating} />
          <TextInput
            required
            label="Name"
            value={fullName}
            setValue={setFullName}
          />
          <TextInput optional label="Email" value={email} setValue={setEmail} />
          <TextInput
            label="Phone"
            placeholder="(xxx) xxx-xxxx"
            optional
            value={phone}
            setValue={setPhone}
          />
          <TextInput
            label="Message"
            multiline
            rows={5}
            required
            value={message}
            setValue={setMessage}
          />
          <Stack
          // sx={
          //   sizeUnder.md
          //     ? {
          //         transform: `scale(0.9) translateX(${sizeUnder.xxs ? 15 : 10}%)`,
          //         transformOrigin: "0 0",

          //         borderWidth: 1,
          //         borderColor: CSS.colors.black,
          //         pb: 1,
          //         pr: 1,
          //       }
          //     : {}
          // }
          >
            <ReCAPTCHA
              size="normal"
              sitekey={CONSTANTS.api.recaptcha()}
              onChange={(value) =>
                setValidCaptcha(value && value.length ? true : false)
              }
            />
          </Stack>
        </Stack>

        <Stack sx={{ alignItems: "end", width: "100%" }}>
          <ActionButton loading={loading} onClick={submit} color="red">
            Submit message
          </ActionButton>
        </Stack>
      </Stack>
    </Stack>
  );
};

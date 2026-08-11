import { type PropsWithChildren } from "react";
import type { InputProps } from "./types";
// import { Badge, Container, Field } from "@chakra-ui/react";
import { Stack } from "@mui/material";
import { TBody } from "../typography";
import { CSS } from "@/Constants";

export const InputField = ({
  children,
  helperText,
  error,
}: PropsWithChildren<InputProps>) => {
  return (
    <Stack sx={{ width: "100%" }}>
      {children}
      {helperText && (
        <TBody color={CSS.colors.grey} smaller>
          {helperText}
        </TBody>
      )}
      {error && (
        <TBody color={CSS.colors.red} smaller>
          {error}
        </TBody>
      )}
    </Stack>
  );

  // return (
  //   <Field.Root
  //     invalid={error ? true : false}
  //     required={required}
  //     orientation={orientation}
  //   >
  //     {label && (
  //       <Container p={0}>
  //         <Field.Label>
  //           {label}{" "}
  //           {(required || optional) && (
  //             <Field.RequiredIndicator
  //               fallback={
  //                 optional ? (
  //                   <Badge size="xs" variant="surface">
  //                     Optional
  //                   </Badge>
  //                 ) : undefined
  //               }
  //             />
  //           )}
  //         </Field.Label>
  //       </Container>
  //     )}
  //     {children}
  //     {error && (
  //       <Field.HelperText color={"var(--accent-red)"}>{error}</Field.HelperText>
  //     )}
  //     {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
  //   </Field.Root>
  // );
};

import { type PropsWithChildren } from "react";
import type { InputProps } from "./types";
import { Badge, Container, Field } from "@chakra-ui/react";

export const InputField = ({
  label,
  children,
  helperText,
  required,
  optional,
  orientation,
  error,
}: PropsWithChildren<InputProps>) => {
  return (
    <Field.Root
      invalid={error ? true : false}
      required={required}
      orientation={orientation}
    >
      {label && (
        <Container p={0}>
          <Field.Label>
            {label}{" "}
            {(required || optional) && (
              <Field.RequiredIndicator
                fallback={
                  optional ? (
                    <Badge size="xs" variant="surface">
                      Optional
                    </Badge>
                  ) : undefined
                }
              />
            )}
          </Field.Label>
        </Container>
      )}
      {children}
      {error && (
        <Field.HelperText color={"var(--accent-red)"}>{error}</Field.HelperText>
      )}
      {helperText && <Field.HelperText>{helperText}</Field.HelperText>}
    </Field.Root>
  );
};

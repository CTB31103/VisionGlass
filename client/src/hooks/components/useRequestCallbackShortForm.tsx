import { Service } from "@/interfaces";
import { useState } from "react";

export const useRequestCallbackShortForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [service, setService] = useState(Service.Windshield);

  return {
    firstName,
    lastName,
    phone,
    service,

    setFirstName,
    setLastName,
    setPhone,
    setService,
  };
};

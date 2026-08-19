import { UserType } from "@/interfaces";
import { useUserStore } from "@/stores";

export const useIsAdminService = () => {
  const user = useUserStore((state) => state.user);
  return user.userType === UserType.ADMIN;
};

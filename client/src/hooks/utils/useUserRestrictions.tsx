import { UserType, type IUser } from "@/interfaces";
import { useUserStore } from "@/stores";

export const useUserRestrictions = (user?: IUser) => {
  const authUser = useUserStore((state) => state.user);
  const authIsRoot = authUser.isRootUser;
  const authIsAdmin = authUser.userType === UserType.ADMIN;

  const userIsRoot = user?.isRootUser ? true : false;
  const userIsAdmin = user?.userType === UserType.ADMIN;

  const isSameUser =
    user && user.userId === authUser.userId && authUser.userId.length > 0
      ? true
      : false;

  const canAuthUserEdit =
    !userIsRoot &&
    (isSameUser ||
      (authIsRoot && userIsAdmin) ||
      (authIsAdmin && !userIsAdmin));
  const canAuthUserDelete =
    !userIsRoot && !isSameUser && (authIsRoot || (authIsAdmin && !userIsAdmin));

  return {
    authUser: {
      authIsRoot,
      authIsAdmin,
    },

    user: {
      userIsRoot,
      userIsAdmin,
    },

    isSameUser,

    authorized: {
      edit: canAuthUserEdit,
      delete: canAuthUserDelete,
    },
  };
};

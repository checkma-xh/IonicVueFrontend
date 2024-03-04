import { UserInfoController } from "./controller/UserInfoController";

export const Routes = [
    {
        method: "get",
        route: "/user-info/users/:id",
        controller: UserInfoController,
        action: "getUserInfo",
    },
    {
        method: "patch",
        route: "/user-info/users/:id/email",
        controller: UserInfoController,
        action: "editEmail",
    },
    {
        method: "patch",
        route: "/user-info/users/:id/password-hash",
        controller: UserInfoController,
        action: "editPasswordHash",
    },
    {
        method: "patch",
        route: "/user-info/users/:id/avatar-url",
        controller: UserInfoController,
        action: "editAvatarUrl",
    }
];

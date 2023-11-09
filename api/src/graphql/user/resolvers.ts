import UserService, { TUserRegistrationPayload } from "../../services/user";

const queries = {
  login: async (_: any, payload: { email: string; password: string }) => {
    const res = await UserService.getUserToken(payload);
    return res;
  },
};

const mutations = {
  createUser: async (_: any, payload: TUserRegistrationPayload) => {
    const res = await UserService.createUser(payload);
    return res.id;
  },
};
export const resolvers = { queries, mutations };

const quries = {
  login: async (_: any, payload: { email: string; password: string }) => {
    return "Logged in";
  },
};

const mutations = {
  createUser: async (_: any, payload: any) => {
    return "User Created";
  },
};
export const resolvers = { quries, mutations };

export const sleep = async (n) => new Promise((resolve) => setTimeout(resolve, n));

export default {
  sleep,
};

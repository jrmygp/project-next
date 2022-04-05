const requiresAuth = (gssp) => {
  return async (context) => {
    const savedUserData = context.req.cookies.user_token;

    console.log(savedUserData)

    if (!savedUserData) {
      return {
        redirect: {
          destination: "/login",
        },
      };
    }

    return gssp(context);
  }
}

export default requiresAuth
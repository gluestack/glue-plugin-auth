import Common from "../../commons";
import Helpers from "../helpers";
import Queries from "../graphql/queries";
import Locals from "../../../providers/locals";

class Signin {
  public static async success(req: any, res: any): Promise<void> {
    const { user } = req?.session?.passport || { user: null };
    if (!user)
      return res.redirect("/authentication/signin/google/callback/failure");

    try {
      const { data } = await Common.GQLRequest({
        variables: { email: user.toLowerCase() },
        query: Queries.UserByEmail,
      });

      // error handling
      if (
        !data ||
        !data.data ||
        !data.data.users ||
        data.data.users.length === 0
      ) {
        return res.json({});
      }

      // create Token for authentication
      const token = await Helpers.CreateToken({
        id: data.data.users[0].id,
        role: Locals.config().hasuraGraphqlUserRole,
      });

      return res.render("token", {
        user: user,
        token: token.token,
      });
    } catch (e) {
      return res.json({ error: e.message, user: user });
    }
  }

  public static async failure(req: any, res: any): Promise<void> {
    res.send("Error");
  }
}

export default Signin;

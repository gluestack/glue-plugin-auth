import * as bcrypt from "bcrypt";
import Common from "../../commons";
import Helpers from "../helpers";
import Queries from "../graphql/queries";

class Signin {
  public static async handle(req: any, res: any): Promise<void> {
    const { email, password } = req.body.input || req.body;

    try {
      // graphql query
      const { data } = await Common.GQLRequest({
        variables: { email: email.toLowerCase() },
        query: Queries.UserByEmail,
      });

      // error handling
      if (!data || !data.data || !data.data.users) {
        const error = (data.errors && data.errors) || "Something went wrong!";
        return Common.Response(res, false, error, null);
      }

      // check if users response is empty
      if (data.data.users.length === 0) {
        return Common.Response(
          res,
          false,
          "no user registered with this email address",
          null,
        );
      }

      // check password with the hashed password
      const validPassword = await bcrypt.compare(
        password,
        data.data.users[0].password,
      );
      if (!validPassword) {
        return Common.Response(res, false, "Invalid Password", null);
      }

      // create Token for authentication
      const token = await Helpers.CreateToken({
        id: data.data.users[0].id,
        role: "guest",
      });

      return res.json({
        success: true,
        message: "Sign in successfully!",
        data: {
          id: data.data.users[0].id,
          name: data.data.users[0].name,
          email: data.data.users[0].email,
          created_at: data.data.users[0].created_at,
          updated_at: data.data.users[0].updated_at,
          ...token,
        },
      });
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default Signin;

import Common from "../../commons";
import Helpers from "../helpers";
import Queries from "../graphql/queries";

class ForgotPassword {
  public static async handle(req: any, res: any): Promise<void> {
    const { email } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { email: email.toLowerCase() },
        query: Queries.UserByEmail
      });

      if (!data || !data.data || !data.data.users) {
        const error = errors || data.errors && data.errors[0].message || "Something went wrong!";
        return Common.Response(res, false, error, null);
      }

      // check if users response is empty
      if (data.data.users.length === 0) {
        return Common.Response(res, false, "No user registered with this email address", null);
      }

      // generate OTP
      const otp = await Helpers.GenerateOTP();

      // set OTP against user
      await Helpers.SetOTP(data.data.users[0].id, otp);

      return Common.Response(res, true, "Email send successfully", { otp });
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default ForgotPassword;

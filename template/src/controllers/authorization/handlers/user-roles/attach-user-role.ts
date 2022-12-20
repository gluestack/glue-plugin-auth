import Common from '../../../commons';
import Mutations from '../../graphql/mutations';

class AttachUserRole {
  public static async perform(req: any, res: any): Promise<void> {
    const { user_id, role_key } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { user_id, role_key },
        query: Mutations.AttachUserRole
      });

      if (!data || !data.data || !data.data.insert_user_roles_one) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to insert user role';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Insert user-role successfully!', null);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default AttachUserRole;

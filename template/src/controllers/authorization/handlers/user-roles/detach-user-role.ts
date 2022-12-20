import Common from '../../../commons';
import Mutations from '../../graphql/mutations';

class DetachUserRole {
  public static async perform(req: any, res: any): Promise<void> {
    const { user_id, role_key } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { user_id, role_key },
        query: Mutations.DetachUserRole
      });

      if (!data || !data.data || !data.data.delete_user_roles || data.data.delete_user_roles.affected_rows !== 1) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to detach user role';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'User-Role detached successfully!', null);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default DetachUserRole;

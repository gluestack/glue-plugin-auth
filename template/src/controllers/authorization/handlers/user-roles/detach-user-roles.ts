import Common from '../../../commons';
import Mutations from '../../graphql/mutations';

class DetachUserRoles {
  public static async perform(req: any, res: any): Promise<void> {
    const { user_id } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { user_id },
        query: Mutations.DetachUserRoles
      });

      if (!data || !data.data || !data.data.delete_user_roles || data.data.delete_user_roles.affected_rows === 0) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to detach user-role';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'User-Roles detached successfully!', null);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default DetachUserRoles;

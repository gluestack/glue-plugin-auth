import Common from '../../../commons';
import Mutations from '../../graphql/mutations';

class DetachRolePermissions {
  public static async perform(req: any, res: any): Promise<void> {
    const { role_key } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { role_key },
        query: Mutations.DetachRolePermissions
      });

      if (!data || !data.data || !data.data.delete_role_permissions || data.data.delete_role_permissions.affected_rows === 0) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to detach role-permissions';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Role-permissions detached successfully!', null);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default DetachRolePermissions;

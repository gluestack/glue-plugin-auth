import Common from '../../../commons';
import Mutations from '../../graphql/mutations';

class DetachRolePermission {
  public static async perform(req: any, res: any): Promise<void> {
    const { role_key, permission_key } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { role_key, permission_key },
        query: Mutations.DetachRolePermission
      });

      if (!data || !data.data || !data.data.delete_role_permissions || data.data.delete_role_permissions.affected_rows !== 1) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to detach role permission';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Role-permission detached successfully!', null);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default DetachRolePermission;

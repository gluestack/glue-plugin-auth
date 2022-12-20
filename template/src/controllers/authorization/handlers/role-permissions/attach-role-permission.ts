import Common from '../../../commons';
import Mutations from '../../graphql/mutations';

class AttachRolePermission {
  public static async perform(req: any, res: any): Promise<void> {
    const { permission_key, role_key } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { permission_key, role_key },
        query: Mutations.AttachRolePermission
      });

      if (!data || !data.data || !data.data.insert_role_permissions_one) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to insert role permission';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Insert role-permission successfully!', null);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default AttachRolePermission;

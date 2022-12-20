import { map } from 'lodash';
import Common from '../../../commons';
import Queries from '../../graphql/queries';

class GetRolePermissions {
  public static async perform(req: any, res: any): Promise<void> {
    const { role_key } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { role_key },
        query: Queries.GetRolePermissions
      });

      if (!data || !data.data || !data.data.role_permissions) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to fetch role-permissions';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Role-permissions fetched successfully!', map(data.data.role_permissions, 'permission'));
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default GetRolePermissions;

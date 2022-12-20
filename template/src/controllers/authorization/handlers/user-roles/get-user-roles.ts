import { map } from 'lodash';
import Common from '../../../commons';
import Queries from '../../graphql/queries';

class GetUserRoles {
  public static async perform(req: any, res: any): Promise<void> {
    const { user_id } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { user_id },
        query: Queries.GetUserRoles
      });

      if (!data || !data.data || !data.data.user_roles) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to fetch user-roles';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'User-Roles fetched successfully!', map(data.data.user_roles, 'role'));
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default GetUserRoles;

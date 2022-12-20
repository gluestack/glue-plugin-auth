import Common from '../../../commons';
import Queries from '../../graphql/queries';

class GetPermissions {
  public static async perform(req: any, res: any): Promise<void> {
    const { key } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { key },
        query: Queries.GetPermissions
      });

      if (!data || !data.data || !data.data.permissions) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to fetch permissions';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Permissions fetch successfully!', data.data.permissions);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default GetPermissions;

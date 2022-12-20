import Common from '../../../commons';
import Queries from '../../graphql/queries';

class GetRoles {
  public static async perform(req: any, res: any): Promise<void> {
    const { key } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { key },
        query: Queries.GetRoles
      });

      if (!data || !data.data || !data.data.roles) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to fetch roles';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Roles fetch successfully!', data.data.roles);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default GetRoles;

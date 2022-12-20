import Common from '../../../commons';
import Queries from '../../graphql/queries';

class GetRole {
  public static async perform(req: any, res: any): Promise<void> {
    const { key } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { key },
        query: Queries.GetRole
      });

      if (!data || !data.data || !data.data.roles_by_pk) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to fetch role';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Role fetch successfully!', data.data.roles_by_pk);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default GetRole;

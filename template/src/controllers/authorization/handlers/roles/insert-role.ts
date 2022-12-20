import Common from '../../../commons';
import Mutations from '../../graphql/mutations';

class InsertRole {
  public static async perform(req: any, res: any): Promise<void> {
    const { key, value } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { key, value },
        query: Mutations.InsertRole
      });

      if (!data || !data.data || !data.data.insert_roles_one) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to insert role';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Insert role successfully!', null);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default InsertRole;

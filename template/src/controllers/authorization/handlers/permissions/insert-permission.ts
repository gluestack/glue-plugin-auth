import Common from '../../../commons';
import Mutations from '../../graphql/mutations';

class InsertPermission {
  public static async perform(req: any, res: any): Promise<void> {
    const { key, value } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { key, value },
        query: Mutations.InsertPermission
      });

      if (!data || !data.data || !data.data.insert_permissions_one) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to insert permission';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Insert permission successfully!', null);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default InsertPermission;

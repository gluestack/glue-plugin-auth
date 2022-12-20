import Common from '../../../commons';
import Mutations from '../../graphql/mutations';

class UpdatePermission {
  public static async perform(req: any, res: any): Promise<void> {
    const { key, value } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { key, value },
        query: Mutations.UpdatePermission
      });

      if (!data || !data.data || !data.data.update_permissions_by_pk) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to update permission';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Update permission successfully!', null);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default UpdatePermission;

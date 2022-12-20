import Common from '../../../commons';
import Mutations from '../../graphql/mutations';

class DeleteRole {
  public static async perform(req: any, res: any): Promise<void> {
    const { key, value } = req.body.input || req.body;

    try {
      // graphql query
      const { data, errors } = await Common.GQLRequest({
        variables: { key, value },
        query: Mutations.DeleteRole
      });

      if (!data || !data.data || !data.data.delete_roles_by_pk) {
        const error = errors || data.errors && data.errors[0].message || 'Failed to delete role';
        return Common.Response(res, false, error, null);
      }

      return Common.Response(res, true, 'Role deleted successfully!', null);
    } catch (error) {
      return Common.Response(res, false, error.message, null);
    }
  }
}

export default DeleteRole;

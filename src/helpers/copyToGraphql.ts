import { PluginInstance } from "../PluginInstance";
import { PluginInstance as GraphqlPluginInstance } from "@gluestack/glue-plugin-graphql/src/PluginInstance";

export async function copyToGraphql(
  authInstance: PluginInstance,
  graphqlInstance: GraphqlPluginInstance,
) {
  await graphqlInstance.copyMigration(
    authInstance.callerPlugin.getMigrationFolderPath(),
  );
  await graphqlInstance.copyTrackJson(`public_users.json`, [
    {
      type: "pg_track_table",
      args: {
        source: graphqlInstance.getDbName(),
        table: "users",
      },
    },
    {
      _name: "Set permission for users table",
      _body: {
        type: "bulk",
        args: [
          {
            type: "pg_create_insert_permission",
            args: {
              table: "users",
              source: graphqlInstance.getDbName(),
              role: "user",
              permission: {
                check: {
                  id: "X-HASURA-USER-ID",
                },
                set: {
                  id: "X-HASURA-USER-ID",
                },
                columns: "*",
              },
            },
          },
          {
            type: "pg_create_select_permission",
            args: {
              table: "users",
              source: graphqlInstance.getDbName(),
              role: "user",
              permission: {
                columns: "*",
                filter: {
                  id: "X-HASURA-USER-ID",
                },
                limit: 10,
                allow_aggregations: true,
              },
            },
          },
          {
            type: "pg_create_update_permission",
            args: {
              table: "users",
              source: graphqlInstance.getDbName(),
              role: "user",
              permission: {
                columns: "*",
                filter: {
                  id: "X-HASURA-USER-ID",
                },
                set: {
                  updated_at: "NOW()",
                },
              },
            },
          },
          {
            type: "pg_create_delete_permission",
            args: {
              table: "users",
              source: graphqlInstance.getDbName(),
              role: "user",
              permission: {
                filter: {
                  id: "X-HASURA-USER-ID",
                },
              },
            },
          },
        ],
      },
    },
  ]);
}

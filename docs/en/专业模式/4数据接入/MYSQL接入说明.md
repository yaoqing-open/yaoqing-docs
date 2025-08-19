## MySQL Ingestion Guide

### Prerequisites

| Category | Description |
| :--- | :--- |
| Version | Versions 5.6, 5.7, and 8.x. |
| Settings | - The source database must have ROW binlog enabled.<br>- It is recommended to retain the Binlog for at least 3 days. |
| Permissions | The source database account requires the following minimum permissions:<br>SELECT, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT.<br>Reference command: `GRANT SELECT, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO 'username'@'%';` |
| Tables | - Tables must have a primary key.<br>- Primary keys for sharded tables must be consistent. |

### Synchronization Details
1. The source database `{db}` corresponds to the data warehouse database `input_{db}`. The warehouse database is automatically created after the ingestion task is set up.
2. The source table `{tableName}` retains the same name in the data warehouse. The table is automatically created after the ingestion task is set up.
3. For sharded tables, the corresponding database and table names in the data warehouse are specified by the user.
4. The synchronization impact of source database operations is as follows:

| Source Operation | Auto-synced to Warehouse? | Impact on Warehouse | Risk Level |
| :--- | :--- | :--- | :--- |
| DML data changes | ✅ Yes | Data is synchronized | Low (Physical deletes are directly synchronized as deletes) |
| `CREATE TABLE` | ❌ No | No change | Low (Requires manually modifying the ingestion task and backfilling data for the new table) |
| `ADD COLUMN` | ✅ Yes | The new column is synchronized | Low (Default values for historical data in the column are not synchronized) |
| `DROP COLUMN` | ❌ No | No change | Low |
| `RENAME COLUMN` | ⚠️ Not directly synchronized | A new column is added to receive subsequent data | <font color=red>**High**</font> |
| `MODIFY COLUMN` (Increase length) | ✅ Yes | Column length is changed | Low |
| `MODIFY COLUMN` (Decrease length) | ❌ No | No change | Low |
| `MODIFY COLUMN_TYPE` | ⚠️ Not directly synchronized | The data ingestion task will report an error. The platform handles this through a scheduled schema synchronization task. | <font color=red>**High**</font> |
| `DROP TABLE` | ❌ No | No change | Low |
| `TRUNCATE TABLE` | ❌ No | No change | Low |



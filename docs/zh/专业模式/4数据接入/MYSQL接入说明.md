## MYSQL接入说明

### 准备工作

| 分类	| 说明																								|
| :---	| :---																								|
| 版本	| 5.6、5.7、8.x版本。																				|
| 设置	| - 源库需开启ROW模式的Binlog日志<br>- 建议Binlog保留3天以上											|
| 权限	| 数据源账号需要具备如下最小权限：<br>SELECT、SHOW DATABASES、REPLICATION SLAVE、REPLICATION CLIENT。<br>参考命令```GRANT SELECT, SHOW DATABASES, REPLICATION SLAVE, REPLICATION CLIENT ON *.* TO '用户名'@'%';```	|
| 表	| - 表需要有主键<br>- 分片表主键需一致	|



### 同步说明
1. 源库名{db}，对应数仓库名input_{db},在创建数据接入任务后自动建库。  
2. 源表名{tableName}，对应数仓表名不变,在创建数据接入任务后自动建表。  
3. 分片表对应数仓的库表名由用户指定。  
4. 源库操作同步影响如下： 

| 源库操作 | 数仓是否自动同步？ | 数仓影响 | 风险等级 |
| :--- | :--- | :--- | :--- |
| `DML`数据变化 | ✅ 是 | 数据同步 | 低（物理删除会直接同步删除） |
| `CREATE TABLE`创建新表 | ❌ 否 | 无任何变化 | 低（需人工修改接入任务和补偿新表数据） |
| `ADD COLUMN` 新增字段| ✅ 是 | 同步新增字段 | 低（字段历史数据默认值不会同步） |
| `DROP COLUMN` 删除字段| ❌ 否 | 无任何变化 | 低 |
| `RENAME COLUMN` 重命名字段| ⚠️ 非直接同步 | 新增一个字段接受后续数据 | <font color=red>**高**</font> |
| `MODIFY COLUMN` 扩大字段长度 | ✅ 是 | 字段长度变更 | 低 |
| `MODIFY COLUMN` 缩小字段长度 | ❌ 否 | 无任何变化 | 低 |
| `MODIFY COLUMN_TYPE` 修改字段类型 | ⚠️ 非直接同步 | 数据接入任务会报错，平台通过定时同步结构任务处理 | <font color=red>**高**</font> |
| `DROP TABLE` 删除表| ❌ 否 | 无任何变化 | 低 |
| `TRUNCATE TABLE` 截断表| ❌ 否 | 无任何变化 | 低 |





# TiDB Cloud 接入说明

## 接入准备

| 分类	| 说明																								|
| :---	| :---																								|
| 版本	| TiDB v8.5.x																				|
| 设置	| 开启changefeed写入kafka										|
| 权限	| 数据源账号需要具备如下最小权限：<br>库表只读权限，参考命令<br>```GRANT SELECT, SHOW DATABASES ON *.* TO '用户名'@'%';```	|
| 表	| - 表必须有主键<br>- 大宽表的子表关联字段的基础类型需一致	|

changefeed配置命令参考：
```
CREATE CHANGEFEED INTO 'kafka://kafka-broker1:9092,kafka-broker2:9092/input_business.order?protocol=canal-json'
WITH (
    changefeed_id = 'tidb-canal-json-demo',
    -- Canal-JSON 特定配置
    format = 'canal-json',
    -- 同步范围
    filter_rules = ['business.order'],  -- 只同步 business 库的 order 表
    -- 同步起点
    start_ts = 0,  -- 从当前时间开始，也可指定时间戳
    -- 性能配置
    sink_uri = 'kafka://kafka-broker1:9092,kafka-broker2:9092',
    mq_partition_num = 6  -- Kafka topic 分区数
);
```


## 同步说明
1. 源库名{db}，对应数仓库名input_{db},在创建数据接入任务后自动建库。  
2. 源表名{tableName}，对应数仓表名不变,在创建数据接入任务后自动建表。  
3. 大宽表对应数仓的库表名由用户指定。  
4. 源库操作同步影响如下：  

| 源库操作							| 数仓是否自动同步？	| 数仓影响										| 风险等级							|
| :---								| :---				| :---											| :---								|
| `DML`数据变化						| ✅ 是				| 数据同步										| 低（物理删除会直接同步删除）			|
| `CREATE TABLE`创建新表			| ❌ 否				| 无任何变化										| 低（需人工修改接入任务和补偿新表数据）	|
| `ADD COLUMN` 新增字段				| ✅ 是				| 同步新增字段									| 低（字段历史数据默认值不会同步）		|
| `DROP COLUMN` 删除字段			| ❌ 否				| 无任何变化										| 低									|
| `RENAME COLUMN` 重命名字段			| ⚠️ 非直接同步		| 新增一个字段接受后续数据							| <font color=red>**高**</font>		|
| `MODIFY COLUMN` 扩大字段长度		| ✅ 是				| 字段长度变更									| 低									|
| `MODIFY COLUMN` 缩小字段长度		| ❌ 否				| 无任何变化										| 低									|
| `MODIFY COLUMN_TYPE` 修改字段类型	| ⚠️ 非直接同步		| 数据接入任务会报错，平台通过定时同步结构任务处理，但可能出现不兼容错误	| <font color=red>**高**</font>		|
| `DROP TABLE` 删除表				| ❌ 否				| 无任何变化										| 低									|
| `TRUNCATE TABLE` 截断表			| ❌ 否				| 无任何变化										| 低									|




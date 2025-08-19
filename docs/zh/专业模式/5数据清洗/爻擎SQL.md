# 爻擎SQL
爻擎大数据平台，支持所有Flink SQL 函数，另外可以根据用户需求快速进行新函数定义。
 
 
## Flink SQL函数
 > 参考：
 > - [Flink 函数](https://nightlies.apache.org/flink/flink-docs-release-1.20/zh/docs/dev/table/functions/systemfunctions/)

## 爻擎SQL函数

|函数			|说明				|样例语法				|样例结果			|
|--				|--					|--						|--					|
|LAST_2_MINUTE()|动态值，近2分钟，即前1分钟和当前分钟	|select LAST_2_MINUTE()	|2025-06-06 14:35:00|
|LAST_3_HOUR()|动态值，近3小时，即前2小时和当前小时	|select LAST_3_HOUR()	|2025-06-06 12:00:00|
|LAST_2_DAY()|动态值，近2天，即前1天和当天	|select LAST_2_DAY()	|2025-06-05 00:00:00|
|DATE_TIME_TO_DATE_DAY(dt)     |将时间dt转为天|select DATE_TIME_TO_DATE_DAY(data_time)|2025-06-06|
|DATE_TIME_TO_DATE_DAY(dt,tz)     |将时间dt转为tz时区的天|select DATE_TIME_TO_DATE_DAY(data_time,'+0800')|2025-06-06|
|DATE_TIME_TO_DATE_HOUR(dt)    |将时间dt转为时|select DATE_TIME_TO_DATE_HOUR(data_time)|2025-06-06 14|
|DATE_TIME_TO_DATE_HOUR(dt,tz)    |将时间dt转为tz时区的时|select DATE_TIME_TO_DATE_HOUR(data_time,'+0800')|2025-06-06 14|
|DATE_TIME_TO_DATE_MINUTE(dt)  |将时间dt转为分|select DATE_TIME_TO_DATE_MINUTE(data_time)|2025-06-06 14:35|
|DATE_TIME_TO_DATE_MINUTE(dt,tz)  |将时间dt转为tz时区的分|select DATE_TIME_TO_DATE_MINUTE(data_time,'+0800')|2025-06-06 14:35|


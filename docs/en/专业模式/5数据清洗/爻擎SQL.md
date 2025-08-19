# Yaoqing SQL
The Yaoqing Big Data Platform supports all standard Flink SQL functions and allows for the rapid definition of new functions based on user requirements.

## Flink SQL Functions
 > Reference:
 > - [Flink Functions](https://nightlies.apache.org/flink/flink-docs-release-1.20/docs/dev/table/functions/systemfunctions/)

## Yaoqing SQL Functions

|Function |Description |Example Syntax |Example Result |
|---|---|---|---|
|LAST_2_MINUTE()|A dynamic value representing the start of the last 2-minute window (the previous minute and the current minute). |`select LAST_2_MINUTE()` |2025-06-06 14:35:00|
|LAST_3_HOUR()|A dynamic value representing the start of the last 3-hour window (the previous two hours and the current hour). |`select LAST_3_HOUR()` |2025-06-06 12:00:00|
|LAST_2_DAY()|A dynamic value representing the start of the last 2-day window (the previous day and the current day). |`select LAST_2_DAY()` |2025-06-05 00:00:00|
|DATE_TIME_TO_DATE_DAY(dt)|Converts a datetime `dt` to a date (YYYY-MM-DD).|`select DATE_TIME_TO_DATE_DAY(data_time)`|2025-06-06|
|DATE_TIME_TO_DATE_DAY(dt,tz)|Converts a datetime `dt` to a date (YYYY-MM-DD) in the specified timezone `tz`.|`select DATE_TIME_TO_DATE_DAY(data_time,'+0800')`|2025-06-06|
|DATE_TIME_TO_DATE_HOUR(dt)|Converts a datetime `dt` to an hourly format (YYYY-MM-DD HH).|`select DATE_TIME_TO_DATE_HOUR(data_time)`|2025-06-06 14|
|DATE_TIME_TO_DATE_HOUR(dt,tz)|Converts a datetime `dt` to an hourly format (YYYY-MM-DD HH) in the specified timezone `tz`.|`select DATE_TIME_TO_DATE_HOUR(data_time,'+0800')`|2025-06-06 14|
|DATE_TIME_TO_DATE_MINUTE(dt)|Converts a datetime `dt` to a minute-level format (YYYY-MM-DD HH:MI).|`select DATE_TIME_TO_DATE_MINUTE(data_time)`|2025-06-06 14:35|
|DATE_TIME_TO_DATE_MINUTE(dt,tz)|Converts a datetime `dt` to a minute-level format (YYYY-MM-DD HH:MI) in the specified timezone `tz`.|`select DATE_TIME_TO_DATE_MINUTE(data_time,'+0800')`|2025-06-06 14:35|
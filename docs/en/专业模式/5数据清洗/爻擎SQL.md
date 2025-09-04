# Yaoqing SQL
The Yaoqing Big Data Platform allows for the rapid definition of new functions based on user requirements.

## Yaoqing SQL Functions
### Time function
|Function |Description |Example Syntax |Example Result |
|---|---|---|---|
| `LAST_2_MINUTE()` |Dynamic value. Returns the 13-digit millisecond timestamp of 1 minute ago, truncated to the minute (seconds set to 00). |`select LAST_2_MINUTE()` |`1749136500000` (Represents `2025-06-06 14:35:00`) |
| `LAST_3_HOUR()` |Dynamic value. Returns the 13-digit millisecond timestamp of 2 hours ago, truncated to the hour (minutes and seconds set to 00). |`select LAST_3_HOUR()` |`1749129600000` (Represents `2025-06-06 12:00:00`) |
| `LAST_2_DAY()` |Dynamic value. Returns the 13-digit millisecond timestamp of the previous day, truncated to the day (time set to 00:00:00). |`select LAST_2_DAY()` |`1749043200000` (Represents `2025-06-05 00:00:00`) |
| `LAST_2_MINUTE_STRING()` |Dynamic value. Returns a string for 1 minute ago, formatted as `yyyy-MM-dd HH:mm`. |`select LAST_2_MINUTE_STRING()` |`2025-06-06 14:35` |
| `LAST_3_HOUR_STRING()` |Dynamic value. Returns a string for 2 hours ago, formatted as `yyyy-MM-dd HH`. |`select LAST_3_HOUR_STRING()` |`2025-06-06 12` |
| `LAST_2_DAY_STRING()` |Dynamic value. Returns a string for the previous day, formatted as `yyyy-MM-dd`. |`select LAST_2_DAY_STRING()` |`2025-06-05` |
| `DATE_TIME_TO_DATE_DAY(timestamp)` |Converts a timestamp to a string formatted as `yyyy-MM-dd`. |`select DATE_TIME_TO_DATE_DAY(data_time)` |`2025-06-06` |
| `DATE_TIME_TO_DATE_DAY(timestamp,tz)` |Converts a timestamp to a string in the specified timezone `tz`, formatted as `yyyy-MM-dd`. |`select DATE_TIME_TO_DATE_DAY(data_time,'+0800')` |`2025-06-06` |
| `DATE_TIME_TO_DATE_HOUR(timestamp)` |Converts a timestamp to a string formatted as `yyyy-MM-dd HH`. |`select DATE_TIME_TO_DATE_HOUR(data_time)` |`2025-06-06 14` |
| `DATE_TIME_TO_DATE_HOUR(timestamp,tz)` |Converts a timestamp to a string in the specified timezone `tz`, formatted as `yyyy-MM-dd HH`. |`select DATE_TIME_TO_DATE_HOUR(data_time,'+0800')` |`2025-06-06 14` |
| `DATE_TIME_TO_DATE_MINUTE(timestamp)` |Converts a timestamp to a string formatted as `yyyy-MM-dd HH:mm`. |`select DATE_TIME_TO_DATE_MINUTE(data_time)` |`2025-06-06 14:35` |
| `DATE_TIME_TO_DATE_MINUTE(timestamp,tz)`|Converts a timestamp to a string in the specified timezone `tz`, formatted as `yyyy-MM-dd HH:mm`. |`select DATE_TIME_TO_DATE_MINUTE(data_time,'+0800')`|`2025-06-06 14:35` |
| `CURRENT_TIMESTAMP()` |Returns the current timestamp (UTC). |`SELECT CURRENT_TIMESTAMP` |`2023-10-27 10:30:00` |
| `LOCALTIMESTAMP()` |Returns the current local timestamp. |`SELECT LOCALTIMESTAMP` |`2023-10-27 18:30:00` |
| `NOW()` |Returns the current timestamp (UTC, equivalent to `CURRENT_TIMESTAMP()`). |`SELECT NOW()` |`2023-10-27 10:30:00` |
| `UNIX_TIMESTAMP()` |Returns the current Unix timestamp in seconds. |`SELECT UNIX_TIMESTAMP()` |`1678886400` |
| `UNIX_TIMESTAMP(string1[, string2])` |Converts the datetime string `string1` with the format `string2` (default `yyyy-MM-dd HH:mm:ss`) to a Unix timestamp in seconds. |`SELECT UNIX_TIMESTAMP('1970-01-01 08:00:11 +0800', 'yyyy-MM-dd HH:mm:ss X')` |`11` |
| `DATE_FORMAT(timestamp, format)` |Formats a timestamp into a specified string format. |`SELECT DATE_FORMAT(NOW(), 'yyyy-MM-dd HH:mm:ss')` |`2023-10-27 10:30:00` |
| `DATE_FORMAT(string, format)` |Converts a datetime string from one format to another. |`SELECT DATE_FORMAT('2025-08-27 11:22:33', 'yyyy-MM-dd HH:mm')` |`2025-08-27 11:22` |
| `TO_TIMESTAMP(string, format)` |Converts a string to a timestamp with a specified format. |`SELECT TO_TIMESTAMP('2023-10-27 10:30:00', 'yyyy-MM-dd HH:mm:ss')` |`2023-10-27 10:30:00` |
| `YEAR(timestamp)` |Extracts the year from a timestamp. |`SELECT YEAR(NOW())` |`2023` |
| `MONTH(timestamp)` |Extracts the month from a timestamp. |`SELECT MONTH(NOW())` |`10` |
| `DAYOFYEAR(timestamp)` |Extracts the day of the year from a timestamp. |`SELECT DAYOFYEAR(NOW())` |`239` |
| `DAYOFMONTH(timestamp)` |Extracts the day of the month from a timestamp. |`SELECT DAYOFMONTH(NOW())` |`27` |
| `DAYOFWEEK(timestamp)` |Extracts the day of the week from a timestamp (Sunday=1, Saturday=7). |`SELECT DAYOFWEEK(NOW())` |`3` |
| `HOUR(timestamp)` |Extracts the hour from a timestamp. |`SELECT HOUR(NOW())` |`10` |
| `MINUTE(timestamp)` |Extracts the minute from a timestamp. |`SELECT MINUTE(NOW())` |`30` |
| `SECOND(timestamp)` |Extracts the second from a timestamp. |`SELECT SECOND(NOW())` |`0` |


### String Functions
|Function |Description |Example Syntax |Example Result |
|---|---|---|---|
| `SUBSTRING(string, pos, len)` |Extracts a substring (position `pos` starts at 1). |`SELECT SUBSTRING('Hello World', 1, 5)` |`Hello` |
| `REPLACE(string, old, new)` |Replaces all occurrences of a specified substring. |`SELECT REPLACE('Hello World', 'l', 'L')` |`HeLLo WorLd` |
| `TRIM(string)` |Removes leading and trailing whitespace. |`SELECT TRIM('  Hello  ')` |`Hello` |
| `LTRIM(string)` |Removes leading (left) whitespace. |`SELECT LTRIM('  Hello  ')` |`Hello  ` |
| `RTRIM(string)` |Removes trailing (right) whitespace. |`SELECT RTRIM('  Hello  ')` |`  Hello` |
| `UPPER(string)` |Converts a string to uppercase. |`SELECT UPPER('hello')` |`HELLO` |
| `LOWER(string)` |Converts a string to lowercase. |`SELECT LOWER('WORLD')` |`world` |
| `LENGTH(string)` |Returns the length of a string in bytes. |`SELECT LENGTH('Hello')` |`5` |
| `CHAR_LENGTH(string)` / `CHARACTER_LENGTH(string)` |Returns the number of characters in a string. |`SELECT CHAR_LENGTH('你好')` |`2` |
| `CONCAT(string1, string2, ...)` |Concatenates two or more strings. |`SELECT CONCAT('Hello', ' ', 'World')` |`Hello World` |
| `CONCAT_WS(separator, string1, string2, ...)` |Concatenates strings with a specified separator. |`SELECT CONCAT_WS('-', 'A', 'B', 'C')` |`A-B-C` |
| `LPAD(string, len, pad)` |Left-pads a string to a specified length. |`SELECT LPAD('123', 5, '0')` |`00123` |
| `RPAD(string, len, pad)` |Right-pads a string to a specified length. |`SELECT RPAD('123', 5, '0')` |`12300` |
| `LEFT(string, len)` |Returns a specified number of characters from the left. |`SELECT LEFT('Hello', 2)` |`He` |
| `RIGHT(string, len)` |Returns a specified number of characters from the right. |`SELECT RIGHT('Hello', 3)` |`llo` |
| `REVERSE(string)` |Reverses a string. |`SELECT REVERSE('ABC')` |`CBA` |
| `MD5(string)` |Calculates the MD5 hash of a string. |`SELECT MD5('Hello')` |`8b1a9953c4611296a827abf8c47804d7` |
| `SHA256(string)` |Calculates the SHA-256 hash of a string. |`SELECT SHA256('Hello')` |`185f8db32271fe25...` |
| `REGEXP_REPLACE(str, pattern, replacement)` |Replaces substrings using a regular expression. |`SELECT REGEXP_REPLACE('abc123def', '[0-9]+', '*')` |`abc*def` |
| `REGEXP_EXTRACT(str, pattern[, index])` |Extracts a specific group using a regular expression (index starts at 1). |`SELECT REGEXP_EXTRACT('abc123def', '([a-z]+)([0-9]+)', 1)` |`abc` |
| `COALESCE(value1, value2, ...)` |Returns the first non-NULL expression from a list. |`SELECT COALESCE(NULL, 'A', 'B')` |`A` |

### Arithmetic Functions
|Function |Description |Example Syntax |Example Result |
|---|---|---|---|
| `ABS(number)` |Returns the absolute value of a number. |`SELECT ABS(-10)` |`10` |
| `CEIL(number)` |Rounds a number up to the nearest integer. |`SELECT CEIL(3.14)` |`4` |
| `FLOOR(number)` |Rounds a number down to the nearest integer. |`SELECT FLOOR(3.8)` |`3` |
| `ROUND(number, decimal_places)` |Rounds a number to a specified number of decimal places. |`SELECT ROUND(3.14159, 2)`|`3.14` |
| `POWER(base, exponent)` |Returns `base` raised to the power of `exponent`. |`SELECT POWER(2, 3)` |`8` |
| `MOD(dividend, divisor)` |Returns the remainder of a division. |`SELECT MOD(10, 3)` |`1` |
| `SIGN(number)` |Returns the sign of a number (-1, 0, or 1). |`SELECT SIGN(-5)` |`-1` |
| `EXP(number)` |Returns `e` raised to the power of `number`. |`SELECT EXP(1)` |`2.718281828` |
| `LOG10(number)` |Returns the base-10 logarithm of a number. |`SELECT LOG10(100)` |`2.0` |
| `LN(number)` |Returns the natural logarithm (base `e`) of a number. |`SELECT LN(2.718)` |`0.999...` |
| `SQRT(number)` |Returns the square root of a number. |`SELECT SQRT(9)` |`3.0` |


### JSON Functions
|Function |Description |Example Syntax |Example Result |
|---|---|---|---|
| `JSON_VALUE(json_str, path)` |Extracts a scalar value from a JSON string at a specified path. |`SELECT JSON_VALUE('{"a": 1, "b": "str"}', '$.b')`|`str` |
| `JSON_OBJECT(key1, value1, ...)` |Creates a JSON object from key-value pairs. |`SELECT JSON_OBJECT('id', 1, 'name', 'Alice')` |`{"id":1,"name":"Alice"}` |
| `JSON_ARRAY(value1, value2, ...)` |Creates a JSON array from a list of values. |`SELECT JSON_ARRAY('A', 1, TRUE)` |`["A",1,true]` |
| `JSON_QUERY(json_str, path)` |Extracts a JSON object or array from a JSON string at a specified path. |`SELECT JSON_QUERY('{"a": 1, "b": {"c": 2}}', '$.b')` |`{"c":2}` |
| `IS JSON` |Checks if a string is a valid JSON document. |`SELECT '{"a":1}' IS JSON` |`TRUE` |


### Aggregate & Window Functions
|Function |Description |Example Syntax |Example Result |
|---|---|---|---|
| `COUNT(expression)` |Returns the number of non-NULL values. |`SELECT COUNT(col)` |`10` (number of rows) |
| `COUNT(*)` |Returns the total number of rows. |`SELECT COUNT(*)` |`10` (total number of rows) |
| `SUM(numeric_expr)` |Returns the sum of a numeric expression. |`SELECT SUM(price)` |`150.75` |
| `AVG(numeric_expr)` |Returns the average value of a numeric expression. |`SELECT AVG(score)` |`85.5` |
| `MIN(expression)` |Returns the minimum value of an expression. |`SELECT MIN(value)` |`10` |
| `MAX(expression)` |Returns the maximum value of an expression. |`SELECT MAX(value)` |`100` |
| `LISTAGG(expression [, separator])` |Aggregates values into a single string (similar to `GROUP_CONCAT`). |`SELECT LISTAGG(city, ',')` |`Beijing,Shanghai` |
| `ROW_NUMBER()` |Assigns a unique, sequential integer (starting from 1) to each row. |`ROW_NUMBER() OVER (ORDER BY col)` |`1, 2, 3, ...` |
| `RANK()` |Assigns a rank for each row; ties receive the same rank, with gaps in the sequence. |`RANK() OVER (ORDER BY col)` |`1, 1, 3, 4, ...` |
| `DENSE_RANK()` |Assigns a rank for each row; ties receive the same rank, with no gaps in the sequence. |`DENSE_RANK() OVER (ORDER BY col)` |`1, 1, 2, 3, ...` |
| `FIRST_VALUE(expression)` |Returns the first value in an ordered window partition. |`FIRST_VALUE(price) OVER (PARTITION BY product ORDER BY event_time)` |(value) |
| `LAST_VALUE(expression)` |Returns the last value in an ordered window partition. |`LAST_VALUE(price) OVER (PARTITION BY product ORDER BY event_time)` |(value) |



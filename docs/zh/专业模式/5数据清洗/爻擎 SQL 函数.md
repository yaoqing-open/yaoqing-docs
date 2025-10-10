# 爻擎 SQL 函数

## 时间函数
|函数																	|说明																										|样例语法																										|样例结果										|
|--																		|--																											|--																												|--												|
| `LAST_2_MINUTE()`														| 动态值，前1分钟0秒的时间戳毫秒数																			| `select LAST_2_MINUTE()`																						| `1749191700000` (代表 `2025-06-06 14:35:00`)	|
| `LAST_3_HOUR()`														| 动态值，前2小时0分0秒的时间戳毫秒数																			| `select LAST_3_HOUR()`																						| `1749182400000` (代表 `2025-06-06 12:00:00`)	|
| `LAST_2_DAY()`														| 动态值，前1天的0时0分0秒的时间戳毫秒数																		| `select LAST_2_DAY()`																							| `1749052800000` (代表 `2025-06-05 00:00:00`)	|
| `LAST_2_MINUTE_STRING()`												| 动态值，前1分钟0秒的`yyyy-MM-dd HH:mm`的字符串																| `select LAST_2_MINUTE_STRING()`																				| `2025-06-06 14:35`							|
| `LAST_3_HOUR_STRING()`												| 动态值，前2小时0分0秒的`yyyy-MM-dd HH`的字符串																| `select LAST_3_HOUR_STRING()`																					| `2025-06-06 12`								|
| `LAST_2_DAY_STRING()`													| 动态值，前1天的0时0分0秒的`yyyy-MM-dd`的字符串																| `select LAST_2_DAY_STRING()`																					| `2025-06-05`									|
| `TIMESTAMP_TO_DATE_TYPE`<br>`(epochMilliseconds)`							| 	将毫秒数转为DATE类型																						| `select TIMESTAMP_TO_DATE_TYPE(1746759218000)`																| `2023-10-27`									|
| `TIMESTAMP_TO_TIME_TYPE`<br>`(epochMilliseconds)`							| 	将毫秒数转为TIME类型																						| `SELECT TIMESTAMP_TO_TIME_TYPE(1758263416000)`																| `14:30:16`									|
| `TIMESTAMP_TO_STRING_TYPE`<br>`(epochMilliseconds,timezoneOffset)`			| 	将毫秒转为timezoneOffset时区的字符串																		| `select `<br>`TIMESTAMP_TO_STRING_TYPE(1746759218000,'+0800')`														| 时区`+0800`的`2025-05-09 10:53:38`							|
| `TIMESTAMP_TO_STRING_TYPE`<br>`(epochMilliseconds,timezoneOffset,format)`	| 	将毫秒转为timezoneOffset时区的format时间格式的字符串														| `select `<br>`TIMESTAMP_TO_STRING_TYPE(1746759218000,'+0800','YYYY-MM-dd HH')`										| 时区`+0800`的`2025-05-09 10:53`							|
| `TIMESTAMP_TYPE_TO_TIMESTAMP`<br>`(timestamp)`								| 	将timestamp转为毫秒数																					| `SELECT `<br>`TIMESTAMP_TYPE_TO_TIMESTAMP(now())`																	| `1758264829000`								|
| `TIMESTAMP_TYPE_TO_TIMESTAMP`<br>`(timestamp,timezoneOffset)`				| 	将timestamp按时区timezoneOffset转为毫秒数																	| `SELECT `<br>`TIMESTAMP_TYPE_TO_TIMESTAMP(now(),'+0800')`															| `1758272130000`								|
| `TIMESTAMP_TYPE_TO_STRING_TYPE`<br>`(timestamp,timezoneOffset)`				|	将timestamp按时区timezoneOffset转为字符串																	| `select `<br>`TIMESTAMP_TYPE_TO_STRING_TYPE(now(),'+0800')`															| `2023-10-27 18:30:00`							|
| `TIMESTAMP_TYPE_TO_STRING_TYPE`<br>`(timestamp,timezoneOffset,format)`		|	将timestamp按时区timezoneOffset转为format时间格式的字符串													| `select `<br>`TIMESTAMP_TYPE_TO_STRING_TYPE(now(),'+0800','YYYY-MM-dd HH')`											| `2023-10-27 18`								|
| `TIMESTAMP_TO_DATE_START`<br>`(epochMilliseconds,timezoneOffset)`			| 将时间戳毫秒值epochMilliseconds转化成对应时区的日期开始时间毫秒值											| `SELECT `<br>`TIMESTAMP_TO_DATE_START(1758285997000,'+0800')`														| `1758211200000` (对应时区`+0800`的2025-09-19 00:00:00.000)	|
| `TIMESTAMP_TO_DATE_END`<br>`(epochMilliseconds,timezoneOffset)`				| 将时间戳毫秒值epochMilliseconds转化成对应时区的日期结束时间毫秒值											| `SELECT `<br>`TIMESTAMP_TO_DATE_END(1758285997000,'+0800')`															| `1758297599999` (对应时区`+0800`的2025-09-19 23:59:59.999)	|
| `TIMESTAMP_TO_HOUR_START`<br>`(epochMilliseconds,timezoneOffset)`			| 将时间戳毫秒值epochMilliseconds转化成对应时区的小时开始时间毫秒值											| `SELECT `<br>`TIMESTAMP_TO_HOUR_START(1758285997000,'+0800')`														| `1758283200000` (对应时区`+0800`的2025-09-19 20:00:00.000)	|
| `TIMESTAMP_TO_HOUR_END`<br>`(epochMilliseconds,timezoneOffset)`				| 将时间戳毫秒值epochMilliseconds转化成对应时区的小时结束时间毫秒值											| `SELECT `<br>`TIMESTAMP_TO_HOUR_END(1758285997000,'+0800')`															| `1758286799999` (对应时区`+0800`的2025-09-19 20:59:59.999)	|
| `DATE_STRING_TO_TIMESTAMP_START`<br>`(date,timezoneOffset)`					| 将yyyy-MM-dd格式的小时字符串，以时区偏移timezoneOffset(如+0800)，解析为该天的0时0分0秒时间戳毫秒,				| `SELECT `<br>`DATE_STRING_TO_TIMESTAMP_START('2025-05-19','+0800')`													| `1758211200000` (对应时区`+0800`的2025-09-19 00:00:00.000)	|
| `DATE_STRING_TO_TIMESTAMP_END`<br>`(date,timezoneOffset)`					| 将yyyy-MM-dd格式的小时字符串，以时区偏移timezoneOffset(如+0800)，解析为该天的23时59分59秒时间戳毫秒,			| `SELECT `<br>`DATE_STRING_TO_TIMESTAMP_END('2025-05-19','+0800')`													| `1758297599999` (对应时区`+0800`的2025-09-19 23:59:59.999)	|
| `HOUR_STRING_TO_TIMESTAMP_START`<br>`(hour,timezoneOffset)`					| 将yyyy-MM-dd HH格式的小时字符串，以时区偏移timezoneOffset(如+0800)，解析为该小时的0分0秒时间戳毫秒			| `SELECT `<br>`HOUR_STRING_TO_TIMESTAMP_START('2025-05-19 20','+0800')`												| `1758283200000` (对应时区`+0800`的2025-09-19 20:00:00.000)	|
| `HOUR_STRING_TO_TIMESTAMP_END`<br>`(hour,timezoneOffset)`					| 将yyyy-MM-dd HH格式的小时字符串，以时区偏移timezoneOffset(如+0800)，解析为该小时的59分59秒时间戳毫秒,			| `SELECT `<br>`HOUR_STRING_TO_TIMESTAMP_END('2025-05-19 20','+0800')`												| `1758286799999` (对应时区`+0800`的2025-09-19 20:59:59.999)	|
| `STRING_TYPE_TO_TIMESTAMP`<br>`(string,format,timezoneOffset)`				|				以format格式解析string字符串按时区timezoneOffset	转为	时间戳毫秒数								| `SELECT `<br>`STRING_TYPE_TO_TIMESTAMP('2025-05-09 12:53:38.123','yyyy-MM-dd HH:mm:ss.SSS','+0800')`				| `1746766418000`								|
| `FROM_UNIXTIME(epochSeconds[, format])`								| 	将秒数转为format（默认`yyyy-MM-dd HH:mm:ss`）的时间格式的字符串											| `SELECT `<br>`FROM_UNIXTIME(1746759218000/1000)`  `SELECT FROM_UNIXTIME(1746759218000/1000,'yyyy-MM-dd HH:mm:ss')`	| `2025-05-09 10:53:38`							|
| `NOW()`																| 返回服务器时区的当前timestamp																							| `SELECT NOW()`																								| `2023-10-27 10:30:00`							|
| `UNIX_TIMESTAMP()`													| 返回当前时间戳秒数																							| `SELECT UNIX_TIMESTAMP()`																						| `1678886400`									|
| `UNIX_TIMESTAMP(string[, format])`									| 将格式为 format（默认`yyyy-MM-dd HH:mm:ss`）的日期时间字符串 string 转换为时间戳秒数							| `SELECT UNIX_TIMESTAMP('1970-01-01 08:00:11 +0800', 'yyyy-MM-dd HH:mm:ss X')`									| `11`											|
| `DATE_FORMAT(timestamp, format)`										| 将timestamp格式化为指定字符串																				| `SELECT DATE_FORMAT(NOW(), 'yyyy-MM-dd HH:mm:ss')`															| `2023-10-27 10:30:00`							|
| `DATE_FORMAT(string, format)`											| 将时间字符串格式化为另一个时间格式字符串																		| `SELECT DATE_FORMAT('2025-08-27 11:22:33', 'yyyy-MM-dd HH:mm')`												| `2025-08-27 11:22`							|
| `TO_TIMESTAMP(string, format)`										| 将字符串转换为timestamp																					| `SELECT TO_TIMESTAMP('2023-10-27 10:30:00', 'yyyy-MM-dd HH:mm:ss')`											| `2023-10-27 10:30:00`							|
| `TO_TIMESTAMP_LTZ(numeric, precision)`								| 将秒数或者毫秒数按集群时区转换为timestamp类型，precision=0 则numeric为秒数， precision=3 则numeric为毫秒数	| `SELECT TO_TIMESTAMP_LTZ(1746759218000, 3)`																	| `2025-09-19 08:52:50`							|
| `YEAR(timestamp)`														| 提取时间戳的年份																							| `SELECT YEAR(NOW())`																							| `2023`										|
| `MONTH(timestamp)`													| 提取时间戳的月份																							| `SELECT MONTH(NOW())`																							| `10`											|
| `DAYOFYEAR(timestamp)`												| 提取时间戳一年中的第几天																					| `SELECT DAYOFYEAR(NOW())`																						| `239`											|
| `DAYOFMONTH(timestamp)`												| 提取时间戳一个月中的第几天																					| `SELECT DAYOFMONTH(NOW())`																					| `27`											|
| `DAYOFWEEK(timestamp)`												| 提取时间戳一个星期中的第几天	(周日算第一天，周六算第七天)													| `SELECT DAYOFWEEK(NOW())`																						| `3`											|
| `HOUR(timestamp)`														| 提取时间戳的小时																							| `SELECT HOUR(NOW())`																							| `10`											|
| `MINUTE(timestamp)`													| 提取时间戳的分钟																							| `SELECT MINUTE(NOW())`																						| `30`											|
| `SECOND(timestamp)`													| 提取时间戳的秒数																							| `SELECT SECOND(NOW())`																						| `0`											|

## 字符串函数
|函数										|说明											|样例语法																|样例结果							|
|--											|--												|--																		|--									|
| `SUBSTRING(string, pos, len)`           | 提取字符串子串 (pos 从 1 开始)           | `SELECT SUBSTRING('Hello Yaoqing', 1, 5)`            | `Hello`              |
| `REPLACE(string, old, new)`             | 替换字符串中的所有匹配项                 | `SELECT REPLACE('Hello World', 'l', 'L')`          | `HeLLo WorLd`        |
| `TRIM(string)`                          | 移除字符串两端的空格                     | `SELECT TRIM('  Yaoqing  ')`                         | `Yaoqing`              |
| `LTRIM(string)`                         | 移除字符串左侧的空格                     | `SELECT LTRIM('  Yaoqing  ')`                        | `Yaoqing  `            |
| `RTRIM(string)`                         | 移除字符串右侧的空格                     | `SELECT RTRIM('  Yaoqing  ')`                        | `  Yaoqing`            |
| `UPPER(string)`                         | 转换为大写                               | `SELECT UPPER('hello')`                            | `HELLO`              |
| `LOWER(string)`                         | 转换为小写                               | `SELECT LOWER('Yaoqing')`                            | `yaoqing`              |
| `LENGTH(string)`                        | 返回字符串长度                           | `SELECT LENGTH('Yaoqing')`                           | `7`                  |
| `CHAR_LENGTH(string)` / `CHARACTER_LENGTH(string)` | 返回字符串字符数 (等同于 LENGTH)         | `SELECT CHAR_LENGTH('你好')`                       | `2`                  |
| `CONCAT(string1, string2, ...)`         | 拼接字符串                               | `SELECT CONCAT('Hello', ' ', 'Yaoqing')`            | `Hello Yaoqing`        |
| `CONCAT_WS(separator, string1, string2, ...)` | 使用分隔符拼接字符串                     | `SELECT CONCAT_WS('-', 'A', 'B', 'C')`             | `A-B-C`              |
| `LPAD(string, len, pad)`                | 左侧填充字符串到指定长度                 | `SELECT LPAD('123', 5, '0')`                       | `00123`              |
| `RPAD(string, len, pad)`                | 右侧填充字符串到指定长度                 | `SELECT RPAD('123', 5, '0')`                       | `12300`              |
| `LEFT(string, len)`                     | 返回字符串左侧指定长度子串               | `SELECT LEFT('Hello', 2)`                          | `He`                 |
| `RIGHT(string, len)`                    | 返回字符串右侧指定长度子串               | `SELECT RIGHT('Hello', 3)`                         | `llo`                |
| `REVERSE(string)`                       | 反转字符串                               | `SELECT REVERSE('ABC')`                            | `CBA`                |
| `MD5(string)`                           | 计算 MD5 散列值                          | `SELECT MD5('Yaoqing')`                              | `ef4027f399fef1c5afac44cf70468d1e` |
| `SHA256(string)`                        | 计算 SHA-256 散列值                      | `SELECT SHA256('Yaoqing')`                           | `4f2...`  |
| `REGEXP_REPLACE(str, pattern, replacement)` | 正则表达式替换                           | `SELECT REGEXP_REPLACE('abc123def', '[0-9]+', '*')` | `abc*def`            |
| `REGEXP_EXTRACT(str, pattern[, index])`   | 正则表达式提取指定组（index 从 1 开始）                     | `SELECT REGEXP_EXTRACT('abc123def', '([a-z]+)([0-9]+)', 1)` | `abc`                |
| `COALESCE(value1, value2, ...)`			| 返回第一个非 NULL 的表达式						| `SELECT COALESCE(NULL, 'A', 'B')`										| `A`								|

## 算术函数
|函数								|说明							|样例语法					|样例结果		|
|--									|--								|--							|--				|
| `ABS(number)`						| 返回数字的绝对值				| `SELECT ABS(-10)`			| `10`			|
| `CEIL(number)`					| 向上取整						| `SELECT CEIL(3.14)`		| `4`			|
| `FLOOR(number)`					| 向下取整						| `SELECT FLOOR(3.8)`		| `3`			|
| `ROUND(number, decimal_places)`	| 四舍五入到指定小数位数			| `SELECT ROUND(3.14159, 2)`| `3.14`		|
| `POWER(base, exponent)`			| 返回 `base` 的 `exponent` 次方	| `SELECT POWER(2, 3)`		| `8`			|
| `MOD(dividend, divisor)`			| 返回两数相除的余数				| `SELECT MOD(10, 3)`		| `1`			|
| `SIGN(number)`					| 返回数字的符号 (-1, 0, 1)		| `SELECT SIGN(-5)`			| `-1`			|
| `EXP(number)`						| 返回 `e` 的 `number` 次方		| `SELECT EXP(1)`			| `2.718281828`	|
| `LOG10(number)`					| 返回以 10 为底的对数			| `SELECT LOG10(100)`		| `2.0`			|
| `LN(number)`						| 返回自然对数 (以 `e` 为底)		| `SELECT LN(2.718)`		| `0.999...`	|
| `SQRT(number)`					| 返回数字的平方根				| `SELECT SQRT(9)`			| `3.0`			|

## JSON函数
|函数								|说明							|样例语法					|样例结果		|
|--									|--								|--							|--				|
| `JSON_VALUE(json_str, path)`      | 提取 JSON 字符串中指定路径的值           | `SELECT JSON_VALUE('{"a": 1, "b": "str"}', '$.b')`| `str`                        |
| `JSON_OBJECT(key1, value1, ...)`  | 创建 JSON 对象                           | `SELECT JSON_OBJECT('id', 1, 'name', 'Alice')`    | `{"id":1,"name":"Alice"}`    |
| `JSON_ARRAY(value1, value2, ...)` | 创建 JSON 数组                           | `SELECT JSON_ARRAY('A', 1, TRUE)`                 | `["A",1,true]`               |
| `JSON_QUERY(json_str, path)`      | 提取 JSON 字符串中指定路径的 JSON 片段   | `SELECT JSON_QUERY('{"a": 1, "b": {"c": 2}}', '$.b')` | `{"c":2}`                    |
| `IS JSON`               | 判断字符串是否是有效的 JSON              | `SELECT '{"a":1}' IS JSON`                        | `TRUE`                       |

## 聚合函数
|函数								|说明							|样例语法					|样例结果		|
|--									|--								|--							|--				|
| `COUNT(expression)`           | 返回非 NULL 值的数量                     | `SELECT COUNT(col)`  | `10` (行数)   |
| `COUNT(*)`                    | 返回总行数                               | `SELECT COUNT(*)`    | `10` (总行数) |
| `SUM(numeric_expr)`           | 返回数值表达式的和                       | `SELECT SUM(price)`  | `150.75`      |
| `AVG(numeric_expr)`           | 返回数值表达式的平均值                   | `SELECT AVG(score)`  | `85.5`        |
| `MIN(expression)`             | 返回表达式的最小值                       | `SELECT MIN(value)`  | `10`          |
| `MAX(expression)`             | 返回表达式的最大值                       | `SELECT MAX(value)`  | `100`         |
| `LISTAGG(expression [xxx, separator])` | 将所有值连接成一个字符串 (类似 GROUP_CONCAT) | `SELECT LISTAGG(city, ',')` | `Beijing,Shanghai` |
| `ROW_NUMBER()` | 为每行分配唯一的连续序号（从1开始）| `SELECT LISTAGG(city, ',')` | `1, 2, 3, ...` |
| `RANK()` | 排名，相同值会有相同排名，后续排名会跳过 | `SELECT LISTAGG(city, ',')` | `1, 1, 3, 4, ...` |
| `DENSE_RANK)` | 密集排名，相同值相同排名，但后续排名不跳过 | `SELECT LISTAGG(city, ',')` | `1, 1, 2, 3, ...` |
| `FIRST_VALUE()` | 获取窗口内第一个值 | `SELECT FIRST_VALUE(price) OVER (PARTITION BY product ORDER BY event_time)` |  |
| `LAST_VALUE()` | 获取窗口内最后一个值 | `SELECT LAST_VALUE(price) OVER (PARTITION BY product ORDER BY event_time)` |  |


<div style="overflow-x: auto; max-width: 100%;">
  <table>
    <thead>
      <tr>
        <th style="width: 25%;">函数</th>
         <th style="width: 25%;">说明</th>
         <th style="width: 25%;">样例语法</th>
         <th style="width: 25%;">样例结果</th>
      </tr>
    </thead>
    <tbody>
        <tr>
          <td> `TIMESTAMP_TO_STRING_TYPE(epochMilliseconds,timezoneOffset,format)`</td>
          <td>将毫秒转为timezoneOffset时区的format时间格式的字符串</td>
          <td>`select TIMESTAMP_TO_STRING_TYPE(1746759218000,'+0800','YYYY-MM-dd HH')`</td>
          <td> `1758211200000` (对应时区`+0800`的2025-09-19 00:00:00.000)</td>
        </tr>
        <tr>
          <td>`LISTAGG(expression [, separator])`</td>
          <td>将所有值连接成一个字符串 (类似 GROUP_CONCAT)</td>
          <td>`SELECT LISTAGG(city, ',')`</td>
          <td>`Beijing,Shanghai`</td>
        </tr>
    </tbody>
  </table>
</div>

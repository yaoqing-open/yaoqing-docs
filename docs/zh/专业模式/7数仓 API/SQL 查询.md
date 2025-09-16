# SQL 查询

---

## `#{}` 注入参数

作用与 MyBatis 保持一致，将 `#{xxx}` 占位符，注入为具体值。**此方式可以避免 SQL 注入。**

```java
var id = 123;
return db.select("""
    SELECT * FROM sys_user WHERE id = #{id}
""");
```

运行时生成的 SQL 为：`SELECT * FROM sys_user WHERE id = ?`。

参数 `id` 的值，会被注入为 `123`。

## `${}` 拼接参数
作用与 MyBatis 保持一致，将 `${xxx}` 占位符，替换为具体值。

```java
var id = 123;
return db.select("""
    SELECT * FROM sys_user WHERE id = ${id}
""");
```

运行时生成的 SQL 为：`SELECT * FROM sys_user WHERE id = 123`

## 动态 SQL 参数
通过 `?{condition, expression}` 来实现动态拼接 SQL，如果条件成立，则拼接后部分内容到 SQL 中，与 MyBatis 中的 `<if>` 标签基本一致

```java
return db.select("SELECT * FROM sys_user ?{id, WHERE id = #{id}}");
// 当 id 有值时，生成SQL：SELECT * FROM sys_user WHERE id = ?`，相当于 MyBatis 中的 <if test="id != null and id != ''">
// 当 id 无值时，生成SQL：SELECT * FROM sys_user

return db.select("SELECT * FROM sys_user ?{id != null && id.length() > 3, WHERE id = #{id}}");
// 当 id != null && id.length() > 3 判断为 true 时，生成SQL：SELECT * FROM sys_user WHERE id = ?
// 当判断为 false 时，生成SQL：SELECT * FROM sys_user
```

## SQL缓存
```java
// 将查询结果缓存到名为user_cache的缓存中，有效期1小时
return db.cache("user_cache", 3600 * 1000).select("""
    select * from sys_user
""")

// 当执行以下语句时，将清空 user_cache 缓存
db.cache("user_cache").update(""" ...... """)
db.cache("user_cache").insert(""" ...... """)
```

TODO 缓存更新问题

## 使用事务
--

### 自动事务
```java
var val = db.transaction(()=>{
    var v1 = db.update('...');
    var v2 = db.update('....');
    return v2;
});
return val;
```

### 手动事务
```java
var tx = db.transaction();  //开启事务
try{
    var value = db.update('...');
    tx.commit();    // 提交事务
    return value;
}catch(e){
    tx.rollback();  // 回滚事务
}
```

## MyBatis 语法支持
参考: https://mybatis.org/mybatis-3/zh/dynamic-sql.html

### 标签
- `<if>`
- `<elseif>`
- `<else>`
- `<where>`
- `<foreach>`
- `<trim>`
- `<set>`

#### `<if>`
```java
var sql = """
SELECT * FROM test_data
	WHERE 1 = 1
	<if test="id != null">
        AND id = #{id}
    </if>
"""

return db.select(sql)
```
这条语句提供了可选的查找 id 功能。如果不传入 id，将会返回所有数据，否则返回 id 匹配的数据。

#### `<elseif>`
```java
var sql = """
SELECT * FROM test_data
	WHERE 1 = 1
	<if test="id == null">
        AND id = 0
    </if>
    <elseif test="id < 1000">
        AND id = #{id}
    </elseif>
"""

return db.select(sql)
```
这条语句提供了可选的查找 id 功能。如果不传入 id，将拼接 `AND id = 0`，否则 id 小于 1000 时拼接 `and id = #{id}`

#### `<else>`
```java
var sql = """
SELECT * FROM test_data
	WHERE
	<if test="id == null">
        id = 0
    </if>
    <else>
        id = #{id}
    </else>
"""
return db.select(sql)
```
这条语句提供了可选的查找 id 功能。如果不传入 id，将拼接 `AND id = 0`，否则拼接 `AND id = #{id}`

#### `<where>`
```java
var sql = """
SELECT * FROM test_data
<where>
    <if test="id != null">
        AND id = #{id}
    </if>
</where>
"""

return db.select(sql)
```
`<where>` 标签只会在子标签返回任何内容的情况下才插入 WHERE 子句。而且，若子句的开头为 AND 或 OR，`<where>` 标签也会将它们去除。

如果 `<where>` 标签与你期望的不太一样，你也可以通过自定义 `<trim>` 标签来定制 `<where>` 标签的功能。比如，和 `<where>` 标签等价的自定义 `<trim>` 标签为：
```java
<trim prefix="WHERE" prefixOverrides="AND | OR ">
  ...
</trim>
```
prefixOverrides 属性会忽略通过管道符分隔的文本序列（注意此例中的空格是必要的）。

上述例子会移除所有 prefixOverrides 属性中指定的内容，并且插入 prefix 属性中指定的内容。

#### `<foreach>`
动态 SQL 的另一个常见使用场景是对集合进行遍历（尤其是在构建 IN 条件语句的时候）。比如：
```java
var sql = """
SELECT * FROM test_data
WHERE id in
<foreach item='item' index='index' collection='body.ids'
      open="(" separator="," close=")">
    #{item}
</foreach>
"""

return db.select(sql)
```

`<foreach>` 标签的功能非常强大，它允许你指定一个集合，声明可以在标签体内使用的集合项 item 和索引 index 变量。它也允许你指定开头与结尾的字符串以及集合项迭代之间的分隔符。

## 异步调用
### 普通方法
```java
// 使用 async 关键字，会启动一个线程去执行，返回 Future，并不等待结果继续执行后续代码
var user1 = async db.select("SELECT * FROM sys_user WHERE id = 1");
var user2 = async db.select("SELECT * FROM sys_user WHERE id = 2");

// 调用get方法表示阻塞等待获取结果
return [user1.get(), user2.get()];
```

### lambda
```java
var list = [];

// var selectUser = (userId) => db.select("SELECT * FROM sys_user WHERE id = #{userId}");
// for(index in range(1, 10)){
//     list.add(async selectUser(index));
// }

for(index in range(1,10)){
    // 当异步中使用外部变量时，为了确保线程安全的变量，可以将其放在形参中
    list.add(async (index) => db.select("SELECT * FROM sys_user WHERE id = #{index}"));
}

// 以上两种方式都可以
return list.map(item => item.get());
```

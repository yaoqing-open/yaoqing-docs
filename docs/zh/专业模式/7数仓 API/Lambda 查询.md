# Lambda 查询

---

## select
查询list（与 db.select 作用相同）

```java
// SELECT * FROM sys_user
return db.table('sys_user').select()
```

## page
分页查询（与 db.page 作用相同）
```java
// SELECT * FROM sys_user
return db.table('sys_user').page()
```

## where
- eq → `==`
- ne → `<>`
- lt → `<`
- gt → `>`
- lte → `<=`
- gte → `>=`
- in → `IN`
- notIn → `NOT IN`
- like → `LIKE`
- notLike → `NOT LIKE`

```java
// SELECT * FROM sys_user WHERE user_name LIKE '%李富贵%' AND role = 'admin'
return db.table('sys_user')
    .where()
    .like('user_name','%李富贵%')
    .eq('role','admin')
    .select()
```

TODO 将 mybatis-plus 文档内容，美化后搬到这

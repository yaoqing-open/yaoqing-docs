# 数仓 API

---

## 功能介绍

数仓API是一个基于Java的接口快速开发工具，编写接口将通过数仓API提供的UI界面完成，自动映射为HTTP接口。 
无需定义Controller、Service、Dao、Mapper、XML、VO等Java对象即可完成数仓数据查询的HTTP API接口开发。

## 使用示例

```hsqldb
import request;
import lombok.experimental.var;
import bd.dw.api.util.DateUtil;
// 获取租户时区
var timeZone = db.select("""
select default_time_zone from ts_live_t_tenant_base_config where tenant_sys = #{tenantSys}
"""
).get(0).defaultTimeZone;

// 获取日期列表
var dayList = DateUtil.getDayZoneList(startTime, endTime, timeZone);
var startDay = DateUtil.toDateStrZone(startTime, timeZone);
var endDay = DateUtil.toDateStrZone(endTime, timeZone);

return db.page("""
    select * from (
        SELECT
            a.reportDate mergeDay,
            b.*
        FROM
        <if test="dayList !=null">
            <foreach collection="dayList" item="item" open="(" separator="union all " close=")">
                SELECT #{item} AS reportDate
            </foreach>
        </if>
        AS a
        LEFT JOIN (
            SELECT
                merge_day mergeDay1,
                ROUND(IFNULL( init_balance, 0 ), 2 ) initBalance,
                ROUND(IFNULL( recharge_coin, 0 ), 2 ) rechargeCoin,
                ROUND(IFNULL( manual_deposit, 0 ), 2 ) manualDeposit,
                ROUND(IFNULL( withdrawal_amount, 0 ), 2 ) withdrawalAmount,
                ROUND(IFNULL( platform_exchange, 0 ), 2 ) platformExchange,
                ROUND(IFNULL( reject, 0 ), 2 ) reject,
                ROUND(IFNULL( manual_withdrawal, 0 ), 2 ) manualWithdrawal,
                ROUND(IFNULL( event_winnings, 0 ), 2 ) eventWinnings,
                ROUND(IFNULL( manual_winnings, 0 ), 2 ) manualWinnings,
                ROUND(IFNULL( third_game_upscore, 0 ), 2 ) thirdGameUpscore,
                ROUND(IFNULL( third_game_lower_score, 0 ), 2 ) thirdGameLowerScore,
                ROUND(IFNULL( end_balance, 0 ), 2 ) endBalance,
                ROUND(IFNULL( check_end_balance, 0 ), 2 ) checkEndBalance,
                ROUND(IFNULL( difference, 0 ), 2 ) difference,
                if(difference > 1 or difference < -1, 0, 1) status,
                gmt_create,
                gmt_update
            from assets_change_code_if_tenant
            <where>
                <if test="startDay != null and startDay != ''">
                    AND merge_day >= #{startDay}
                </if>
                <if test="endDay != null and endDay != ''">
                    AND merge_day <= #{endDay}
                </if>
                <if test="tenantSys != null and tenantSys != ''">
                    AND tenant_sys = #{tenantSys}
                </if>
                <if test="currencyId != null and currencyId != ''">
                    AND currency_id = #{currencyId}
                </if>
            </where>
        ) b ON a.reportDate = b.mergeDay1
    ) t
    <where>
        <if test="status != null">
            AND t.status = #{status}
        </if>
    </where>
    order by t.mergeDay desc
""");
```

## 鉴权&调用
### 一、概述
数仓API 采用 **OAuth 2.0 客户端模式（Client Credentials Grant）** 进行鉴权。  
此模式用于 **服务端到服务端** 的调用场景，无需用户登录。  
客户端使用自身的 `client_id` 与 `client_secret` 从授权服务器换取访问令牌（Access Token）。

### 二、授权流程

1. 客户端向授权服务器发送 `client_id` 与 `client_secret`，申请令牌。
2. 授权服务器验证凭证，返回 `access_token`。
3. 客户端使用 `access_token` 访问受保护的 API。

### 三、获取 Access Token
**接口地址：**
POST /oauth/token

**请求头：**
Content-Type: application/x-www-form-urlencoded

**请求参数：**

| 参数名 | 必填 | 示例值 | 说明 |
|--------|------|--------|------|
| grant_type | 是 | client_credentials | 授权类型，固定值 |
| client_id | 是 | test_client | 客户端 ID |
| client_secret | 是 | test_secret | 客户端密钥 |

---

✅ 请求示例

```bash
curl -X POST https://api.example.com/oauth/token \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials" \
  -d "client_id=test_client" \
  -d "client_secret=test_secret"
```
✅ 响应示例
```json
{
"access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6Ikp...",
"token_type": "bearer",
"expires_in": 3600,
"scope": "read write"
}
```

### 四、使用 Access Token 调用接口
**请求头格式：**
Authorization: Bearer {access_token}

✅ 接口示例
```bash
curl -X GET https://api.example.com/api/v1/user/list \
-H "Authorization: Bearer eyJhbGciOiJIUzI1NiIs..."
-H "Tenantco: 项目编码"
```
### 五、Token 过期与刷新

客户端模式下通常 不支持 refresh_token。
当 access_token 过期后，直接重新调用 /oauth/token 获取新的令牌即可。

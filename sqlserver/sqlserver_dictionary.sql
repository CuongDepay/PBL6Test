IF OBJECT_ID('sys_dict_type', 'U') IS NOT NULL
  DROP TABLE sys_dict_type;
GO
CREATE TABLE sys_dict_type
(
    dict_id     bigint                      NOT NULL,
    tenant_id   nvarchar(20)  DEFAULT ('000000') NULL,
    dict_name   nvarchar(100) DEFAULT ''    NULL,
    dict_type   nvarchar(100) DEFAULT ''    NULL,
    status      nchar(1)      DEFAULT ('0') NULL,
    create_dept bigint                      NULL,
    create_by   bigint                      NULL,
    create_time datetime2(7)                NULL,
    update_by   bigint                      NULL,
    update_time datetime2(7)                NULL,
    remark      nvarchar(500)               NULL,
    CONSTRAINT PK__sys_dict__3BD4186C409C5391 PRIMARY KEY CLUSTERED (dict_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

CREATE NONCLUSTERED INDEX sys_dict_type_index1 ON sys_dict_type (tenant_id, dict_type)
GO

INSERT sys_dict_type VALUES (1, N'000000', N'User gender', N'sys_user_sex', N'0', 103, 1, getdate(), NULL, NULL, N'User Gender List')
GO
INSERT sys_dict_type VALUES (2, N'000000', N'Menu status', N'sys_show_hide', N'0', 103, 1, getdate(), NULL, NULL, N'Menu Status List')
GO
INSERT sys_dict_type VALUES (3, N'000000', N'System switch', N'sys_normal_disable', N'0', 103, 1, getdate(), NULL, NULL, N'System switch list')
GO
INSERT sys_dict_type VALUES (4, N'000000', N'Data history type', N'sys_data_history_type', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_type VALUES (5, N'000000', N'Đối tượng khách hàng', N'customer_type', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_type VALUES (6, N'000000', N'Phương thức thanh toán', N'payment_type', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_type VALUES (7, N'000000', N'Cấu hình thanh toán VNPAY', N'pm_config_vnpay', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_type VALUES (8, N'000000', N'Không Có', N'sys_no_yes', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_type VALUES (9, N'000000', N'Trạng thái đặt vé', N'order_status', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO

IF OBJECT_ID('sys_dict_data', 'U') IS NOT NULL
  DROP TABLE sys_dict_data;
GO
CREATE TABLE sys_dict_data
(
    dict_code   bigint                      NOT NULL,
    tenant_id   nvarchar(20)  DEFAULT ('000000') NULL,
    dict_sort   int           DEFAULT ((0)) NULL,
    dict_label  nvarchar(100) DEFAULT ''    NULL,
    dict_value  nvarchar(100) DEFAULT ''    NULL,
    dict_type   nvarchar(100) DEFAULT ''    NULL,
    css_class   nvarchar(100)               NULL,
    list_class  nvarchar(100)               NULL,
    is_default  nchar(1)      DEFAULT ('N') NULL,
    status      nchar(1)      DEFAULT ('0') NULL,
    create_dept bigint                      NULL,
    create_by   bigint                      NULL,
    create_time datetime2(7)                NULL,
    update_by   bigint                      NULL,
    update_time datetime2(7)                NULL,
    remark      nvarchar(500)               NULL,
    CONSTRAINT PK__sys_dict__19CBC34B661AF3B3 PRIMARY KEY CLUSTERED (dict_code)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT sys_dict_data VALUES (1, N'000000', 1, N'Male', N'0', N'sys_user_sex', N'', N'', N'Y', N'0', 103, 1, getdate(), NULL, NULL, N'Sex: Male')
GO
INSERT sys_dict_data VALUES (2, N'000000', 2, N'Female', N'1', N'sys_user_sex', N'', N'', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'Gender: Female')
GO
INSERT sys_dict_data VALUES (3, N'000000', 3, N'Unknown', N'2', N'sys_user_sex', N'', N'', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'Gender Unknown')
GO
INSERT sys_dict_data VALUES (4, N'000000', 1, N'Show', N'0', N'sys_show_hide', N'', N'blue', N'Y', N'0', 103, 1, getdate(), NULL, NULL, N'Show menu')
GO
INSERT sys_dict_data VALUES (5, N'000000', 2, N'Hide', N'1', N'sys_show_hide', N'', N'red', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'Hide menu')
GO
INSERT sys_dict_data VALUES (6, N'000000', 1, N'Normal', N'0', N'sys_normal_disable', N'', N'blue', N'Y', N'0', 103, 1, getdate(), NULL, NULL, N'Normal status')
GO
INSERT sys_dict_data VALUES (7, N'000000', 2, N'Disable', N'1', N'sys_normal_disable', N'', N'red', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'Disable status')
GO
INSERT sys_dict_data VALUES (8, N'000000', 1, N'CASH', N'CASH', N'payment_type', N'', N'green', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_data VALUES (9, N'000000', 2, N'BANK', N'BANK', N'payment_type', N'', N'yellow', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_data VALUES (10, N'000000', 1, N'https://sandbox.vnpayment.vn/paymentv2/vpcpay.html', N'vnp_PayUrl', N'pm_config_vnpay', N'', N'blue', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_data VALUES (11, N'000000', 2, N'http://localhost/payment-result/vnpay-payment-result', N'vnp_ReturnUrl', N'pm_config_vnpay', N'', N'red', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_data VALUES (12, N'000000', 3, N'SFRH95M6', N'vnp_TmnCode', N'pm_config_vnpay', N'', N'purple', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_data VALUES (13, N'000000', 4, N'RRVRYHJPWWBGMJPZLIOJOKMQHWRZORQG', N'secretKey', N'pm_config_vnpay', N'', N'yellow', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_data VALUES (14, N'000000', 5, N'https://sandbox.vnpayment.vn/merchant_webapi/api/transaction', N'vnp_ApiUrl', N'pm_config_vnpay', N'', N'green', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_data VALUES (15, N'000000', 1, N'Không', N'0', N'sys_no_yes', N'', N'yellow', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_data VALUES (16, N'000000', 2, N'Có', N'1', N'sys_no_yes', N'', N'green', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_data VALUES (17, N'000000', 1, N'Chưa đặt vé', N'N', N'order_status', N'', N'gray', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_data VALUES (18, N'000000', 2, N'Đã được chọn', N'P', N'order_status', N'', N'yellow', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO
INSERT sys_dict_data VALUES (19, N'000000', 3, N'Đã đặt vé', N'Y', N'order_status', N'', N'green', N'N', N'0', 103, 1, getdate(), NULL, NULL, N'')
GO

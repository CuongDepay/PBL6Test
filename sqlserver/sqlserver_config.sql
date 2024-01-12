IF OBJECT_ID('sys_config', 'U') IS NOT NULL 
  DROP TABLE sys_config;
GO
CREATE TABLE sys_config
(
    config_id    bigint                      NOT NULL,
    tenant_id    nvarchar(20)  DEFAULT '000000'  NULL,
    config_name  nvarchar(100) DEFAULT ''    NULL,
    config_key   nvarchar(100) DEFAULT ''    NULL,
    config_value nvarchar(500) DEFAULT ''    NULL,
    config_type  nchar(1)      DEFAULT ('N') NULL,
    create_dept  bigint                      NULL,
    create_by    bigint                      NULL,
    create_time  datetime2(7)                NULL,
    update_by    bigint                      NULL,
    update_time  datetime2(7)                NULL,
    remark       nvarchar(500)               NULL,
    CONSTRAINT PK__sys_conf__4AD1BFF182643682 PRIMARY KEY CLUSTERED (config_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT sys_config VALUES (1, N'000000', N'User Management-Account Initial Password', N'sys.user.initPassword', N'123456', N'Y', 103, 1, getdate(), NULL, NULL, N'Initialization password 123456')
GO
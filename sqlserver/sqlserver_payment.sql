CREATE TABLE vnp_history
(
  id                        bigint                		      NOT NULL,
  tenant_id                 nvarchar(20) DEFAULT ('000000') NULL,
  cinema_id                 bigint                		      NOT NULL,
  transaction_id            nvarchar(100)                   NULL,
  amount				            bigint                          NULL,
  secure_hash_type          nvarchar(50)                    NULL,
  secure_hash               nvarchar(500)                   NULL,
  order_info                nvarchar(255) 		              NULL,
  status				            nvarchar(1)		 	                NULL,	  -- 'P': Process | 'S': Success | 'F': Failed
  create_dept				        bigint				                  NULL,
  create_by				          bigint				                  NULL,
  create_time				        datetime2(7)                    NULL,
  update_by                 bigint                          NULL,
  update_time               datetime2(7)                    NULL,
  vnp_amount				        bigint                          NULL,
  vnp_transaction_id        nvarchar(20)                    NULL,
  vnp_order_info			      nvarchar(255) 		              NULL,
  vnp_bank_code				      nvarchar(20)  		              NULL,
  vnp_bank_tran_no			    nvarchar(50)  		              NULL,
  vnp_card_type				      nvarchar(20)  		              NULL,
  vnp_pay_date				      datetime2(7)                 	  NULL,
  vnp_transaction_no			  nvarchar(15)  		              NULL,
  vnp_response_code			    nvarchar(2)  		                NULL,
  vnp_transaction_status		nvarchar(2)  		                NULL,
  vnp_txn_ref				        nvarchar(50)  		              NULL,
  vnp_secure_hash_type			nvarchar(50)                    NULL,
  vnp_secure_hash			      nvarchar(500)                    NULL,
  CONSTRAINT PK__lg_transaction PRIMARY KEY CLUSTERED (id)

  WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
  ON [PRIMARY]
)
EXEC sys.sp_addextendedproperty
  'MS_Description', N'Create department' ,
  'SCHEMA', N'dbo',
  'TABLE', N'vnp_history',
  'COLUMN', N'create_dept'
GO
EXEC sys.sp_addextendedproperty
  'MS_Description', N'Creator' ,
  'SCHEMA', N'dbo',
  'TABLE', N'vnp_history',
  'COLUMN', N'create_by'
GO
EXEC sys.sp_addextendedproperty
  'MS_Description', N'Creation time' ,
  'SCHEMA', N'dbo',
  'TABLE', N'vnp_history',
  'COLUMN', N'create_time'
GO
EXEC sys.sp_addextendedproperty
  'MS_Description', N'Updater' ,
  'SCHEMA', N'dbo',
  'TABLE', N'vnp_history',
  'COLUMN', N'update_by'
GO
EXEC sys.sp_addextendedproperty
  'MS_Description', N'Update time' ,
  'SCHEMA', N'dbo',
  'TABLE', N'vnp_history',
  'COLUMN', N'update_time'
GO
EXEC sys.sp_addextendedproperty
  'MS_Description', N'VN PAY History' ,
  'SCHEMA', N'dbo',
  'TABLE', N'vnp_history'
GO
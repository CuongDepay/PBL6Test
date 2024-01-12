IF OBJECT_ID('sys_role', 'U') IS NOT NULL
  DROP TABLE sys_role;
GO
CREATE TABLE sys_role
(
    role_id             bigint                              NOT NULL,
    tenant_id           nvarchar(20) DEFAULT ('000000')     NULL,
    role_name           nvarchar(255)                       NOT NULL,
    role_key            nvarchar(100)                       NOT NULL,
    role_sort           int                                 NOT NULL,
    data_scope          nchar(1)     DEFAULT ('1')          NULL,
    menu_check_strictly tinyint      DEFAULT ((1))          NULL,
    dept_check_strictly tinyint      DEFAULT ((1))          NULL,
    status              nchar(1)                            NOT NULL,
    del_flag            nchar(1)     DEFAULT ('0')          NULL,
    create_dept         bigint                              NULL,
    create_by           bigint                              NULL,
    create_time         datetime2(7)                        NULL,
    update_by           bigint                              NULL,
    update_time         datetime2(7)                        NULL,
    remark              nvarchar(500)                       NULL,
    system_type         nvarchar(30)  DEFAULT ('system')    NOT NULL,
    CONSTRAINT PK__sys_role__760965CCF9383145 PRIMARY KEY CLUSTERED (role_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT sys_role VALUES (1, N'000000', N'Super administrator', N'superadmin', 1, N'1', 1, 1, N'0', N'0', 103, 1, getdate(), NULL, NULL, N'Super administrator', N'system')
GO
INSERT sys_role VALUES (2, N'000000', N'Quản lý phòng chiếu', N'hall_manager', 2, N'1', 1, 1, N'0', N'0', 103, 1, getdate(), NULL, NULL, N'Hall management role', N'system')
GO
INSERT sys_role VALUES (3, N'000000', N'Quản lý lịch chiếu', N'showtime_manager', 3, N'1', 1, 1, N'0', N'0', 103, 1, getdate(), NULL, NULL, N'Showtime management role', N'system')
GO
INSERT sys_role VALUES (4, N'000000', N'Quản lý vé', N'ticket_manager', 4, N'1', 1, 1, N'0', N'0', 103, 1, getdate(), NULL, NULL, N'Ticket management role', N'system')
GO
INSERT sys_role VALUES (5, N'000000', N'Quản lý doanh thu', N'money_manager', 5, N'1', 1, 1, N'0', N'0', 103, 1, getdate(), NULL, NULL, N'Money management role', N'system')
GO

IF OBJECT_ID('sys_role_dept', 'U') IS NOT NULL
  DROP TABLE sys_role_dept;
GO
CREATE TABLE sys_role_dept
(
    role_id bigint NOT NULL,
    dept_id bigint NOT NULL,
    CONSTRAINT PK__sys_role__2BC3005BABBCA08A PRIMARY KEY CLUSTERED (role_id, dept_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

INSERT sys_role_dept VALUES (1, 100)
GO
INSERT sys_role_dept VALUES (2, 100)
GO
INSERT sys_role_dept VALUES (3, 100)
GO
INSERT sys_role_dept VALUES (4, 100)
GO
INSERT sys_role_dept VALUES (5, 100)
GO

IF OBJECT_ID('sys_menu', 'U') IS NOT NULL 
  DROP TABLE sys_menu;
GO
CREATE TABLE sys_menu
(
    menu_id     bigint                              NOT NULL,
    menu_name   nvarchar(500)                       NOT NULL,
    parent_id   bigint        DEFAULT ((0))         NULL,
    order_num   int           DEFAULT ((0))         NULL,
    path        nvarchar(200) DEFAULT ''            NULL,
    component   nvarchar(255)                       NULL,
    query_param nvarchar(255)                       NULL,
    is_frame    int           DEFAULT ((1))         NULL,
    is_cache    int           DEFAULT ((0))         NULL,
    menu_type   nchar(1)      DEFAULT ''            NULL,
    visible     nchar(1)      DEFAULT ((0))         NULL,
    status      nchar(1)      DEFAULT ((0))         NULL,
    perms       nvarchar(100)                       NULL,
    icon        nvarchar(100) DEFAULT ('#')         NULL,
    create_dept bigint                              NULL,
    create_by   bigint                              NULL,
    create_time datetime2(7)                        NULL,
    update_by   bigint                              NULL,
    update_time datetime2(7)                        NULL,
    remark      nvarchar(500) DEFAULT ''            NULL,
    system_type nvarchar(30)  DEFAULT ('system')    NOT NULL,
    CONSTRAINT PK__sys_menu__4CA0FADCF8545C58 PRIMARY KEY CLUSTERED (menu_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

IF OBJECT_ID('sys_role_menu', 'U') IS NOT NULL 
  DROP TABLE sys_role_menu;
GO
CREATE TABLE sys_role_menu
(
    role_id bigint NOT NULL,
    menu_id bigint NOT NULL,
    CONSTRAINT PK__sys_role__A2C36A6187BA4B17 PRIMARY KEY CLUSTERED (role_id, menu_id)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON)
        ON [PRIMARY]
)
ON [PRIMARY]
GO

-----------------------ADMIN-----------------------
--
-- MENU
--
INSERT sys_menu VALUES (1, N'{"vi_VN":"Quản trị hệ thống","en_US":"System management"}', 0, 1, N'system', NULL, N'', 1, 0, N'M', N'0', N'0', N'', N'block', 103, 1, getdate(), NULL, NULL, N'System Administration Directory', N'system')
GO
INSERT sys_menu VALUES (2, N'{"vi_VN":"Quản lý rạp chiếu","en_US":"Management cinema"}', 0, 2, N'managementCinema', NULL, N'', 1, 0, N'M', N'0', N'0', N'', N'sys-log', 103, 1, getdate(), NULL, NULL, N'Log management menu', N'system')
GO
INSERT sys_menu VALUES (3, N'{"vi_VN":"Quản lý người dùng","en_US":"Management customer"}', 0, 3, N'managementCustomer', NULL, N'', 1, 0, N'M', N'0', N'0', N'', N'user', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (4, N'{"vi_VN":"Trang chủ","en_US":"Homepage"}', 0, 4, N'http://localhost', null, N'', 0, 0, N'M', N'0', N'0', N'', N'guide', 103, 1, getdate(), null, null, N'Star cinema official website address', N'system');
GO

-- IT
INSERT sys_role_menu VALUES (1, 1)
GO
INSERT sys_role_menu VALUES (1, 2)
GO
INSERT sys_role_menu VALUES (1, 3)
GO
INSERT sys_role_menu VALUES (1, 4)
GO
INSERT sys_role_menu VALUES (2, 2)
GO
INSERT sys_role_menu VALUES (3, 2)
GO
INSERT sys_role_menu VALUES (4, 2)
GO
INSERT sys_role_menu VALUES (5, 2)
GO

--
-- SCREEN
--
-- System
INSERT sys_menu VALUES (100, N'{"vi_VN":"Tài khoản nội bộ","en_US":"Internal user"}', 1, 1, N'user', N'system/user/index', N'', 1, 0, N'C', N'0', N'0', N'system:user:list', N'#', 103, 1, getdate(), NULL, NULL, N'User management menu', N'system')
GO
INSERT sys_menu VALUES (101, N'{"vi_VN":"Vai trò nội bộ","en_US":"Internal role"}', 1, 2, N'role', N'system/role/index', N'', 1, 0, N'C', N'0', N'0', N'system:role:list', N'#', 103, 1, getdate(), NULL, NULL, N'Role management menu', N'system')
GO
INSERT sys_menu VALUES (102, N'{"vi_VN":"Menu nội bộ","en_US":"Internal menu"}', 1, 3, N'menu', N'system/menu/index', N'', 1, 0, N'C', N'0', N'0', N'system:menu:list', N'#', 103, 1, getdate(), NULL, NULL, N'Menu Management Menu', N'system')
GO
INSERT sys_menu VALUES (103, N'{"vi_VN":"Quản lý phòng ban","en_US":"Department management"}', 1, 4, N'dept', N'system/dept/index', N'', 1, 0, N'C', N'0', N'0', N'system:dept:list', N'#', 103, 1, getdate(), NULL, NULL, N'Department management menu', N'system')
GO
INSERT sys_menu VALUES (104, N'{"vi_VN":"Quản lý chức vụ","en_US":"Position management"}', 1, 5, N'post', N'system/post/index', N'', 1, 0, N'C', N'0', N'0', N'system:post:list', N'#', 103, 1, getdate(), NULL, NULL, N'Job management menu', N'system')
GO
INSERT sys_menu VALUES (105, N'{"vi_VN":"Danh mục","en_US":"Dictionary"}', 1, 6, N'dict', N'system/dict/index', N'', 1, 0, N'C', N'0', N'0', N'system:dict:list', N'#', 103, 1, getdate(), NULL, NULL, N'Dictionary management menu', N'system')
GO
INSERT sys_menu VALUES (106, N'{"vi_VN":"Cấu hình","en_US":"Configuration"}', 1, 7, N'config', N'system/config/index', N'', 1, 0, N'C', N'0', N'0', N'system:config:list', N'#', 103, 1, getdate(), NULL, NULL, N'Parameter setting menu', N'system')
GO
INSERT sys_menu VALUES (107, N'{"vi_VN":"Thông báo","en_US":"Announcement"}', 1, 8, N'notice', N'system/notice/index', N'', 1, 0, N'C', N'0', N'0', N'system:notice:list', N'#', 103, 1, getdate(), NULL, NULL, N'Notification Announcement Menu', N'system')
GO

-- Management cinema
INSERT sys_menu VALUES (110, N'{"vi_VN":"Quản lý rạp","en_US":"Management cinema"}', 2, 1, N'cinema', N'portCustomer/cinemaManagement/index', N'', 1, 0, N'C', N'0', N'0', N'portCustomer:cinema:list', N'cinema', 103, 1, getdate(), NULL, NULL, N'Management cinema menu', N'system')
GO
INSERT sys_menu VALUES (111, N'{"vi_VN":"Quản lý phim","en_US":"Management movie"}', 2, 2, N'movie', N'portCustomer/movieManagement/index', N'', 1, 0, N'C', N'0', N'0', N'portCustomer:movie:list', N'movie', 103, 1, getdate(), NULL, NULL, N'Management movie menu', N'system')
GO
INSERT sys_menu VALUES (112, N'{"vi_VN":"Quản lý phòng chiếu","en_US":"Management hall"}', 2, 3, N'hall', N'portCustomer/hallManagement/index', N'', 1, 0, N'C', N'0', N'0', N'portCustomer:hall:list', N'hall', 103, 1, getdate(), NULL, NULL, N'Management hall menu', N'system')
GO
INSERT sys_menu VALUES (113, N'{"vi_VN":"Quản lý lịch chiếu","en_US":"Management showtime"}', 2, 4, N'showtime', N'portCustomer/showtimeManagement/index', N'', 1, 0, N'C', N'0', N'0', N'portCustomer:showtime:list', N'showtime', 103, 1, getdate(), NULL, NULL, N'Management showtime menu', N'system')
GO
INSERT sys_menu VALUES (114, N'{"vi_VN":"Quản lý vé","en_US":"Management ticket"}', 2, 5, N'ticket', N'portCustomer/ticketManagement/index', N'', 1, 0, N'C', N'0', N'0', N'portCustomer:ticket:list', N'ticket', 103, 1, getdate(), NULL, NULL, N'Management ticket menu', N'system')
GO
INSERT sys_menu VALUES (115, N'{"vi_VN":"Quản lý doanh thu","en_US":"Management revenue"}', 2, 6, N'revenue', N'portCustomer/revenueManagement/index', N'', 1, 0, N'C', N'0', N'0', N'portCustomer:revenue:list', N'revenue', 103, 1, getdate(), NULL, NULL, N'Management revenue menu', N'system')
GO
INSERT sys_menu VALUES (118, N'{"vi_VN":"Quản lý khuyến mãi","en_US":"Management promotion"}', 2, 5, N'promotion', N'portCustomer/promotionManagement/index', N'', 1, 0, N'C', N'0', N'0', N'portCustomer:promotion:list', N'promotion', 103, 1, getdate(), NULL, NULL, N'Management promotion menu', N'system')
GO
INSERT sys_menu VALUES (119, N'{"vi_VN":"Quản lý slide","en_US":"Management slide"}', 2, 6, N'slide', N'portCustomer/slideManagement/index', N'', 1, 0, N'C', N'0', N'0', N'portCustomer:slide:list', N'slide', 103, 1, getdate(), NULL, NULL, N'Management promotion menu', N'system')
GO
INSERT sys_menu VALUES (120, N'{"vi_VN":"Quản lý loại ghế","en_US":"Management seat type"}', 2, 7, N'seatType', N'portCustomer/seatTypeManagement/index', N'', 1, 0, N'C', N'0', N'0', N'portCustomer:seatType:list', N'seatType', 103, 1, getdate(), NULL, NULL, N'Management seat type menu', N'system')
GO

-- Staff menu
INSERT sys_role_menu VALUES (2, 112)
GO
INSERT sys_role_menu VALUES (3, 113)
GO
INSERT sys_role_menu VALUES (4, 114)
GO
INSERT sys_role_menu VALUES (5, 115)
GO
INSERT sys_role_menu VALUES (4, 118)
GO
INSERT sys_role_menu VALUES (5, 119)
GO

-- Management customer menu
INSERT sys_menu VALUES (116, N'{"vi_VN":"Quản lý tài khoản","en_US":"Management customer account"}', 3, 1, N'account', N'customer/account/index', N'', 1, 0, N'C', N'0', N'0', N'customer:account:list', N'account', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (117, N'{"vi_VN":"Thống kê giao dịch","en_US":"Transaction statistics"}', 3, 2, N'customerRevenue', N'customer/customerRevenue/index', N'', 1, 0, N'C', N'0', N'0', N'customer:customerRevenue:list', N'customerRevenue', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO

--
-- BUTTON
--
-- Internal user
INSERT sys_menu VALUES (1001, N'{"vi_VN":"Xem thông tin","en_US":"Query user"}', 100, 1, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:user:query', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1002, N'{"vi_VN":"Thêm tài khoản","en_US":"Add user"}', 100, 2, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:user:add', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1003, N'{"vi_VN":"Sửa tài khoản","en_US":"Edit user"}', 100, 3, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:user:edit', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1004, N'{"vi_VN":"Xoá tài khoản","en_US":"Delete user"}', 100, 4, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:user:remove', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1005, N'{"vi_VN":"Xuất báo cáo","en_US":"Export user"}', 100, 5, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:user:export', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1006, N'{"vi_VN":"Import tài khoản","en_US":"Import user"}', 100, 6, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:user:import', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1007, N'{"vi_VN":"Đặt lại mật khẩu","en_US":"Reset password"}', 100, 7, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:user:resetPwd', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO

-- Internal role
INSERT sys_menu VALUES (1008, N'{"vi_VN":"Xem thông tin","en_US":"Query role"}', 101, 1, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:role:query', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1009, N'{"vi_VN":"Thêm vai trò","en_US":"Add role"}', 101, 2, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:role:add', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1010, N'{"vi_VN":"Sửa vai trò","en_US":"Edit role"}', 101, 3, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:role:edit', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1011, N'{"vi_VN":"Xoá vai trò","en_US":"Delete role"}', 101, 4, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:role:remove', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1012, N'{"vi_VN":"Xuất vai trò","en_US":"Export role"}', 101, 5, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:role:export', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO

-- Internal menu
INSERT sys_menu VALUES (1013, N'{"vi_VN":"Xem thông tin","en_US":"Query menu"}', 102, 1, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:menu:query', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1014, N'{"vi_VN":"Thêm menu","en_US":"Add menu"}', 102, 2, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:menu:add', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1015, N'{"vi_VN":"Sửa menu","en_US":"Edit menu"}', 102, 3, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:menu:edit', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1016, N'{"vi_VN":"Xoá menu","en_US":"Delete menu"}', 102, 4, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:menu:remove', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO

-- Department management
INSERT sys_menu VALUES (1017, N'{"vi_VN":"Xem thông tin","en_US":"Query department"}', 103, 1, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:dept:query', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1018, N'{"vi_VN":"Thêm phòng ban","en_US":"Add department"}', 103, 2, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:dept:add', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1019, N'{"vi_VN":"Sửa phòng ban","en_US":"Edit department"}', 103, 3, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:dept:edit', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1020, N'{"vi_VN":"Xoá phòng ban","en_US":"Delete department"}', 103, 4, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:dept:remove', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO

-- Position management
INSERT sys_menu VALUES (1021, N'{"vi_VN":"Xem thông tin","en_US":"Query position"}', 104, 1, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:post:query', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1022, N'{"vi_VN":"Thêm vị trí","en_US":"Add position"}', 104, 2, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:post:add', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1023, N'{"vi_VN":"Sửa vị trí","en_US":"Edit position"}', 104, 3, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:post:edit', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1024, N'{"vi_VN":"Xoá vị trí","en_US":"Delete position"}', 104, 4, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:post:remove', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1025, N'{"vi_VN":"Xuất báo cáo","en_US":"Export position"}', 104, 5, N'', N'', N'', 1, 0, N'F', N'0', N'0', N'system:post:export', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO

-- Dictionary
INSERT sys_menu VALUES (1026, N'{"vi_VN":"Xem thông tin","en_US":"Query dictionary"}', 105, 1, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:dict:query', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1027, N'{"vi_VN":"Thêm danh mục","en_US":"Add dictionary"}', 105, 2, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:dict:add', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1028, N'{"vi_VN":"Sửa danh mục","en_US":"Edit dictionary"}', 105, 3, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:dict:edit', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1029, N'{"vi_VN":"Xoá danh mục","en_US":"Delete dictionary"}', 105, 4, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:dict:remove', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1030, N'{"vi_VN":"Xuất báo cáo","en_US":"Export dictionary"}', 105, 5, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:dict:export', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO

-- Configuration
INSERT sys_menu VALUES (1031, N'{"vi_VN":"Xem thông tin","en_US":"Query parameter"}', 106, 1, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:config:query', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1032, N'{"vi_VN":"Thêm cấu hình","en_US":"Add parameter"}', 106, 2, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:config:add', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1033, N'{"vi_VN":"Sửa cấu hình","en_US":"Edit parameter"}', 106, 3, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:config:edit', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1034, N'{"vi_VN":"Xoá cấu hình","en_US":"Delete parameter"}', 106, 4, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:config:remove', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1035, N'{"vi_VN":"Xuất báo cáo","en_US":"Export parameter"}', 106, 5, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:config:export', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO

-- Announcement
INSERT sys_menu VALUES (1036, N'{"vi_VN":"Xem thông tin","en_US":"Query notice"}', 107, 1, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:notice:query', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1037, N'{"vi_VN":"Thêm thông báo","en_US":"Add notice"}', 107, 2, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:notice:add', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1038, N'{"vi_VN":"Sửa thông báo","en_US":"Edit notice"}', 107, 3, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:notice:edit', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO
INSERT sys_menu VALUES (1039, N'{"vi_VN":"Xoá thông báo","en_US":"Delete notice"}', 107, 4, N'#', N'', N'', 1, 0, N'F', N'0', N'0', N'system:notice:remove', N'#', 103, 1, getdate(), NULL, NULL, N'', N'system')
GO

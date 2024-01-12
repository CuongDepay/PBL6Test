export default {
  // Routing Internationalization
  route: {
    dashboard: 'Biểu đồ',
    document: 'Tài liệu'
  },
  // Login Page Internationalization
  login: {
    username: 'Tài khoản',
    password: 'Mật khẩu',
    login: 'Đăng nhập',
    code: 'Mã xác nhận',
    copyright: '',
    logoutCf: 'Xác nhận đăng xuất khỏi hệ thống?'
  },
  register: {
    username: 'Tài khoản',
    password: 'Mật khẩu',
    rePassword: 'Xác thực mật khẩu',
    register: 'Đăng ký',
    code: 'Mã xác nhận',
    copyright: '',
    logoutCf: 'Xác nhận đăng xuất khỏi hệ thống?'
  },
  // Navigation bar internationalization
  navbar: {
    full: 'Toàn màn hình',
    language: 'Ngôn ngữ',
    langKey: 'VN',
    vietnamese: 'Tiếng Việt',
    english: 'Tiếng Anh',
    langIcon: 'vietnamese',
    dashboard: 'Biểu đồ',
    document: 'Tài liệu',
    layoutSize: 'Kích thước giao diện',
    selectTenant: 'Chọn đơn vị',
    layoutSetting: 'Thiết lập giao diện',
    personalCenter: 'Thông tin cá nhân',
    logout: 'Đăng xuất'
  },
  // Sidebar internationalization
  sidebar: {
    searchPlaceholder: 'Tìm kiếm'
  },
  cacheMonitor: {
    basicTt: 'Thông tin cơ bản',
    redisVersion: 'Phiên bản redis',
    oprMode: 'Chế độ vận hành',
    port: 'Cổng',
    clients: 'Số lượng truy cập',
    runningTime: 'Thời gian chạy (ngày)',
    usedMemory: 'Bộ nhớ sử dụng',
    usedCpu: 'CPU sử dụng',
    memoryConf: 'Cấu hình bộ nhớ',
    aof: 'Kích hoạt AOF',
    rdb: 'RDB thành công',
    keys: 'Số lượng khoá',
    network: 'Mạng vào/ra',
    commandStatsTt: 'Thống kê lệnh',
    memoryTt: 'Thông tin bộ nhớ'
  },
  tagview: {
    refresh: 'Làm mới',
    closeCurrent: 'Đóng hiện tại',
    closeOther: 'Đóng khác',
    closeLeft: 'Đóng bên trái',
    closeRight: 'Đóng bên phải',
    closeAll: 'Đóng tất cả'
  },
  common: {
    logoutCfTt: 'Xác nhận',
    logoutCfMsg: 'Bạn chưa đăng nhập, để thực hiện thanh toán bắt buộc bạn phải đăng nhập',
    logoutCfBtn: 'Đồng ý',
    logoutCancelBtn: 'Đóng',
    sessionExpiredMsg: 'Phiên làm việc không hợp lệ hoặc đã hết hạn, vui lòng đăng nhập lại',
    networkErrMsg: 'Lỗi kết nối mạng',
    timeoutMsg: 'Lỗi hệ thống quá lâu không có phản hồi',
    commonErrMsg: 'Lỗi hệ thống %{code}',
    downloadProgressMsg: 'Đang tải dữ liệu, vui lòng đợi',
    errDownloadMsg: 'Có lỗi trong quá trình tải tệp, vui lòng liên hệ quản trị viên!',
    cfDelTt: 'Xác nhận',
    cfWarnTt: 'Xác nhận',
    cfDelBtnClose: 'Huỷ',
    cfDelBtnOk: 'Đồng ý',
    cfWarnBtnClose: 'Huỷ',
    cfWarnBtnOk: 'Đồng ý'
  },
  irupload: {
    tt: 'Kéo và thả tệp',
    subTt: 'hoặc',
    selectFileBtn: 'Chọn tệp',
    updateSupport: 'Cập nhật dữ liệu',
    supportedFormat: 'Định dạng hỗ trợ: ',
    tipNext: 'Chỉ cho phép định dạng %{accept}'
  },
  irgrid: {
    validateNotInput: 'Vui lòng nhập dữ liệu trước khi lưu',
    validateTt: 'Cảnh báo',
    validateDetail: 'Vui lòng nhập dữ liệu tại cột "%{col}" hàng số "%{row}"'
  },
  fileUpload: {
    selectBtn: 'Chọn tệp',
    supportedFormats: 'Định dạng hỗ trợ:',
    deleteBtn: 'Xoá',
    incorrectFormat: 'Định dạng tệp không hợp lệ, vui lòng tải định dạng: %{formats}!',
    sizeExceed: 'Tệp tải lên không được quá %{fileSize} MB!',
    loadingWait: 'Đang tải tệp, vui lòng đợi...',
    numberExceed: 'Số lượng tệp tải lên không được quá %{fileNumber}!',
    failToUpload: 'Tải tệp thất bại',
    cannotEmpty: 'Tệp không được trống'
  },
  homepage: {
    topNav: {
      homepage: 'Trang chủ',
      showtimes: 'Lịch chiếu',
      film: 'Phim',
      promotions: 'Khuyến mãi',
      cinema: 'Góc điện ảnh',
      contact: 'Liên hệ',
      filmLabel: 'Nội Dung Phim',
      login_out: 'Đăng Nhập/Đăng Ký'
    },
    login: {
      tt: 'Đăng nhập hệ thống',
      usernameLb: 'Tên đăng nhập',
      usernamePh: 'Nhập',
      passwordLb: 'Mật khẩu',
      passwordPh: 'Nhập',
      rememberPassLb: 'Ghi nhớ mật khẩu',
      loginBtnTt: 'Đăng nhập',
      rules: {
        usernameRqMsg: 'Vui lòng nhập tên tài khoản',
        passwordRqMsg: 'Vui lòng nhập mật khẩu'
      }
    },
    register: {
      tt: 'Đăng ký hệ thống',
      usernameLb: 'Tên đăng nhập',
      usernamePh: 'Nhập',
      passwordLb: 'Mật khẩu',
      passwordPh: 'Nhập',
      rePasswordLb: 'Xác nhận mật khẩu',
      rePasswordPh: 'Nhập',
      rememberPassLb: 'Ghi nhớ mật khẩu',
      registerBtnTt: 'Đăng ký',
      rules: {
        usernameRqMsg: 'Vui lòng nhập tên tài khoản',
        passwordRqMsg: 'Vui lòng nhập mật khẩu',
        rePasswordRqMsg: 'Vui lòng nhập lại mật khẩu'
      }
    },
    film: {
      guideTt: 'Chọn phim',
      documentTt: 'Tải biểu mẫu',
      documentDownloadBtn: 'Tải về',
      showAllBtn: 'Xem tất cả',
      comingSoon: 'Sắp Chiếu',
      showtime: 'Đang Chiếu '
    },
    document: {
      guideTt: 'Khuyến mãi',
      documentTt: 'Tải biểu mẫu',
      documentDownloadBtn: 'Tải về',
      showAllBtn: 'Xem tất cả'
    },
    contactInfo: {
      contactAddrLb: 'Địa chỉ liên hệ',
      addrLb: 'Địa chỉ',
      addrContent1: 'Số 99 Đường Điện Biên Phủ, phường Hòa Khê, ',
      addrContent2: 'quận Thanh Khê, TP. Đà Nẵng, Việt Nam',
      phoneLb: 'Điện thoại',
      customerPolicyTt: 'Chính sách khách hàng',
      serviceTermLb: 'Điều khoản dịch vụ',
      refundPolicyLb: 'Chính sách đổi trả',
      customerPolicyLb: 'Chính sách khách hàng',
      confidentialPolicyLb: 'Chính sách bảo mật',
      paymentTermLb: 'Điều khoản thanh toán',
      supportTt: 'Hỗ trợ',
      supportContent: 'Đăng ký sử dụng Star Cinema, trợ giúp hướng dẫn sử dụng, giải đáp thắc mắc vui lòng liên hệ hotline'
    },
    searchEdoTt1: 'Tra cứu thông tin lệnh giao hàng',
    searchEdoTt2: 'điện tử - eDO',
    searchEdoContNoLb: 'Số Container',
    searchEdoContNoPh: 'Nhập',
    searchEdoBlNoLb: 'Số Bill',
    searchEdoBlNoPh: 'Nhập',
    searchEdoBtn: 'Tìm kiếm',
    searchEirTt1: 'Tra cứu phiếu giao nhận container EIR',
    searchEirTt2: '- Equipment Interchange Receipt',
    searchEirContNoLb: 'Số container',
    searchEirContNoPh: 'Nhập',
    searchEirTruckNoLb: 'Biển số xe',
    searchEirTruckNoPh: 'Nhập',
    searchEirTimeLb: 'Ngày',
    searchEirTimePh: 'DD/MM/YYYY',
    searchEirBtn: 'Tìm kiếm',
    searchContainerTt: 'Tra cứu thông tin container',
    searchContainerNoLb: 'Số container',
    searchContainerNoPh: 'Nhập',
    searchContainerNoBtn: 'Tìm kiếm',
    searchVesselScheduleTt: 'Tra cứu lịch tàu',
    searchVesselScheduleFromDateLb: 'Từ ngày',
    searchVesselScheduleFromDatePh: 'DD/MM/YYYY',
    searchVesselScheduleToDateLb: 'Đến ngày',
    searchVesselScheduleToDatePh: 'DD/MM/YYYY',
    searchVesselScheduleBtb: 'Tìm kiếm'
  },
  // User menu internationalization
  user: {
    leftPanel: {
      searchPlaceholder: 'Tìm kiếm'
    },
    searchInput: {
      userNameLb: 'Tài khoản',
      userNamePh: 'Nhập',
      phonenumberLb: 'Số điện thoại',
      phonenumberPh: 'Nhập',
      statusLb: 'Trạng thái',
      statusPh: 'Chọn',
      createTimeLb: 'Ngày tạo',
      createTimeStartPh: 'Từ',
      createTimeEndPh: 'Đến'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá',
      importTemplateTt: 'Tải mẫu nhập',
      importTt: 'Nhập excel',
      exportTt: 'Xuất excel'
    },
    dialog: {
      addTt: 'Thêm tài khoản',
      editTt: 'Sửa tài khoản',
      cinemaLb: 'Rạp chiếu',
      cinemaPh: 'Chọn',
      nickNameLb: 'Tên cá nhân',
      nickNamePh: 'Nhập',
      deptIdLb: 'Phòng ban',
      deptIdPh: 'Chọn',
      phonenumberLb: 'Số điện thoại',
      phonenumberPh: 'Nhập',
      emailLb: 'Email',
      emailPh: 'Nhập',
      userNameLb: 'Tên tài khoản',
      userNamePh: 'Nhập',
      passwordLb: 'Mật khẩu',
      passwordPh: 'Nhập',
      sexLb: 'Giới tính',
      sexPh: 'Chọn',
      statusLb: 'Trạng thái',
      postIdsLb: 'Chức vụ',
      postIdsPh: 'Chọn',
      roleIdsLb: 'Vai trò',
      roleIdsPh: 'Chọn',
      remarkLb: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        cinemaRqMsg: 'Rạp chiếu không được trống',
        userNameRqMsg: 'Tên tài khoản không được trống',
        userNameMinMaxMsg: 'Độ dài tên tài khoản phải từ %{min} đến %{max} ký tự',
        nickNameRqMsg: 'Tên cá nhân không được trống',
        passwordRqMsg: 'Mật khẩu không được trống',
        passwordMinMaxMsg: 'Độ dài mật khẩu phải từ %{min} đến %{max} ký tự',
        emailRqMsg: 'Email không được trống',
        phonenumberPtMsg: 'Số điện thoại không hợp lệ'
      }
    },
    columns: {
      userIdLb: 'Mã tài khoản',
      userNameLb: 'Tài khoản',
      nickNameLb: 'Tên cá nhân',
      deptNameLb: 'Phòng ban',
      phonenumberLb: 'Số điện thoại',
      statusLb: 'Trạng thái',
      createTimeLb: 'Ngày tạo',
      operateLb: 'Thao tác',
      operateEditLb: 'Sửa',
      operateDeleteLb: 'Xoá',
      operateResetPwdLb: 'Đặt lại mật khẩu',
      operateAuthRoleLb: 'Chỉ định vai trò'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá tài khoản%{username}?',
      statusEnable: 'Kích hoạt',
      statusDisable: 'Khoá',
      statusChangeCf: 'Xác nhận "%{action}" tài khoản "%{username}"?',
      statusChangeSuccess: ' thành công',
      importTt: 'Nhập excel',
      importResultTt: 'Kết quả nhập bằng excel',
      resetPwdTt: 'Đặt lại mật khẩu',
      resetPwdCf: 'Vui lòng nhập mật khẩu mới cho "%{username}"',
      resetPwdMinMaxMsg: 'Độ dài mật khẩu phải từ %{min} đến %{max} ký tự',
      resetPwdSuccess: 'Đặt lại mật khẩu thành công, mật khẩu mới là: %{newPassword}',
      resetPwdBtnSave: 'Lưu',
      resetPwdBtnClose: 'Đóng'
    },
    authRole: {
      searchInput: {
        nickNameLb: 'Tên cá nhân',
        userNameLb: 'Tên tài khoản'
      },
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      columns: {
        roleIdLb: 'ID',
        roleNameLb: 'Tên vai trò',
        roleKeyLb: 'Mã vai trò',
        createTimeLb: 'Ngày tạo'
      },
      submitSuccess: 'Cấp quyền thành công'
    }
  },
  // Role menu internationalization
  role: {
    searchInput: {
      roleNameLb: 'Tên vai trò',
      roleNamePh: 'Nhập',
      roleKeyLb: 'Mã vai trò',
      roleKeyPh: 'Nhập',
      statusLb: 'Trạng thái',
      statusPh: 'Chọn',
      createTimeLb: 'Ngày tạo',
      createTimeStartPh: 'Từ',
      createTimeEndPh: 'Đến'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá',
      exportTt: 'Xuất excel'
    },
    dialog: {
      addTt: 'Thêm vai trò',
      editTt: 'Sửa vai trò',
      roleNameLb: 'Tên vai trò',
      roleNamePh: 'Nhập',
      roleKeyLb: 'Mã vai trò',
      roleKeyPh: 'Nhập',
      roleKeyTooltip: 'Mã vai trò định nghĩa trong controller',
      roleSortLb: 'Thứ tự hiển thị',
      statusLb: 'Trang thái',
      menuPermissionLb: 'Quyền truy cập menu',
      menuPermissionExpand: 'Mở rộng/Thu hẹp',
      menuPermissionAll: 'Chọn tất cả',
      menuPermissionLink: 'Liên kết',
      menuPermissionLoadingLb: 'Đang tải, vui lòng đợi',
      remarkLb: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        roleNameRqMsg: 'Tên vai trò không được trống',
        roleKeyRqMsg: 'Mã vai trò không được trống',
        roleSortRqMsg: 'Thứ tự hiển thị không được trống'
      }
    },
    columns: {
      roleIdLb: 'ID',
      roleNameLb: 'Tên vai trò',
      roleKeyLb: 'Mã vai trò',
      roleSortLb: 'Thứ tự',
      statusLb: 'Trạng thái',
      createTimeLb: 'Ngày tạo',
      operateLb: 'Thao tác',
      operateEditLb: 'Sửa',
      operateDeleteLb: 'Xoá',
      operateDataScopeLb: 'Phân quyền dữ liệu',
      operateAuthUserLb: 'Chỉ định tài khoản'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá vai trò%{roleName}?',
      statusEnable: 'Kích hoạt',
      statusDisable: 'Khoá',
      statusChangeCf: 'Xác nhận "%{action}" vai trò "%{roleName}"?',
      statusChangeSuccess: ' thành công'
    },
    dataPermission: {
      tt: 'Phân quyền dữ liệu',
      successMsg: 'Phân quyền thành công',
      option1: 'Toàn bộ dữ liệu',
      option2: 'Dữ liệu tuỳ chỉnh',
      option3: 'Dữ liệu thuộc phòng ban hiện tại',
      option4: 'Dữ liệu thuộc phòng ban hiện tại và cấp dưới',
      option5: 'Dữ liệu cá nhân',
      roleNameLb: 'Tên vai trò',
      roleKeyLb: 'Mã vai trò',
      dataScopeLb: 'Phạm vi dữ liệu',
      dataPermissionLb: 'Quyền dữ liệu',
      dataPermissionExpand: 'Mở rộng/Thu hẹp',
      dataPermissionAll: 'Chọn tất cả',
      dataPermissionLink: 'Liên kết',
      dataPermissionLoadingLb: 'Đang tải, vui lòng đợi',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu'
    },
    authUser: {
      searchInput: {
        userNameLb: 'Tên tài khoản',
        userNamePh: 'Nhập',
        phonenumberLb: 'Số điện thoại',
        phonenumberPh: 'Nhập'
      },
      headerButton: {
        addTt: 'Thêm',
        deauthorizeTt: 'Huỷ quyền',
        closeTt: 'Đóng'
      },
      columns: {
        userNameLb: 'Tên tài khoản',
        nickNameLb: 'Tên cá nhân',
        emailLb: 'Email',
        phonenumberLb: 'Số điện thoại',
        statusLb: 'Trạng thái',
        createTimeLb: 'Ngày tạo',
        operateLb: 'Thao tác',
        operateAuthUserLb: 'Huỷ quyền'
      },
      operationMsg: {
        cancelAuthCf: 'Xác nhận huỷ quyền cho tài khoản %{username}?',
        cancelAuthSuccess: 'Huỷ quyền thành công',
        cancelAuthUserAllCf: 'Xác nhận huỷ quyền các tài khoản?',
        cancelAuthUserAllSuccess: 'Huỷ quyền thành công'
      },
      selectUser: {
        tt: 'Chọn tài khoản',
        userNameLb: 'Tên tài khoản',
        userNamePh: 'Nhập',
        phonenumberLb: 'Số điện thoại',
        phonenumberPh: 'Nhập',
        cancelBtnTt: 'Đóng',
        saveBtnTt: 'Lưu',
        columns: {
          userNameLb: 'Tên tài khoản',
          nickNameLb: 'Tên cá nhân',
          emailLb: 'Email',
          phonenumberLb: 'Số điện thoại',
          statusLb: 'Trạng thái',
          createTimeLb: 'Ngày tạo'
        },
        saveErrorMsg: 'Vui lòng chỉ định tài khoản',
        saveSuccessMsg: 'Chỉ định tài khoản thành công'
      }
    }
  },
  // Menu menu internationalization
  menu: {
    searchInput: {
      menuNameLb: 'Tên menu',
      menuNamePh: 'Nhập',
      statusLb: 'Trạng thái',
      statusPh: 'Chọn'
    },
    headerButton: {
      addTt: 'Thêm',
      toggleExpandTt: 'Mở rộng/Thu gọn'
    },
    dialog: {
      addTt: 'Thêm menu',
      editTt: 'Sửa menu',
      parentIdLb: 'Menu cấp trên',
      parentIdPh: 'Chọn',
      menuTypeLb: 'Loại menu',
      menuTypeM: 'Mục lục',
      menuTypeC: 'Màn hình',
      menuTypeF: 'Nút bấm',
      iconLb: 'Icon',
      menuNameLb: 'Tên menu',
      orderNumLb: 'Thứ tự hiển thị',
      linkLb: 'Link',
      linkTooltip: 'Nếu thông tin là địa chỉ truy cập từ bên ngoài, địa chỉ truy cập cần bắt đầu với `http(s)://`',
      linkYes: 'Có',
      linkNo: 'Không',
      pathLb: 'Địa chỉ trỏ',
      pathTooltip: 'Địa chỉ trỏ, ví dụ như: `user`, nếu thông tin là địa chỉ truy cập từ bên ngoài, địa chỉ truy cập cần bắt đầu với `http(s)://`',
      pathPh: 'Nhập',
      componentLb: 'Đường dẫn component',
      componentTooltip: 'Đường dẫn component để truy cập giao diện, ví dụ như: `system/user/index`, mặc định sẽ ở trong folder `views`',
      componentPh: 'Nhập',
      permsLb: 'Mã phân quyền',
      permsPh: 'Nhập',
      permsTooltip: 'Mã phân quyền được định nghĩa trong controller',
      queryLb: 'Tham số truy vấn',
      queryPh: 'Nhập',
      queryTooltip: 'Tham số truy vấn mặc định sẽ được truyền khi truy cập menu, ví dụ như: `{"id": 1, "name": "hieu"}`',
      cacheLb: 'Tuỳ chọn cache',
      cacheTooltip: 'Nếu chọn cache, menu sẽ được cache theo thuộc tính `keep-alive` và tên hay địa chỉ trò của component không được thay đổi',
      cacheYes: 'Có',
      cacheNo: 'Không',
      displayLb: 'Trạng thái hiển thị',
      displayTooltip: 'Nếu chọn ẩn thì menu sẽ không hiển thị trên thanh menu bên trái nhưng địa chỉ của menu vẫn có thể truy cập được',
      statusLb: 'Trạng thái',
      statusTooltip: 'Nếu chọn disable thì menu sẽ không hiển thị trên thanh menu bên trái và sẽ không thể truy cập thông qua địa chỉ trỏ được',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        menuNameRqMsg: 'Tên menu không được trống',
        orderNumRqMsg: 'Thứ tự hiển thị không được trống',
        pathRqMsg: 'Địa chỉ trỏ không được trống'
      }
    },
    columns: {
      menuNameLb: 'Tên menu',
      iconLb: 'Icon',
      orderNumLb: 'Thứ tự',
      permsLb: 'Mã phân quyền',
      componentLb: 'Đường dẫn component',
      statusLb: 'Trạng thái',
      createTimeLb: 'Ngày tạo',
      operateLb: 'Thao tác',
      operateEditLb: 'Sửa',
      operateAddLb: 'Thêm',
      operateDeleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá menu %{menuName}?'
    }
  },
  // Dept menu internationalization
  dept: {
    searchInput: {
      deptNameLb: 'Tên phòng ban',
      deptNamePh: 'Nhập',
      statusLb: 'Trạng thái',
      statusPh: 'Chọn'
    },
    headerButton: {
      addTt: 'Thêm',
      toggleExpandTt: 'Mở rộng/Thu gọn'
    },
    dialog: {
      addTt: 'Thêm phòng ban',
      editTt: 'Sửa phòng ban',
      parentIdLb: 'Phòng ban cấp trên',
      parentIdPh: 'Chọn',
      deptNameLb: 'Tên phòng ban',
      deptNamePh: 'Nhập',
      orderNumLb: 'Thứ tự',
      leaderLb: 'Trưởng phòng',
      leaderPh: 'Nhập',
      phoneLb: 'Số điện thoại',
      phonePh: 'Nhập',
      emailLb: 'Email',
      emailPh: 'Nhập',
      statusLb: 'Trạng thái',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        parentIdRqMsg: 'Phòng ban cấp trên không được trống',
        deptNameRqMsg: 'Tên phòng ban không được trống',
        orderNumRqMsg: 'Thứ tự không được trống',
        emailPtMsg: 'Địa chỉ email không hợp lệ',
        phonePtMsg: 'Số điện thoại không hợp lệ'
      }
    },
    columns: {
      deptNameLb: 'Tên phòng ban',
      orderNumLb: 'Thứ tự',
      statusLb: 'Trạng thái',
      createTimeLb: 'Ngày tạo',
      operateLb: 'Thao tác',
      operateEditLb: 'Sửa',
      operateAddLb: 'Thêm',
      operateDeleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá phòng ban %{deptName}?'
    }
  },
  // Post menu internationalization
  post: {
    searchInput: {
      postCodeLb: 'Mã chức vụ',
      postCodePh: 'Nhập',
      postNameLb: 'Tên chức vụ',
      postNamePh: 'Nhập',
      statusLb: 'Trạng thái',
      statusPh: 'Chọn'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá',
      exportTt: 'Xuất excel'
    },
    dialog: {
      addTt: 'Thêm chức vụ',
      editTt: 'Sửa chức vụ',
      postNameLb: 'Tên chức vụ',
      postNamePh: 'Nhập',
      postCodeLb: 'Mã chức vụ',
      postCodePh: 'Nhập',
      postSortLb: 'Thứ tự',
      statusLb: 'Trạng thái',
      remarkLb: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        postNameRqMsg: 'Tên chức vụ không được trống',
        postCodeRqMsg: 'Mã chức vụ không được trống',
        postSortRqMsg: 'Thứ tự không được trống'
      }
    },
    columns: {
      postIdLb: 'ID',
      postCodeLb: 'Mã chức vụ',
      postNameLb: 'Tên chức vụ',
      postSortLb: 'Thứ tự',
      statusLb: 'Trạng thái',
      createTimeLb: 'Ngày tạo',
      operateLb: 'Thao tác',
      operateEditLb: 'Sửa',
      operateDeleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá chức vụ%{postName}?'
    }
  },
  // Dict menu internationalization
  dict: {
    searchInput: {
      dictNameLb: 'Tên danh mục',
      dictNamePh: 'Nhập',
      dictTypeLb: 'Mã danh mục',
      dictTypePh: 'Nhập',
      statusLb: 'Trạng thái',
      statusPh: 'Chọn',
      createTimeLb: 'Ngày tạo',
      createTimeStartPh: 'Từ',
      createTimeEndPh: 'Đến'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá',
      exportTt: 'Xuất excel',
      refreshTt: 'Làm mới cache'
    },
    dialog: {
      addTt: 'Thêm danh mục',
      editTt: 'Sửa danh mục',
      dictNameLb: 'Tên danh mục',
      dictNamePh: 'Nhập',
      dictTypeLb: 'Mã danh mục',
      dictTypePh: 'Nhập',
      statusLb: 'Trạng thái',
      remarkLb: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        dictNameRqMsg: 'Tên danh mục không được trống',
        dictTypeRqMsg: 'Mã danh mục không được trống'
      }
    },
    columns: {
      dictIdLb: 'ID',
      dictNameLb: 'Tên danh mục',
      dictTypeLb: 'Mã danh mục',
      statusLb: 'Trạng thái',
      createTimeLb: 'Ngày tạo',
      remarkLb: 'Ghi chú',
      operateLb: 'Thao tác',
      operateEditLb: 'Sửa',
      operateDeleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      refreshSuccess: 'Làm mới cache thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá danh mục%{dictName}?'
    },
    data: {
      searchInput: {
        dictTypeLb: 'Mã danh mục',
        dictLabelLb: 'Nhãn',
        dictLabelPh: 'Nhập',
        statusLb: 'Trạng thái',
        statusPh: 'Chọn'
      },
      headerButton: {
        addTt: 'Thêm',
        editTt: 'Sửa',
        deleteTt: 'Xoá',
        exportTt: 'Xuất excel',
        closeTt: 'Đóng'
      },
      dialog: {
        addTt: 'Thêm dữ liệu danh mục',
        editTt: 'Sửa dữ liệu danh mục',
        dictTypeLb: 'Mã danh mục',
        dictLabelLb: 'Nhãn',
        dictLabelPh: 'Nhập',
        dictValueLb: 'Giá trị',
        dictValuePh: 'Nhập',
        cssClassLb: 'CSS class',
        cssClassPh: 'Nhập',
        dictSortLb: 'Thứ tự',
        listClassLb: 'Màu',
        statusLb: 'Trạng thái',
        remarkLb: 'Ghi chú',
        remarkPh: 'Nhập',
        footerCancelTt: 'Đóng',
        footerSubmitTt: 'Lưu',
        rules: {
          dictLabelRqMsg: 'Nhãn không được trống',
          dictValueRqMsg: 'Giá trị không được trống',
          dictSortRqMsg: 'Thứ tự không được trống'
        }
      },
      columns: {
        dictCodeLb: 'Mã danh mục',
        dictLabelLb: 'Nhãn',
        dictValueLb: 'Giá trị',
        dictSortLb: 'Thứ tự',
        statusLb: 'Trạng thái',
        createTimeLb: 'Ngày tạo',
        remarkLb: 'Ghi chú',
        operateLb: 'Thao tác',
        operateEditLb: 'Sửa',
        operateDeleteLb: 'Xoá'
      },
      operationMsg: {
        submitSuccess: 'Lưu thành công',
        deleteSuccess: 'Xoá thành công',
        deleteCf: 'Xác nhận xoá dữ liệu danh mục%{dictLabel}?'
      }
    }
  },
  // Config menu internationalization
  config: {
    searchInput: {
      configNameLb: 'Tên cấu hình',
      configNamePh: 'Nhập',
      configKeyLb: 'Mã cấu hình',
      configKeyPh: 'Nhập',
      configTypeLb: 'Loại cấu hình',
      createTimeLb: 'Ngày tạo',
      createTimeStartPh: 'Từ',
      createTimeEndPh: 'Đến'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá',
      exportTt: 'Xuất excel',
      refreshTt: 'Làm mới cache'
    },
    dialog: {
      addTt: 'Thêm cấu hình',
      editTt: 'Sửa cấu hình',
      configNameLb: 'Tên cấu hình',
      configNamePh: 'Nhập',
      configKeyLb: 'Mã cấu hình',
      configKeyPh: 'Nhập',
      configValueLb: 'Giá trị cấu hình',
      configValuePh: 'Nhập',
      configTypeLb: 'Loại cấu hình',
      remarkLb: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Save',
      rules: {
        configNameRqMsg: 'Tên cấu hình không được trống',
        configKeyRqMsg: 'Mã cấu hình không được trống',
        configValueRqMsg: 'Giá trị cấu hình không được trống'
      }
    },
    columns: {
      configIdLb: 'ID',
      configNameLb: 'Tên',
      configKeyLb: 'Mã',
      configValueLb: 'Giá trị',
      configTypeLb: 'Loại',
      createTimeLb: 'Ngày tạo',
      remarkLb: 'Ghi chú',
      operateLb: 'Thao tác',
      operateEditLb: 'Sửa',
      operateDeleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      refreshSuccess: 'Làm mới cache thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá cấu hình%{configName}?'
    }
  },
  // Notice menu internationalization
  notice: {
    searchInput: {
      noticeTitleLb: 'Tiêu đề',
      noticeTitlePh: 'Nhập',
      createByNameLb: 'Người tạo',
      createByNamePh: 'Nhập',
      noticeTypeLb: 'Loại',
      noticeTypePh: 'Chọn'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá'
    },
    dialog: {
      addTt: 'Thêm thông báo',
      editTt: 'Sửa thông báo',
      noticeTitleLb: 'Tiêu đề',
      noticeTitlePh: 'Nhập',
      noticeTypeLb: 'Loại',
      noticeTypePh: 'Chọn',
      statusLb: 'Trạng thái',
      noticeContentLb: 'Nội dung',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        noticeTitleRqMsg: 'Tiêu đề không được trống',
        noticeTypeRqMsg: 'Loại không được trống'
      }
    },
    columns: {
      noticeIdLb: 'ID',
      noticeTitleLb: 'Tiêu đề',
      noticeTypeLb: 'Loại',
      statusLb: 'Trạng thái',
      createByNameLb: 'Người tạo',
      createTimeLb: 'Ngày tạo',
      operateLb: 'Thao tác',
      operateEditLb: 'Sửa',
      operateDeleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá thông báo%{noticeTitle}?'
    }
  },
  // Oss menu internationalization
  oss: {
    searchInput: {
      fileNameLb: 'Tên file',
      fileNamePh: 'Nhập',
      originalNameLb: 'Tên gốc',
      originalNamePh: 'Nhập',
      fileSuffixLb: 'Định dạng',
      fileSuffixPh: 'Nhập',
      createTimeLb: 'Ngày tạo',
      createTimeStartPh: 'Từ',
      createTimeEndPh: 'Đến',
      serviceLb: 'Nguồn',
      servicePh: 'Nhập'
    },
    headerButton: {
      uploadFileTt: 'Upload file',
      uploadImageTt: 'Upload ảnh',
      deleteTt: 'Xoá',
      downloadTt: 'Xem thử: ',
      configTt: 'Cấu hình lưu trữ tệp'
    },
    dialog: {
      imageTt: 'Upload ảnh',
      fileTt: 'Upload file',
      fileNameLb: 'Tên file',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        fileRqMsg: 'File không được trống'
      }
    },
    columns: {
      ossIdLb: 'ID',
      fileNameLb: 'Tên file',
      originalNameLb: 'Tên gốc',
      fileSuffixLb: 'Định dạng',
      urlLb: 'File URL',
      createTimeLb: 'Ngày tạo',
      createByNameLb: 'Người tạo',
      serviceLb: 'Nguồn',
      operateLb: 'Thao tác',
      operateDownloadLb: 'Tải',
      operateDeleteLb: 'Xoá'
    },
    operationMsg: {
      previewEnable: 'Kích hoạt',
      previewDisable: 'Khoá',
      previewChangeCf: 'Xác nhận "%{action}" tuỳ chọn "Xem thử ảnh"?',
      previewChangeSuccess: ' thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá file%{fileName}?'
    },
    config: {
      searchInput: {
        configKeyLb: 'Mã cấu hình',
        configKeyPh: 'Nhập',
        bucketNameLb: 'Tên bucket',
        bucketNamePh: 'Nhập',
        statusLb: 'Trạng thái',
        statusPh: 'Chọn'
      },
      headerButton: {
        addTt: 'Thêm',
        editTt: 'Sửa',
        deleteTt: 'Xoá'
      },
      dialog: {
        addTt: 'Thêm cấu hình lưu trữ file',
        editTt: 'Sửa cấu hình lưu trữ file',
        configKeyLb: 'Mã cấu hình',
        configKeyPh: 'Nhập',
        endpointLb: 'Địa chỉ',
        endpointPh: 'Nhập',
        domainLb: 'Tên miền',
        domainPh: 'Nhập',
        accessKeyLb: 'Mã truy cập',
        accessKeyPh: 'Nhập',
        secretKeyLb: 'Mã bí mật',
        secretKeyPh: 'Nhập',
        bucketNameLb: 'Tên bucket',
        bucketNamePh: 'Nhập',
        prefixLb: 'Tiền tố',
        prefixPh: 'Nhập',
        httpsLb: 'HTTPS',
        policyLb: 'Chính sách',
        policyPrivateLb: 'Private',
        policyPublicLb: 'Public',
        policyCustomLb: 'Custom',
        regionLb: 'Khu vực',
        regionPh: 'Nhập',
        remarkLb: 'Ghi chú',
        remarkPh: 'Nhập',
        footerCancelTt: 'Đóng',
        footerSubmitTt: 'Lưu',
        rules: {
          configKeyRqMsg: 'Mã cấu hình không được trống',
          accessKeyRqMsg: 'Mã truy cập không được trống',
          accessKeyMinMaxMsg: 'Độ dài mã truy cập phải từ %{min} đến %{max} ký tự',
          secretKeyRqMsg: 'Mã bí mật không được trống',
          secretKeyMinMaxMsg: 'Độ dài mã bí mật phải từ %{min} đến %{max} ký tự',
          bucketNameRqMsg: 'Tên bucket không được trống',
          bucketNameMinMaxMsg: 'Độ dài tên bucket phải từ %{min} đến %{max} ký tự',
          endpointRqMsg: 'Địa chỉ không được trống',
          endpointMinMaxMsg: 'Độ dài địa chỉ phải từ %{min} đến %{max} ký tự',
          accessPolicyRqMsg: 'Chính sách không được trống'
        }
      },
      columns: {
        ossConfigIdLb: 'ID',
        configKeyLb: 'Mã cấu hình',
        endpointLb: 'Địa chỉ',
        domainLb: 'Tên miền',
        bucketNameLb: 'Tên bucket',
        prefixLb: 'Tiền tố',
        regionLb: 'Khu vực',
        accessPolicyLb: 'Chính sách',
        statusLb: 'Trạng thái',
        operateLb: 'Thao tác',
        operateEditLb: 'Sửa',
        operateDeleteLb: 'Xoá'
      },
      operationMsg: {
        submitSuccess: 'Lưu thành công',
        deleteSuccess: 'Xoá thành công',
        deleteCf: 'Xác nhận xoá cấu hình lưu trữ file%{configKey}?',
        statusEnable: 'Kích hoạt',
        statusDisable: 'Khoá',
        statusChangeCf: 'Xác nhận "%{action}" cấu hình lưu trữ file "%{configKey}"?',
        statusChangeSuccess: ' thành công'
      }
    }
  },
  // Operlog menu internationalization
  operlog: {
    searchInput: {
      titleLb: 'Tiêu đề',
      titlePh: 'Nhập',
      operNameLb: 'Người thao tác',
      operNamePh: 'Nhập',
      systemTypeLb: 'Hệ thống',
      systemTypePh: 'Nhập',
      businessTypeLb: 'Loại',
      businessTypePh: 'Chọn',
      statusLb: 'Trạng thái',
      statusPh: 'Chọn',
      operTimeLb: 'Thời gian',
      operTimeStartPh: 'Từ',
      operTimeEndPh: 'Ngày'
    },
    headerButton: {
      deleteTt: 'Xoá',
      clearTt: 'Xoá tất cả',
      exportTt: 'Xuất excel'
    },
    dialog: {
      tt: 'Chi tiết lịch sử thao tác',
      titleTt: 'Tiêu đề',
      operUrlPh: 'URL',
      operInfoTt: 'Thông tin',
      requestMethodPh: 'Request method',
      methodTt: 'Method',
      operParamPh: 'Tham số',
      jsonResultTt: 'Kết quả',
      statusTt: 'Trạng thái',
      costTimeTt: 'Thời gian tiêu tốn',
      operTimeTt: 'Thời gian thực thi',
      errorMsgTt: 'Thông báo lỗi',
      footerCancelTt: 'Đóng'
    },
    columns: {
      operIdLb: 'ID',
      titleLb: 'Tiêu đề',
      businessTypeLb: 'Loại',
      operNameLb: 'Người thao tác',
      operIpLb: 'IP',
      systemTypeLb: 'Hệ thống',
      statusLb: 'Trạng thái',
      operTimeLb: 'Thời gian',
      costTimeLb: 'Tiêu tốn (ms)',
      operateLb: 'Thao tác',
      detailLb: 'Xem chi tiết'
    },
    operationMsg: {
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá lịch sử thao tác%{title}?',
      clearSuccess: 'Xoá tất cả thành công',
      clearCf: 'Xác nhận xoá tất cả lịch sử thao tác?'
    }
  },
  // Logininfor menu internationalization
  logininfor: {
    searchInput: {
      ipaddrLb: 'Tiêu đề',
      ipaddrPh: 'Nhập',
      userNameLb: 'Người thao tác',
      userNamePh: 'Nhập',
      statusLb: 'Loại',
      statusPh: 'Chọn',
      loginTimeLb: 'Thời gian',
      loginTimeStartPh: 'Từ',
      loginTimeEndPh: 'Đến'
    },
    headerButton: {
      deleteTt: 'Xoá',
      unlockTt: 'Mở khoá',
      exportTt: 'Xuất excel'
    },
    columns: {
      ipaddrLb: 'Địa chỉ IP',
      loginLocationLb: 'Vị trí',
      osLb: 'Hệ điều hành',
      browserLb: 'Trình duyệt',
      statusLb: 'Trạng thái',
      msgLb: 'Thông báo',
      loginTimeLb: 'Thời gian'
    },
    operationMsg: {
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá lịch sử đăng nhập?',
      clearSuccess: 'Xoá tất cả thành công',
      clearCf: 'Xác nhận xoá tất cả lịch sử đăng nhập?',
      unlockSuccess: 'Tài khoản %{username} mở khoá thành công',
      unlockCf: 'Xác nhận mở khoả tài khoản %{username}?'
    }
  },
  bulletin: {
    searchInput: {
      titleLb: 'Tìm kiếm',
      titlePh: 'Nhập tiêu đề',
      createTimeLb: 'Ngày tạo',
      createTimeStartPh: 'Từ',
      createTimeEndPh: 'Đến'
    }
  },
  profile: {
    basicInfo: {
      tt: 'Thông tin cá nhân',
      usernameLb: 'Tài khoản',
      phonenumberLb: 'Số điện thoại',
      emailLb: 'Email',
      createTimeLb: 'Ngày tạo'
    },
    editInfo: {
      tt: 'Sửa thông tin cá nhân',
      basicTab: 'Thông tin cơ bản',
      passwordTab: 'Thay đổi mật khẩu',
      nickNameLb: 'Tên cá nhân',
      phonenumberLb: 'Số điện thoại',
      emailLb: 'Email',
      sexLb: 'Giới tính',
      sexMaleLb: 'Nam',
      sexFemaleLb: 'Nữ',
      oldPasswordLb: 'Mật khẩu cũ',
      oldPasswordPh: 'Nhập',
      newPasswordLb: 'Mật khẩu mới',
      newPasswordPh: 'Nhập',
      confirmPasswordLb: 'Xác nhận mật khẩu',
      confirmPasswordPh: 'Nhập',
      submitBtn: 'Lưu',
      cancelBtn: 'Đóng',
      infoRules: {
        nickNameRqMsg: 'Tên cá nhân không được trống',
        emailRqMsg: 'Email không được trống',
        emailPtMsg: 'Email không hợp lệ',
        phonenumberPtMsg: 'Số điện thoại không hợp lệ'
      },
      passwordRules: {
        oldPasswordRqMsg: 'Mật khẩu cũ không được trống',
        newPasswordRqMsg: 'Mật khẩu mới không được trống',
        newPasswordMinMaxMsg: 'Độ dài mật khẩu phải từ %{min} đến %{max} ký tự',
        passwordNotMatch: 'Mật khẩu xác nhận không trùng khớp',
        confirmPasswordRqMsg: 'Mật khẩu xác nhận không được trống'
      },
      editSuccess: 'Cập nhật thông tin thành công'
    },
    userAvatar: {
      chooseBtn: 'Chọn',
      zoomIn: 'Phóng to',
      zoomOut: 'Thu nhỏ',
      rotateLeft: 'Xoay trái',
      rotateRight: 'Xoay phải',
      saveBtn: 'Lưu',
      dialogTt: 'Sửa ảnh đại diện',
      uploadErr: 'Định dạng ảnh không hợp lệ, vui lòng tải các định dạng ảnh như: JPG, PNG.',
      editSuccess: 'Lưu thành công'
    }
  },
  dataHistory: {
    searchInput: {
      usernameLb: 'Tên tài khoản',
      usernamePh: 'Nhập',
      tableNameLb: 'Phân hệ',
      tableNamePh: 'Nhập',
      systemTypeLb: 'Hệ thống',
      systemTypePh: 'Nhập',
      createTimeLb: 'Thời gian',
      createTimeStartPh: 'Từ',
      createTimeEndPh: 'Đến'
    },
    headerButton: {
      deleteTt: 'Xoá',
      exportTt: 'Xuất excel'
    },
    dialog: {
      detailTt: 'Chi tiết lịch sử',
      createTimeLb: 'Thời gian',
      histTypeLb: 'Thao tác',
      tableNameLb: 'Phân hệ',
      systemTypeLb: 'Hệ thống',
      dataFieldLb: 'Trường dữ liệu',
      oldValueLb: 'Giá trị cũ',
      newValueLb: 'Giá trị mới',
      usernameLb: 'Người thực hiện',
      footerCancelTt: 'Đóng'
    },
    columns: {
      idLb: 'ID',
      refIdLb: 'ID tham chiếu',
      histTypeLb: 'Thao tác',
      tableNameLb: 'Phân hệ',
      systemTypeLb: 'Hệ thống',
      dataFieldLb: 'Trường dữ liệu',
      createTimeLb: 'Thời gian',
      oldValueLb: 'Giá trị cũ',
      newValueLb: 'Giá trị mới',
      usernameLb: 'Người thực hiện',
      operateLb: 'Thao tác',
      operateDeleteLb: 'Xoá'
    },
    operationMsg: {
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá lịch sử%{id}?'
    }
  },
  // Cinema menu internationalization
  cinemaManagement: {
    searchInput: {
      cinemaNameLb: 'Tên rạp chiếu',
      cinemaNamePh: 'Nhập',
      cinemaAddressLb: 'Địa chỉ',
      cinemaAddressPh: 'Nhập'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá'
    },
    dialog: {
      addTt: 'Thêm rạp chiếu',
      editTt: 'Sửa thông tin rạp chiếu',
      cinemaNameTt: 'Tên rạp chiếu',
      cinemaNamePh: 'Nhập',
      cinemaAddressTt: 'Địa chỉ',
      cinemaAddressPh: 'Nhập',
      remarkTt: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        cinemaNameRqMsg: 'Tên rạp chiếu không được trống',
        cinemaAddressRqMsg: 'Địa chỉ không được trống'
      }
    },
    columns: {
      idLb: 'ID',
      cinemaNameLb: 'Tên rạp chiếu',
      cinemaAddressLb: 'Địa chỉ',
      createTimeLb: 'Ngày tạo',
      remarkLb: 'Ghi chú',
      operateLb: 'Thao tác',
      editLb: 'Sửa',
      deleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá rạp chiếu?'
    }
  },
  // Movie menu internationalization
  movieManagement: {
    searchInput: {
      titleLb: 'Tên phim',
      titlePh: 'Nhập'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá'
    },
    dialog: {
      addTt: 'Thêm phim',
      editTt: 'Sửa thông tin phim',
      titleTt: 'Tên phim',
      titlePh: 'Nhập',
      movieDescriptionTt: 'Mô tả',
      movieDescriptionPh: 'Nhập',
      releaseDateTt: 'Ngày khởi chiếu',
      releaseDatePh: 'Nhập',
      endDateTt: 'Ngày kết thúc',
      endDatePh: 'Nhập',
      durationTt: 'Thời lượng',
      durationPh: 'Nhập',
      languageTt: 'Ngôn ngữ',
      languagePh: 'Nhập',
      ratedTt: 'Độ tuổi',
      ratedPh: 'Nhập',
      genreTt: 'Thể loại',
      genrePh: 'Nhập',
      directorTt: 'Đạo diễn',
      directorPh: 'Nhập',
      actorTt: 'Diễn viên',
      actorPh: 'Nhập',
      ratingTt: 'Rating',
      ratingPh: 'Nhập',
      posterUrlTt: 'Poster',
      posterUrlPh: 'Nhập',
      trailerUrlTt: 'Trailer',
      trailerUrlPh: 'Nhập',
      remarkTt: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        titleRqMsg: 'Tên phim không được trống'
      }
    },
    columns: {
      idLb: 'ID',
      titleLb: 'Tên phim',
      movieDescriptionLb: 'Mô tả',
      releaseDateLb: 'Ngày khởi chiếu',
      endDateLb: 'Ngày kết thúc',
      durationLb: 'Thời lượng',
      languageLb: 'Ngôn ngữ',
      ratedLb: 'Độ tuổi',
      genreLb: 'Thể loại',
      directorLb: 'Đạo diễn',
      actorLb: 'Diễn viên',
      ratingLb: 'Rating',
      posterUrlLb: 'Poster',
      trailerUrlLb: 'Trailer',
      createTimeLb: 'Ngày tạo',
      remarkLb: 'Ghi chú',
      operateLb: 'Thao tác',
      editLb: 'Sửa',
      deleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá phim?'
    }
  },
  // Promotion menu internationalization
  promotionManagement: {
    searchInput: {
      titleLb: 'Tên khuyến mãi',
      titlePh: 'Nhập'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá'
    },
    dialog: {
      addTt: 'Thêm khuyến mãi',
      editTt: 'Sửa thông tin khuyến mãi',
      titleTt: 'Tên khuyến mãi',
      titlePh: 'Nhập',
      promotionDescriptionTt: 'Mô tả',
      promotionDescriptionPh: 'Nhập',
      discountTt: 'Discount (%)',
      discountPh: 'Nhập',
      imageUrlTt: 'Image URL',
      imageUrlPh: 'Nhập',
      fromDateTt: 'Ngày bắt đầu',
      fromDatePh: 'Nhập',
      toDateTt: 'Ngày kết thúc',
      toDatePh: 'Nhập',
      remarkTt: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        titleRqMsg: 'Tên khuyến mãi không được trống'
      }
    },
    columns: {
      idLb: 'ID',
      titleLb: 'Tên khuyến mãi',
      promotionDescriptionLb: 'Mô tả',
      discountLb: 'Discount (%)',
      imageUrlLb: 'Image URL',
      fromDateLb: 'Ngày bắt đầu',
      toDateLb: 'Ngày kết thúc',
      createTimeLb: 'Ngày tạo',
      remarkLb: 'Ghi chú',
      operateLb: 'Thao tác',
      editLb: 'Sửa',
      deleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá khuyến mãi?'
    }
  },
  // Slide menu internationalization
  slideManagement: {
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá'
    },
    dialog: {
      addTt: 'Thêm slide',
      editTt: 'Sửa slide',
      slideUrlTt: 'Slide URL',
      slideUrlPh: 'Nhập',
      remarkTt: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        slideRqMsg: 'Slide URL không được trống'
      }
    },
    columns: {
      idLb: 'ID',
      slideUrlLb: 'Slide URL',
      createTimeLb: 'Ngày tạo',
      remarkLb: 'Ghi chú',
      operateLb: 'Thao tác',
      editLb: 'Sửa',
      deleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá slide?'
    }
  },
  // Account menu internationalization
  account: {
    searchInput: {
      nickNameLb: 'Họ tên khách hàng',
      nickNamePh: 'Nhập'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xóa'
    },
    dialog: {
      addTt: 'Thêm tài khoản khách hàng',
      editTt: 'Chỉnh sửa',
      userNameTt: 'Tên tài khoản ',
      userNamePh: 'Nhập',
      nickNameTt: 'Họ tên',
      nickNamePh: 'Nhập',
      customerTypeTt: 'Loại tài khoản',
      customerTypePh: 'Nhập',
      emailTt: 'Email',
      emailPh: 'Nhập',
      phonenumberTt: 'Số điện thoại',
      phonenumberPh: 'Nhập',
      sexTt: 'Giới tính',
      sexPh: 'Nhập',
      avatarTt: 'Ảnh đại diện',
      avatarPh: 'Nhập',
      passwordTt: 'Mật khẩu',
      passwordPh: 'Nhập',
      statusTt: 'Trạng thái',
      statusPh: 'Nhập',
      remarkTt: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu'
    },
    columns: {
      userIdLb: 'ID',
      userNameLb: 'Tên tài khoản',
      nickNameLb: 'Họ Tên',
      customerTypeLb: 'Loại tài khoản',
      emailLb: 'Email',
      phonenumberLb: 'Số điện thoại', 
      sexLb: 'Giới tính',
      avatarLb: 'Ảnh đại diện',
      passwordLb: 'Mật khẩu',
      statusLb: 'Trạng thái',
      remarkLb: 'Chú thích',
      operateLb: 'Thao tác',
      editLb: 'Chỉnh sửa',
      deleteLb: 'Xóa'
    },
    operationMsg: {
      submitSuccess: 'Lưa thành công',
      deleteSuccess: 'Xóa thành công',
      deleteCf: 'Bạn có muốn xóa tài khoản này không?'
    }
  },
  // Seat type menu internationalization
  seatTypeManagement: {
    searchInput: {
      seatTypeNameLb: 'Tên loại ghế',
      seatTypeNamePh: 'Nhập'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá'
    },
    dialog: {
      addTt: 'Thêm loại ghế',
      editTt: 'Sửa thông tin loại ghế',
      seatTypeNameTt: 'Tên loại ghế',
      seatTypeNamePh: 'Nhập',
      priceTt: 'Đơn giá (VND)',
      pricePh: 'Nhập',
      remarkTt: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu',
      rules: {
        seatTypeNameRqMsg: 'Tên loại ghế không được trống',
        priceRqMsg: 'Đơn giá không được trống'
      }
    },
    columns: {
      idLb: 'ID',
      seatTypeNameLb: 'Tên loại ghế',
      priceLb: 'Đơn giá (VND)',
      createTimeLb: 'Ngày tạo',
      remarkLb: 'Ghi chú',
      operateLb: 'Thao tác',
      editLb: 'Sửa',
      deleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá loại ghế?'
    }
  },
  // Hall menu internationalization
  hallManagement: {
    searchInput: {
      hallNameLb: 'Tên phòng',
      hallNamePh: 'Nhập',
      cinemaIdLb: 'Rạp chiếu',
      cinemaIdPh: 'Chọn',
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xoá'
    },
    columns: {
      hallNameLb: 'Tên phòng',
      cinemaNameLb: 'Rạp chiếu',
      rowNumberLb: 'Số hàng ghế',
      createTimeLb: 'Ngày tạo',
      remarkLb: 'Ghi chú',
      operateLb: 'Thao tác',
      editLb: 'Sửa',
      deleteLb: 'Xoá'
    },
    hallSeatColumns: {
      rowCodeLb: 'Mã hàng',
      rowSeatNumberLb: 'Số ghế của hàng',
      seatTypeIdLb: 'Loại ghế',
      remarkLb: 'Ghi chú',
      operateLb: 'Thao tác',
      editLb: 'Sửa',
      deleteLb: 'Xoá'
    },
    operationMsg: {
      submitSuccess: 'Lưu thành công',
      deleteSuccess: 'Xoá thành công',
      deleteCf: 'Xác nhận xoá phòng?'
    }
  },
  // Showtime menu internationalization
  showtime: {
    searchInput: {
      movieNameLb: 'Tên phim',
      movieNamePh: 'Chọn',
      cinemaNameLb: 'Rạp chiếu',
      cinemaNamePh: 'Chọn',
      hallNameLb: 'Phòng',
      hallNamePh: 'Chọn',
      releaseDateLb: 'Thời gian chiếu',
      startTimePh: 'Từ',
      endTimePh: 'Đến'
    },
    headerButtonLeft: {
      releaseShowtimeTt: 'Phát hành lịch chiếu'
    },
    headerButtonRight: {
      editTt: 'Sửa'
    },
    dialog: {
      editSingleTt: 'Cập nhật lịch chiếu',
      editMultiTt: 'Cập nhật lịch chiếu',
      startTimeLb: 'Thời gian bắt đầu',
      startTimePh: 'Chọn',
      endTimeLb: 'Thời gian kết thúc',
      endTimePh: 'Chọn',
      remarkLb: 'Ghi chú',
      remarkPh: 'Nhập',
      footerCancelTt: 'Đóng',
      footerSubmitTt: 'Lưu'
    },
    showtimeColumns: {
      movieNameLb: 'Tên phim',
      cinemaNameLb: 'Tên rạp',
      hallNameLb: 'Tên phòng',
      startTimeLb: 'Thời gian bắt đầu',
      endTimeLb: 'Thời gian kết thúc'
    },
    seatColumns: {
      iconStatusLb: 'Trạng thái',
      rowCodeLb: 'Mã hàng',
      columnCodeLb: 'Mã cột',
      seatTypeNameLb: 'Loại ghế',
      priceLb: 'Giá vé (VND)'
    },
    operationMsg: {
      submitSuccess: 'Cập nhật lịch chiếu thành công'
    },
    release: {
      movieNameLb: 'Tên phim',
      cinemaNameLb: 'Tên rạp',
      hallNameLb: 'Tên phòng',
      startTimeLb: 'Thời gian bắt đầu',
      releaseOffical: 'Phát hành',
      closeBtn: 'Đóng',
      releaseCf: 'Xác nhận phát hành lịch chiếu?',
      releaseSuccess: 'Phát hành lịch chiếu thành công'
    }
  },
  // Ticket menu internationalization
  ticketManagement: {
    searchInput: {
      cinemaIdLb: 'Tên Rạp',
      cinemaIdPh: 'Chọn'
    },
    headerButton: {
      addTt: 'Thêm',
      editTt: 'Sửa',
      deleteTt: 'Xóa'
    },
    columns: {
      nickNameLb: 'Họ Tên',
      cinemaNameLb: 'Tên Rạp',
      numTicketLb: 'Số vé',
      totalPriceLb: 'Tổng tiền',
      promotionIdLb: 'Mã khuyến mãi',
      movieNameLb: 'Tên Phim',
      createTimeLb: 'Ngày tạo',
      operateLb: 'Thao tác',
      editLb: 'Sửa',
      deleteLb: 'Xóa'
    },
    bookingDetailColumns: {
      rowCodeLb: 'Mã hàng của ghế',
      columnCodeLb: 'Mã cột',
      operateLb: 'Thao tác',
      editLb: 'Sửa',
      deleteLb: 'Xóa'
    },
    operationMsg: {
      submitSuccess: 'Sửa thành công',
      deleteSuccess: 'Xóa thành công',
      deleteCf: 'Xác nhận xóa vé?'
    }
  },
};

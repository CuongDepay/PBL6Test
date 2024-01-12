export default {
  // Routing Internationalization
  route: {
    dashboard: 'Dashboard',
    document: 'Document'
  },
  // Login Page Internationalization
  login: {
    username: 'Username',
    password: 'Password',
    login: 'Login',
    code: 'Verification Code',
    copyright: '',
    logoutCf: 'Are you sure you want to logout and exit the system?'
  },
  register: {
    username: 'Username',
    password: 'Password',
    rePassword: 'Confirm password',
    register: 'Register',
    code: 'Verification Code',
    copyright: '',
    logoutCf: 'Are you sure you want to logout and exit the system?'
  },
  // Navigation bar internationalization
  navbar: {
    full: 'Full Screen',
    language: 'Language',
    langKey: 'EN',
    vietnamese: 'Vietnamese',
    english: 'English',
    langIcon: 'english',
    dashboard: 'Dashboard',
    document: 'Document',
    layoutSize: 'Layout Size',
    selectTenant: 'Select Tenant',
    layoutSetting: 'Layout Setting',
    personalCenter: 'Profile',
    logout: 'Logout'
  },
  // Sidebar internationalization
  sidebar: {
    searchPlaceholder: 'Search'
  },
  cacheMonitor: {
    basicTt: 'Basic information',
    redisVersion: 'Redis version',
    oprMode: 'Operating mode',
    port: 'Port',
    clients: 'Number of clients',
    runningTime: 'Running time (days)',
    usedMemory: 'Used memory',
    usedCpu: 'Used CPU',
    memoryConf: 'Memory config',
    aof: 'AOF enabled',
    rdb: 'RDB successful',
    keys: 'Number of Keys',
    network: 'Network entry/exit',
    commandStatsTt: 'Command statistics',
    memoryTt: 'Memory information'
  },
  tagview: {
    refresh: 'Refresh page',
    closeCurrent: 'Close current',
    closeOther: 'Close other',
    closeLeft: 'Close left',
    closeRight: 'Close right',
    closeAll: 'Close all'
  },
  common: {
    logoutCfTt: 'Confirm',
    logoutCfMsg: 'The login status has expired, you can stay on this page or login again',
    logoutCfBtn: 'OK',
    logoutCancelBtn: 'Close',
    sessionExpiredMsg: 'Invalid session or session expired, please login again.',
    networkErrMsg: 'Abnormal backend interface connection',
    timeoutMsg: 'System interface request timed out',
    commonErrMsg: 'System interface %{code} exception',
    downloadProgressMsg: 'Downloading data, please wait',
    errDownloadMsg: 'There was an error downloading the file, please contact the administrator!',
    cfDelTt: 'Confirm',
    cfWarnTt: 'Confirm',
    cfDelBtnClose: 'Cancel',
    cfDelBtnOk: 'OK',
    cfWarnBtnClose: 'Cancel',
    cfWarnBtnOk: 'OK'
  },
  irupload: {
    tt: 'Drag and Drop file(s)',
    subTt: 'or',
    selectFileBtn: 'Select file',
    updateSupport: 'Whether to update existing data',
    supportedFormat: 'Supported format: ',
    tipNext: 'Only %{accept} format files are allowed to be imported'
  },
  irgrid: {
    validateNotInput: 'Please input data before submit',
    validateTt: 'Warning',
    validateDetail: 'Please input data at column "%{col}" row "%{row}"'
  },
  fileUpload: {
    selectBtn: 'Select file(s)',
    supportedFormats: 'Supported formats:',
    deleteBtn: 'Delete',
    incorrectFormat: 'The file format is incorrect, please upload file with formats: %{formats}!',
    sizeExceed: 'Upload file size cannot exceed %{fileSize} MB!',
    loadingWait: 'Uploading file, please wait...',
    numberExceed: 'The number of uploaded files cannot exceed %{fileNumber}!',
    failToUpload: 'Failed to upload file',
    cannotEmpty: 'File cannot be empty'
  },
  homepage: {
    topNav: {
      homepage: 'Home page',
      showtimes: 'Showtimes',
      film: 'Film',
      promotions: 'Promotions',
      cinema: 'Cinema',
      contact: 'Contact',
      carriers: 'Carriers',
      filmLabel: 'Film Content',
      login_out: 'LOGIN/ LOGOUT'
    },
    login: {
      tt: 'System login',
      usernameLb: 'Username',
      usernamePh: 'Input',
      passwordLb: 'Password',
      passwordPh: 'Input',
      rememberPassLb: 'Remember password',
      loginBtnTt: 'Login',
      rules: {
        usernameRqMsg: 'Please enter your username',
        passwordRqMsg: 'Please enter your password'
      }
    },
    register: {
      tt: 'System register',
      usernameLb: 'Username',
      usernamePh: 'Input',
      passwordLb: 'Password',
      passwordPh: 'Input',
      rePasswordLb: 'Confirm Password',
      rePasswordPh: 'Input',
      rememberPassLb: 'Remember password',
      registerBtnTt: 'Register',
      rules: {
        usernameRqMsg: 'Please enter your username',
        passwordRqMsg: 'Please enter your password',
        rePasswordRqMsg: 'Please re-enter your password'
      }
    },
    film: {
      guideTt: 'Movie Selection',
      documentTt: 'Download document',
      documentDownloadBtn: 'Download',
      showAllBtn: 'Show all',
      comingSoon: 'ComingSoon',
      showtime: 'Showtime'
    },
    document: {
      guideTt: 'Promotions',
      documentTt: 'Download document',
      documentDownloadBtn: 'Download',
      showAllBtn: 'Show all'
    },
    contactInfo: {
      contactAddrLb: 'Contact address',
      addrLb: 'Address',
      addrContent1: '13 Dien Bien Phu Street, Hoa Khe Ward, ',
      addrContent2: 'District Thanh Khe, Da Nang City, Vietnam',
      phoneLb: 'Phone',
      customerPolicyTt: 'Customer policy',
      serviceTermLb: 'Terms of service',
      refundPolicyLb: 'Refund policy',
      customerPolicyLb: 'Customer policy',
      confidentialPolicyLb: 'Confidentiality policy',
      paymentTermLb: 'Payment terms',
      supportTt: 'Support',
      supportContent: 'Registering and using Star Cinema platform, support user manual, if you have any questions, please contact with hotline'
    },
    searchEdoTt1: 'Search electronic delivery order',
    searchEdoTt2: 'information - eDO',
    searchEdoContNoLb: 'Container no',
    searchEdoContNoPh: 'Input',
    searchEdoBlNoLb: 'Bill of lading',
    searchEdoBlNoPh: 'Input',
    searchEdoBtn: 'Search',
    searchEirTt1: 'Search equipment interchange receipt',
    searchEirTt2: 'information - EIR',
    searchEirContNoLb: 'Container no',
    searchEirContNoPh: 'Input',
    searchEirTruckNoLb: 'Truck no',
    searchEirTruckNoPh: 'Input',
    searchEirTimeLb: 'Date',
    searchEirTimePh: 'DD/MM/YYYY',
    searchEirBtn: 'Search',
    searchContainerTt: 'Search container information',
    searchContainerNoLb: 'Container no',
    searchContainerNoPh: 'Input',
    searchContainerNoBtn: 'Search',
    searchVesselScheduleTt: 'Search vessel schedule',
    searchVesselScheduleFromDateLb: 'From date',
    searchVesselScheduleFromDatePh: 'DD/MM/YYYY',
    searchVesselScheduleToDateLb: 'To date',
    searchVesselScheduleToDatePh: 'DD/MM/YYYY',
    searchVesselScheduleBtb: 'Search'
  },
  // User menu internationalization
  user: {
    leftPanel: {
      searchPlaceholder: 'Search'
    },
    searchInput: {
      userNameLb: 'Username',
      userNamePh: 'Input',
      phonenumberLb: 'Phone number',
      phonenumberPh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      importTemplateTt: 'Download template',
      importTt: 'Import excel',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add user',
      editTt: 'Edit user',
      cinemaLb: 'Cinema',
      cinemaPh: 'Select',
      nickNameLb: 'Personal name',
      nickNamePh: 'Input',
      deptIdLb: 'Department',
      deptIdPh: 'Select',
      phonenumberLb: 'Phone number',
      phonenumberPh: 'Input',
      emailLb: 'Email',
      emailPh: 'Input',
      userNameLb: 'Username',
      userNamePh: 'Input',
      passwordLb: 'Password',
      passwordPh: 'Input',
      sexLb: 'Gender',
      sexPh: 'Select',
      statusLb: 'Status',
      postIdsLb: 'Positions',
      postIdsPh: 'Select',
      roleIdsLb: 'Roles',
      roleIdsPh: 'Select',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        cinemaRqMsg: 'Cinema cannot be empty',
        userNameRqMsg: 'Username cannot be empty',
        userNameMinMaxMsg: 'Length of username must be from %{min} to %{max} characters',
        nickNameRqMsg: 'Personal name cannot be empty',
        passwordRqMsg: 'Password cannot be empty',
        passwordMinMaxMsg: 'Length of password must be from %{min} to %{max} characters',
        emailRqMsg: 'Email cannot be empty',
        phonenumberPtMsg: 'Phone number is incorrect'
      }
    },
    columns: {
      userIdLb: 'User ID',
      userNameLb: 'Username',
      nickNameLb: 'Personal name',
      deptNameLb: 'Department',
      phonenumberLb: 'Phone number',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete',
      operateResetPwdLb: 'Reset password',
      operateAuthRoleLb: 'Assign roles'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete user(s)%{username}?',
      statusEnable: 'Enable',
      statusDisable: 'Disable',
      statusChangeCf: 'Are you sure to "%{action}" user "%{username}"?',
      statusChangeSuccess: ' successfully',
      importTt: 'Import excel',
      importResultTt: 'Import excel result',
      resetPwdTt: 'Reset password',
      resetPwdCf: 'Please input new password for "%{username}"',
      resetPwdMinMaxMsg: 'Length of password must be from %{min} to %{max} characters',
      resetPwdSuccess: 'Reset password successfully, new password is: %{newPassword}',
      resetPwdBtnSave: 'Save',
      resetPwdBtnClose: 'Close'
    },
    authRole: {
      searchInput: {
        nickNameLb: 'Personal name',
        userNameLb: 'Username'
      },
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      columns: {
        roleIdLb: 'ID',
        roleNameLb: 'Role name',
        roleKeyLb: 'Role code',
        createTimeLb: 'Create time'
      },
      submitSuccess: 'Authorize successfully'
    }
  },
  // Role menu internationalization
  role: {
    searchInput: {
      roleNameLb: 'Role name',
      roleNamePh: 'Input',
      roleKeyLb: 'Role code',
      roleKeyPh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add role',
      editTt: 'Edit role',
      roleNameLb: 'Role name',
      roleNamePh: 'Input',
      roleKeyLb: 'Role code',
      roleKeyPh: 'Input',
      roleKeyTooltip: 'Role code defined in controller',
      roleSortLb: 'Display order',
      statusLb: 'Status',
      menuPermissionLb: 'Menu permission',
      menuPermissionExpand: 'Expand/Collapse',
      menuPermissionAll: 'Select all',
      menuPermissionLink: 'Linkage',
      menuPermissionLoadingLb: 'Loading, Please wait',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        roleNameRqMsg: 'Role name cannot be empty',
        roleKeyRqMsg: 'Role code cannot be empty',
        roleSortRqMsg: 'Display order cannot be empty'
      }
    },
    columns: {
      roleIdLb: 'ID',
      roleNameLb: 'Role name',
      roleKeyLb: 'Role code',
      roleSortLb: 'Order',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete',
      operateDataScopeLb: 'Data permission',
      operateAuthUserLb: 'Assign users'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete role%{roleName}?',
      statusEnable: 'Enable',
      statusDisable: 'Disable',
      statusChangeCf: 'Are you sure to "%{action}" role "%{roleName}"?',
      statusChangeSuccess: ' successfully'
    },
    dataPermission: {
      tt: 'Data permission',
      successMsg: 'Authorize successfully',
      option1: 'All data',
      option2: 'Custom data',
      option3: 'Data of this department',
      option4: 'This department and the following data',
      option5: 'Only personal data',
      roleNameLb: 'Role name',
      roleKeyLb: 'Role code',
      dataScopeLb: 'Data scope',
      dataPermissionLb: 'Data permission',
      dataPermissionExpand: 'Expand/Collapse',
      dataPermissionAll: 'Select all',
      dataPermissionLink: 'Linkage',
      dataPermissionLoadingLb: 'Loading, please wait',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save'
    },
    authUser: {
      searchInput: {
        userNameLb: 'Username',
        userNamePh: 'Input',
        phonenumberLb: 'Phone number',
        phonenumberPh: 'Input'
      },
      headerButton: {
        addTt: 'Add',
        deauthorizeTt: 'Deauthorize',
        closeTt: 'Close'
      },
      columns: {
        userNameLb: 'Username',
        nickNameLb: 'Personal name',
        emailLb: 'Email',
        phonenumberLb: 'Phone number',
        statusLb: 'Status',
        createTimeLb: 'Create time',
        operateLb: 'Operate',
        operateAuthUserLb: 'Deauthorize'
      },
      operationMsg: {
        cancelAuthCf: 'Are you sure to cancel permission for user %{username}?',
        cancelAuthSuccess: 'Cancel permission successfully',
        cancelAuthUserAllCf: 'Are you sure to cancel permision for user(s)?',
        cancelAuthUserAllSuccess: 'Cancel permission successfully'
      },
      selectUser: {
        tt: 'Select user',
        userNameLb: 'Username',
        userNamePh: 'Input',
        phonenumberLb: 'Phone number',
        phonenumberPh: 'Input',
        cancelBtnTt: 'Close',
        saveBtnTt: 'Save',
        columns: {
          userNameLb: 'Username',
          nickNameLb: 'Personal name',
          emailLb: 'Email',
          phonenumberLb: 'Phone number',
          statusLb: 'Status',
          createTimeLb: 'Create time'
        },
        saveErrorMsg: 'Please select users',
        saveSuccessMsg: 'Select users successfully'
      }
    }
  },
  // Menu menu internationalization
  menu: {
    searchInput: {
      menuNameLb: 'Menu name',
      menuNamePh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      toggleExpandTt: 'Expand/Collapse'
    },
    dialog: {
      addTt: 'Add menu',
      editTt: 'Edit menu',
      parentIdLb: 'Parent menu',
      parentIdPh: 'Select',
      menuTypeLb: 'Menu type',
      menuTypeM: 'Table of contents',
      menuTypeC: 'Menu',
      menuTypeF: 'Button',
      iconLb: 'Menu icon',
      menuNameLb: 'Menu name',
      orderNumLb: 'Display order',
      linkLb: 'Link',
      linkTooltip: 'If you select external link, the routing address needs to start with `http(s)://`',
      linkYes: 'Yes',
      linkNo: 'No',
      pathLb: 'Routing address',
      pathTooltip: 'Routing address, such as: `user`, if the external network address needs internal link access, start with `http(s)://`',
      pathPh: 'Input',
      componentLb: 'Component path',
      componentTooltip: 'Component path to access, such as: `system/user/index`, default in the `views` directory',
      componentPh: 'Input',
      permsLb: 'Permission code',
      permsPh: 'Input',
      permsTooltip: 'Permission code defined in the controller',
      queryLb: 'Routing parameters',
      queryPh: 'Input',
      queryTooltip: 'Default passing parameters of the access route, such as: `{"id": 1, "name": "hieu"}`',
      cacheLb: 'Whether to cache',
      cacheTooltip:
        'If you select cache, it will be cached by `keep-alive`, and the `name` and address of the matching component need to be consistent',
      cacheYes: 'Cache',
      cacheNo: 'No cache',
      displayLb: 'Display status',
      displayTooltip: 'If you choose to hide, the route will not appear in the sidebar but it can still be accessed',
      statusLb: 'Menu status',
      statusTooltip: 'If you select disable, the route will not appear in the sidebar and cannot be accessed',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        menuNameRqMsg: 'Menu name cannot be empty',
        orderNumRqMsg: 'Display order cannot be empty',
        pathRqMsg: 'Routing address cannot be empty'
      }
    },
    columns: {
      menuNameLb: 'Menu name',
      iconLb: 'Icon',
      orderNumLb: 'Order',
      permsLb: 'Permission code',
      componentLb: 'Component path',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateAddLb: 'Add',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete menu %{menuName}?'
    }
  },
  // Dept menu internationalization
  dept: {
    searchInput: {
      deptNameLb: 'Department name',
      deptNamePh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      toggleExpandTt: 'Expand/Collapse'
    },
    dialog: {
      addTt: 'Add department',
      editTt: 'Edit department',
      parentIdLb: 'Parent department',
      parentIdPh: 'Select',
      deptNameLb: 'Department name',
      deptNamePh: 'Input',
      orderNumLb: 'Order',
      leaderLb: 'Person in charge',
      leaderPh: 'Input',
      phoneLb: 'Phone number',
      phonePh: 'Input',
      emailLb: 'Email',
      emailPh: 'Input',
      statusLb: 'Status',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        parentIdRqMsg: 'Parent department cannot be empty',
        deptNameRqMsg: 'Department name cannot be empty',
        orderNumRqMsg: 'Order cannot be empty',
        emailPtMsg: 'Email is incorrect',
        phonePtMsg: 'Phone number is incorrect'
      }
    },
    columns: {
      deptNameLb: 'Department name',
      orderNumLb: 'Order',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateAddLb: 'Add',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete department %{deptName}?'
    }
  },
  // Post menu internationalization
  post: {
    searchInput: {
      postCodeLb: 'Position code',
      postCodePh: 'Input',
      postNameLb: 'Position name',
      postNamePh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      addTt: 'Add position',
      editTt: 'Edit position',
      postNameLb: 'Position name',
      postNamePh: 'Input',
      postCodeLb: 'Position code',
      postCodePh: 'Input',
      postSortLb: 'Order',
      statusLb: 'Status',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        postNameRqMsg: 'Position name cannot be empty',
        postCodeRqMsg: 'Position code cannot be empty',
        postSortRqMsg: 'Position order cannot be empty'
      }
    },
    columns: {
      postIdLb: 'ID',
      postCodeLb: 'Position code',
      postNameLb: 'Position name',
      postSortLb: 'Order',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete position(s)%{postName}?'
    }
  },
  // Dict menu internationalization
  dict: {
    searchInput: {
      dictNameLb: 'Dictionary name',
      dictNamePh: 'Input',
      dictTypeLb: 'Dictionary code',
      dictTypePh: 'Input',
      statusLb: 'Status',
      statusPh: 'Select',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel',
      refreshTt: 'Refresh cache'
    },
    dialog: {
      addTt: 'Add dictionary',
      editTt: 'Edit dictionary',
      dictNameLb: 'Dictionary name',
      dictNamePh: 'Input',
      dictTypeLb: 'Dictionary code',
      dictTypePh: 'Input',
      statusLb: 'Status',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        dictNameRqMsg: 'Dictionary name cannot be empty',
        dictTypeRqMsg: 'Dictionary code cannot be empty'
      }
    },
    columns: {
      dictIdLb: 'ID',
      dictNameLb: 'Dictionary name',
      dictTypeLb: 'Dictionary code',
      statusLb: 'Status',
      createTimeLb: 'Create time',
      remarkLb: 'Remark',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      refreshSuccess: 'Refresh successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete dictionary%{dictName}?'
    },
    data: {
      searchInput: {
        dictTypeLb: 'Dictionary code',
        dictLabelLb: 'Dictionary label',
        dictLabelPh: 'Input',
        statusLb: 'Status',
        statusPh: 'Select'
      },
      headerButton: {
        addTt: 'Add',
        editTt: 'Edit',
        deleteTt: 'Delete',
        exportTt: 'Export excel',
        closeTt: 'Close'
      },
      dialog: {
        addTt: 'Add dictionary data',
        editTt: 'Edit dictionary data',
        dictTypeLb: 'Dictionary code',
        dictLabelLb: 'Data label',
        dictLabelPh: 'Input',
        dictValueLb: 'Data code',
        dictValuePh: 'Input',
        cssClassLb: 'CSS class',
        cssClassPh: 'Input',
        dictSortLb: 'Order',
        listClassLb: 'List class',
        statusLb: 'Status',
        remarkLb: 'Remark',
        remarkPh: 'Input',
        footerCancelTt: 'Close',
        footerSubmitTt: 'Save',
        rules: {
          dictLabelRqMsg: 'Data label cannot be empty',
          dictValueRqMsg: 'Data code cannot be empty',
          dictSortRqMsg: 'Data order cannot be empty'
        }
      },
      columns: {
        dictCodeLb: 'Dictionary code',
        dictLabelLb: 'Data label',
        dictValueLb: 'Data code',
        dictSortLb: 'Order',
        statusLb: 'Status',
        createTimeLb: 'Create time',
        remarkLb: 'Remark',
        operateLb: 'Operate',
        operateEditLb: 'Edit',
        operateDeleteLb: 'Delete'
      },
      operationMsg: {
        submitSuccess: 'Saved successfully',
        deleteSuccess: 'Deleted successfully',
        deleteCf: 'Are you sure to delete dictionary data%{dictLabel}?'
      }
    }
  },
  // Config menu internationalization
  config: {
    searchInput: {
      configNameLb: 'Configuration name',
      configNamePh: 'Input',
      configKeyLb: 'Configuration key',
      configKeyPh: 'Input',
      configTypeLb: 'Type',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete',
      exportTt: 'Export excel',
      refreshTt: 'Refresh cache'
    },
    dialog: {
      addTt: 'Add configuration',
      editTt: 'Edit configuration',
      configNameLb: 'Configuration name',
      configNamePh: 'Input',
      configKeyLb: 'Configuration key',
      configKeyPh: 'Input',
      configValueLb: 'Configuration value',
      configValuePh: 'Input',
      configTypeLb: 'Type',
      remarkLb: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        configNameRqMsg: 'Configuration name cannot be empty',
        configKeyRqMsg: 'Configuration key cannot be empty',
        configValueRqMsg: 'Configuration value cannot be empty'
      }
    },
    columns: {
      configIdLb: 'ID',
      configNameLb: 'Name',
      configKeyLb: 'Key',
      configValueLb: 'Value',
      configTypeLb: 'Type',
      createTimeLb: 'Create time',
      remarkLb: 'Remark',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      refreshSuccess: 'Refresh successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete configuration%{configName}?'
    }
  },
  // Notice menu internationalization
  notice: {
    searchInput: {
      noticeTitleLb: 'Notice title',
      noticeTitlePh: 'Input',
      createByNameLb: 'Creator',
      createByNamePh: 'Input',
      noticeTypeLb: 'Notice type',
      noticeTypePh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete'
    },
    dialog: {
      addTt: 'Add notice',
      editTt: 'Edit notice',
      noticeTitleLb: 'Notice title',
      noticeTitlePh: 'Input',
      noticeTypeLb: 'Notice type',
      noticeTypePh: 'Select',
      statusLb: 'Status',
      noticeContentLb: 'Content',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        noticeTitleRqMsg: 'Notice title cannot be empty',
        noticeTypeRqMsg: 'Notice type cannot be empty'
      }
    },
    columns: {
      noticeIdLb: 'ID',
      noticeTitleLb: 'Notice title',
      noticeTypeLb: 'Notice type',
      statusLb: 'Status',
      createByNameLb: 'Creator',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      operateEditLb: 'Edit',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Saved successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete notice(s)%{noticeTitle}?'
    }
  },
  // Oss menu internationalization
  oss: {
    searchInput: {
      fileNameLb: 'File name',
      fileNamePh: 'Input',
      originalNameLb: 'Original name',
      originalNamePh: 'Input',
      fileSuffixLb: 'File extension',
      fileSuffixPh: 'Input',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To',
      serviceLb: 'Service provider',
      servicePh: 'Input'
    },
    headerButton: {
      uploadFileTt: 'Upload file',
      uploadImageTt: 'Upload image',
      deleteTt: 'Delete',
      downloadTt: 'Preview switch: ',
      configTt: 'Configuration management'
    },
    dialog: {
      imageTt: 'Upload image',
      fileTt: 'Upload file',
      fileNameLb: 'File name',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        fileRqMsg: 'File cannot be empty'
      }
    },
    columns: {
      ossIdLb: 'ID',
      fileNameLb: 'File name',
      originalNameLb: 'Original name',
      fileSuffixLb: 'File extension',
      urlLb: 'File URL',
      createTimeLb: 'Create time',
      createByNameLb: 'Uploader',
      serviceLb: 'Service provider',
      operateLb: 'Operate',
      operateDownloadLb: 'Download',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      previewEnable: 'Enable',
      previewDisable: 'Disable',
      previewChangeCf: 'Are you sure to "%{action}" option "Preview list images"?',
      previewChangeSuccess: ' successfully',
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete file(s)%{fileName}?'
    },
    config: {
      searchInput: {
        configKeyLb: 'Config key',
        configKeyPh: 'Input',
        bucketNameLb: 'Bucket name',
        bucketNamePh: 'Input',
        statusLb: 'Status',
        statusPh: 'Select'
      },
      headerButton: {
        addTt: 'Add',
        editTt: 'Edit',
        deleteTt: 'Delete'
      },
      dialog: {
        addTt: 'Add file configuration',
        editTt: 'Edit file configuration',
        configKeyLb: 'Configuration key',
        configKeyPh: 'Input',
        endpointLb: 'End point',
        endpointPh: 'Input',
        domainLb: 'Domain name',
        domainPh: 'Input',
        accessKeyLb: 'Access key',
        accessKeyPh: 'Input',
        secretKeyLb: 'Secret key',
        secretKeyPh: 'Input',
        bucketNameLb: 'Bucket name',
        bucketNamePh: 'Input',
        prefixLb: 'Prefix',
        prefixPh: 'Input',
        httpsLb: 'HTTPS',
        policyLb: 'Access policy',
        policyPrivateLb: 'Private',
        policyPublicLb: 'Public',
        policyCustomLb: 'Custom',
        regionLb: 'Region',
        regionPh: 'Input',
        remarkLb: 'Remark',
        remarkPh: 'Input',
        footerCancelTt: 'Close',
        footerSubmitTt: 'Save',
        rules: {
          configKeyRqMsg: 'Configuration Key cannot be empty',
          accessKeyRqMsg: 'Access key cannot be empty',
          accessKeyMinMaxMsg: 'Access key length must be from %{min} to %{max}',
          secretKeyRqMsg: 'Secret key cannot be empty',
          secretKeyMinMaxMsg: 'Secret key length must be from %{min} to %{max}',
          bucketNameRqMsg: 'Bucket name cannot be empty',
          bucketNameMinMaxMsg: 'Bucket name length must be from %{min} to %{max}',
          endpointRqMsg: 'End point cannot be empty',
          endpointMinMaxMsg: 'End point length must be from %{min} to %{max}',
          accessPolicyRqMsg: 'Access policy cannot be empty'
        }
      },
      columns: {
        ossConfigIdLb: 'ID',
        configKeyLb: 'Config key',
        endpointLb: 'End point',
        domainLb: 'Domain name',
        bucketNameLb: 'Bucket name',
        prefixLb: 'Prefix',
        regionLb: 'Region',
        accessPolicyLb: 'Access policy',
        statusLb: 'Status',
        operateLb: 'Operate',
        operateEditLb: 'Edit',
        operateDeleteLb: 'Delete'
      },
      operationMsg: {
        submitSuccess: 'Saved successfully',
        deleteSuccess: 'Deleted successfully',
        deleteCf: 'Are you sure to delete file configuration(s)%{configKey}?',
        statusEnable: 'Enable',
        statusDisable: 'Disable',
        statusChangeCf: 'Are you sure to "%{action}" file configuration "%{configKey}"?',
        statusChangeSuccess: ' successfully'
      }
    }
  },
  // Operlog menu internationalization
  operlog: {
    searchInput: {
      titleLb: 'Title',
      titlePh: 'Input',
      operNameLb: 'Operator',
      operNamePh: 'Input',
      systemTypeLb: 'System',
      systemTypePh: 'Input',
      businessTypeLb: 'Type',
      businessTypePh: 'Select',
      statusLb: 'Status',
      statusPh: 'Select',
      operTimeLb: 'Operation time',
      operTimeStartPh: 'From',
      operTimeEndPh: 'To'
    },
    headerButton: {
      deleteTt: 'Delete',
      clearTt: 'Clear',
      exportTt: 'Export excel'
    },
    dialog: {
      tt: 'Operation log detail',
      titleTt: 'Title',
      operUrlPh: 'Operation URL',
      operInfoTt: 'Operation Information',
      requestMethodPh: 'Request method',
      methodTt: 'Method',
      operParamPh: 'Params',
      jsonResultTt: 'Result',
      statusTt: 'Status',
      costTimeTt: 'Cost time (ms)',
      operTimeTt: 'Operation time',
      errorMsgTt: 'Error message',
      footerCancelTt: 'Close'
    },
    columns: {
      operIdLb: 'ID',
      titleLb: 'Title',
      businessTypeLb: 'Type',
      operNameLb: 'Operator',
      operIpLb: 'IP',
      systemTypeLb: 'System type',
      statusLb: 'Status',
      operTimeLb: 'Operation time',
      costTimeLb: 'Cost time',
      operateLb: 'Operate',
      detailLb: 'View detail'
    },
    operationMsg: {
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete operation log(s)%{title}?',
      clearSuccess: 'Clean successfully',
      clearCf: 'Are you sure to clear all operation logs?'
    }
  },
  // Logininfor menu internationalization
  logininfor: {
    searchInput: {
      ipaddrLb: 'Title',
      ipaddrPh: 'Input',
      userNameLb: 'Operator',
      userNamePh: 'Input',
      statusLb: 'Type',
      statusPh: 'Select',
      loginTimeLb: 'Login time',
      loginTimeStartPh: 'From',
      loginTimeEndPh: 'To'
    },
    headerButton: {
      deleteTt: 'Delete',
      unlockTt: 'Unlock',
      exportTt: 'Export excel'
    },
    columns: {
      ipaddrLb: 'IP address',
      loginLocationLb: 'Login location',
      osLb: 'Operating system',
      browserLb: 'Browser',
      statusLb: 'Status',
      msgLb: 'Message',
      loginTimeLb: 'Login time'
    },
    operationMsg: {
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete login log(s)?',
      clearSuccess: 'Clean successfully',
      clearCf: 'Are you sure to clear all login logs?',
      unlockSuccess: 'User %{username} unlock successfully',
      unlockCf: 'Are you sure to unlock user %{username}?'
    }
  },
  bulletin: {
    searchInput: {
      titleLb: 'Search',
      titlePh: 'Input title',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    }
  },
  profile: {
    basicInfo: {
      tt: 'Profile',
      usernameLb: 'Username',
      phonenumberLb: 'Phone number',
      emailLb: 'Email',
      createTimeLb: 'Create time'
    },
    editInfo: {
      tt: 'Edit profile',
      basicTab: 'Basic information',
      passwordTab: 'Change password',
      nickNameLb: 'Personal name',
      phonenumberLb: 'Phone number',
      emailLb: 'Email',
      sexLb: 'Gender',
      sexMaleLb: 'Male',
      sexFemaleLb: 'Female',
      oldPasswordLb: 'Old password',
      oldPasswordPh: 'Input',
      newPasswordLb: 'New password',
      newPasswordPh: 'Input',
      confirmPasswordLb: 'Confirm password',
      confirmPasswordPh: 'Input',
      submitBtn: 'Save',
      cancelBtn: 'Close',
      infoRules: {
        nickNameRqMsg: 'Personal name cannot be empty',
        emailRqMsg: 'Email cannot be empty',
        emailPtMsg: 'Email is incorrect',
        phonenumberPtMsg: 'Phone number is incorrect'
      },
      passwordRules: {
        oldPasswordRqMsg: 'Old password cannot be empty',
        newPasswordRqMsg: 'New password cannot be empty',
        newPasswordMinMaxMsg: 'Length of the new password must be from %{min} to %{max} characters',
        passwordNotMatch: 'The two entered passwords do not match',
        confirmPasswordRqMsg: 'Confirm password can not be empty'
      },
      editSuccess: 'Edited successfully'
    },
    userAvatar: {
      chooseBtn: 'Choose',
      zoomIn: 'Zoom in',
      zoomOut: 'Zoom out',
      rotateLeft: 'Rotate left',
      rotateRight: 'Rotate right',
      saveBtn: 'Save',
      dialogTt: 'Edit avatar',
      uploadErr: 'The file format is wrong, please upload the image type, such as: JPG, PNG file extension.',
      editSuccess: 'Saved successfully'
    }
  },
  dataHistory: {
    searchInput: {
      usernameLb: 'Username',
      usernamePh: 'Input',
      tableNameLb: 'Module',
      tableNamePh: 'Input',
      systemTypeLb: 'System type',
      systemTypePh: 'Input',
      createTimeLb: 'Create time',
      createTimeStartPh: 'From',
      createTimeEndPh: 'To'
    },
    headerButton: {
      deleteTt: 'Delete',
      exportTt: 'Export excel'
    },
    dialog: {
      detailTt: 'History detail',
      createTimeLb: 'Operation time',
      histTypeLb: 'Operation',
      tableNameLb: 'Module',
      systemTypeLb: 'System type',
      dataFieldLb: 'Data field',
      oldValueLb: 'Old value',
      newValueLb: 'New value',
      usernameLb: 'Operator',
      footerCancelTt: 'Close'
    },
    columns: {
      idLb: 'ID',
      refIdLb: 'Reference index',
      histTypeLb: 'Operation',
      tableNameLb: 'Module',
      systemTypeLb: 'System type',
      dataFieldLb: 'Data field',
      createTimeLb: 'Operation time',
      oldValueLb: 'Old value',
      newValueLb: 'New value',
      usernameLb: 'Operator',
      operateLb: 'Operate',
      operateDeleteLb: 'Delete'
    },
    operationMsg: {
      deleteSuccess: 'Deleted successfully',
      deleteCf: 'Are you sure to delete history%{id}?'
    }
  },
  // Cinema menu internationalization
  cinemaManagement: {
    searchInput: {
      cinemaNameLb: 'Cinema name',
      cinemaNamePh: 'Input',
      cinemaAddressLb: 'Address',
      cinemaAddressPh: 'Input'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete'
    },
    dialog: {
      addTt: 'Add cinema',
      editTt: 'Edit cinema',
      cinemaNameTt: 'Cinema name',
      cinemaNamePh: 'Input',
      cinemaAddressTt: 'Address',
      cinemaAddressPh: 'Input',
      remarkTt: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        cinemaNameRqMsg: 'Cinema name cannot be empty',
        cinemaAddressRqMsg: 'Cinema address cannot be empty'
      }
    },
    columns: {
      idLb: 'ID',
      cinemaNameLb: 'Cinema name',
      cinemaAddressLb: 'Address',
      createTimeLb: 'Create time',
      remarkLb: 'Remark',
      operateLb: 'Operator',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Save successfully',
      deleteSuccess: 'Delete successfully',
      deleteCf: 'Are you sure to delete cinema?'
    }
  },
  // Movie menu internationalization
  movieManagement: {
    searchInput: {
      titleLb: 'Title Movie',
      titlePh: 'Input'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete'
    },
    dialog: {
      addTt: 'Add Movie',
      editTt: 'Edit Movie',
      titleTt: 'Title Movie',
      titlePh: 'Input',
      movieDescriptionTt: 'Movie Description',
      movieDescriptionPh: 'Input',
      releaseDateTt: 'Release Date',
      releaseDatePh: 'Input',
      endDateTt: 'End Date',
      endDatePh: 'Input',
      durationTt: 'Duration',
      durationPh: 'Input',
      languageTt: 'Language',
      languagePh: 'Input',
      ratedTt: 'Rated',
      ratedPh: 'Input',
      genreTt: 'Genre',
      genrePh: 'Input',
      directorTt: 'Director',
      directorPh: 'Input',
      actorTt: 'Actor',
      actorPh: 'Input',
      ratingTt: 'Rating',
      ratingPh: 'Input',
      posterUrlTt: 'Poster',
      posterUrlPh: 'Input',
      trailerUrlTt: 'Trailer',
      trailerUrlPh: 'Input',
      remarkTt: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        titleRqMsg: 'Title movie cannot be empty'
      }
    },
    columns: {
      idLb: 'ID',
      titleLb: 'Title Movie',
      movieDescriptionLb: 'Movie Description',
      releaseDateLb: 'Release Date',
      endDateLb: 'End Date',
      durationLb: 'Duration',
      languageLb: 'Language',
      ratedLb: 'Rated',
      genreLb: 'Genre',
      directorLb: 'Director',
      actorLb: 'Actor',
      ratingLb: 'Rating',
      posterUrlLb: 'Poster',
      trailerUrlLb: 'Trailer',
      createTimeLb: 'Create Time',
      remarkLb: 'Remark',
      operateLb: 'Operator',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Save successfully',
      deleteSuccess: 'Delete successfully',
      deleteCf: 'Are you sure to delete movie?'
    }
  },
  // Promotion menu internationalization
  promotionManagement: {
    searchInput: {
      titleLb: 'Promotion Title',
      titlePh: 'Input'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete'
    },
    dialog: {
      addTt: 'Add Promotion',
      editTt: 'Edit Promotion',
      titleTt: 'Promotion Title',
      titlePh: 'Input',
      promotionDescriptionTt: 'Promotion Description',
      promotionDescriptionPh: 'Input',
      discountTt: 'Discount (%)',
      discountPh: 'Input',
      imageUrlTt: 'Image URL',
      imageUrlPh: 'Input',
      fromDateTt: 'From Date',
      fromDatePh: 'Input',
      toDateeTt: 'To Date',
      toDatePh: 'Input',
      remarkTt: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        titleRqMsg: 'Promotion Title cannot be empty'
      }
    },
    columns: {
      idLb: 'ID',
      titleLb: 'Promotion Title',
      promotionDescriptionLb: 'Promotion Description',
      discountLb: 'Discount (%)',
      imageUrlLb: 'Image URL',
      fromDateLb: 'From Date',
      toDateLb: 'To Date',
      createTimeLb: 'Create Time',
      remarkLb: 'Remark',
      operateLb: 'Operator',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Save successfully',
      deleteSuccess: 'Delete successfully',
      deleteCf: 'Are you sure to delete promotion?'
    }
  },
  // Slide menu internationalization
  slideManagement: {
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete'
    },
    dialog: {
      addTt: 'Add slide',
      editTt: 'Edit slide',
      slideUrlTt: 'Slide URL',
      slideUrlPh: 'Input',
      remarkTt: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        slideRqMsg: 'Slide URL cannot be empty'
      }
    },
    columns: {
      idLb: 'ID',
      slideUrlLb: 'Slide URL',
      createTimeLb: 'Create Time',
      remarkLb: 'Remark',
      operateLb: 'Operator',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Save successfully',
      deleteSuccess: 'Delete successfully',
      deleteCf: 'Are you sure to delete slide?'
    }
  },
  // Account menu internationalization
  account: {
    searchInput: {
      nickNameLb: 'Nick Name',
      nickNamePh: 'Input'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete'
    },
    dialog: {
      addTt: 'Add account',
      editTt: 'Edit account',
      userNameTt: 'User Name',
      userNamePh: 'Input',
      nickNameTt: 'Nick Name',
      nickNamePh: 'Input',
      customerTypeTt: 'Customer Type',
      customerTypePh: 'Input',
      emailTt: 'Emaik',
      emailPh: 'Input',
      phonenumberTt: 'Phonenumber',
      phonenumberPh: 'Input',
      sexTt: 'Sex',
      sexPh: 'Input',
      avatarTt: 'Avatar',
      avatarPh: 'Input',
      passwordTt: 'Password',
      passwordPh: 'Input',
      statusTt: 'Status',
      statusPh: 'Input',
      remarkTt: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save'
    },
    columns: {
      userIdLb: 'ID',
      userNameLb: 'User Name',
      nickNameLb: 'Nick Name',
      customerTypeLb: 'Customer Type',
      emailLb: 'Email',
      phonenumberLb: 'PhoneNumber', 
      sexLb: 'Sex',
      avatarLb: 'Avatar',
      passwordLb: 'Password',
      statusLb: 'Status',
      remarkLb: 'Remark',
      operateLb: 'Operator',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Save successfully',
      deleteSuccess: 'Delete successfully',
      deleteCf: 'Are you sure to delete account?'
    }
  },
  // Seat type menu internationalization
  seatTypeManagement: {
    searchInput: {
      seatTypeNameLb: 'Seat type name',
      seatTypeNamePh: 'Input'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete'
    },
    dialog: {
      addTt: 'Add seat type',
      editTt: 'Edit seat type information',
      seatTypeNameTt: 'Seat type name',
      seatTypeNamePh: 'Input',
      priceTt: 'Unit price (VND)',
      pricePh: 'Input',
      remarkTt: 'Remark',
      remarkPh: 'Input',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save',
      rules: {
        seatTypeNameRqMsg: 'Seat type name cannot be empty',
        priceRqMsg: 'Unit price cannot be empty',
      }
    },
    columns: {
      idLb: 'ID',
      seatTypeNameLb: 'Seat type name',
      priceLb: 'Unit price (VND)',
      createTimeLb: 'Create time',
      remarkLb: 'Remark',
      operateLb: 'Operate',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Edit successfully',
      deleteSuccess: 'Delete successfully',
      deleteCf: 'Are you sure to delete seat type?'
    }
  },
  // Hall menu internationalization
  hallManagement: {
    searchInput: {
      hallNameLb: 'Hall name',
      hallNamePh: 'Input',
      cinemaIdLb: 'Cinema',
      cinemaIdPh: 'Select',
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete'
    },
    columns: {
      hallNameLb: 'Hall name',
      cinemaNameLb: 'Cinema',
      rowNumberLb: 'Seat quantity row',
      createTimeLb: 'Create time',
      remarkLb: 'Remark',
      operateLb: 'Operate',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    hallSeatColumns: {
      rowCodeLb: 'Row code',
      rowSeatNumberLb: 'Seat number',
      seatTypeIdLb: 'Seat type',
      remarkLb: 'Remark',
      operateLb: 'Operate',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Edit successfully',
      deleteSuccess: 'Delete successfully',
      deleteCf: 'Are you sure to delete hall?'
    }
  },
  // Showtime menu internationalization
  showtime: {
    searchInput: {
      movieNameLb: 'Movie name',
      movieNamePh: 'Select',
      cinemaNameLb: 'Cinema name',
      cinemaNamePh: 'Select',
      hallNameLb: 'Hall name',
      hallNamePh: 'Select',
      releaseDateLb: 'Start time',
      startTimePh: 'From',
      endTimePh: 'To'
    },
    headerButtonLeft: {
      releaseShowtimeTt: 'Release showtime'
    },
    headerButtonRight: {
      editTt: 'Edit'
    },
    dialog: {
      editSingleTt: 'Update showtime',
      editMultiTt: 'Update showtime',
      startTimeLb: 'Start time',
      startTimePh: 'Select',
      endTimeLb: 'End time',
      endTimePh: 'Select',
      remarkLb: 'Remark',
      remarkPh: 'Nhập',
      footerCancelTt: 'Close',
      footerSubmitTt: 'Save'
    },
    showtimeColumns: {
      movieNameLb: 'Movie name',
      cinemaNameLb: 'Cinema name',
      hallNameLb: 'Hall name',
      startTimeLb: 'Start time',
      endTimeLb: 'End time'
    },
    seatColumns: {
      iconStatusLb: 'Status',
      rowCodeLb: 'Row code',
      columnCodeLb: 'Column code',
      seatTypeNameLb: 'Seat type',
      priceLb: 'Price (VND)'
    },
    operationMsg: {
      submitSuccess: 'Update showtime successfully'
    },
    release: {
      movieNameLb: 'Movie name',
      cinemaNameLb: 'Cinema name',
      hallNameLb: 'Hall name',
      startTimeLb: 'Start time',
      releaseOffical: 'Release',
      closeBtn: 'Close',
      releaseCf: 'Confirm release showtime?',
      releaseSuccess: 'Release showtime successfully'
    }
  },
  // Ticket menu internationalization
  ticketManagement: {
    searchInput: {
      cinemaIdLb: 'Cinema',
      cinemaIdPh: 'Select'
    },
    headerButton: {
      addTt: 'Add',
      editTt: 'Edit',
      deleteTt: 'Delete'
    },
    columns: {
      nickNameLb: 'Full Name',
      cinemaNameLb: 'Cinema',
      numTicketLb: 'Number of tickets',
      totalPriceLb: 'Total price',
      promotionIdLb: 'Promotion',
      movieNameLb: 'Movie Name',
      createTimeLb: 'Create time',
      operateLb: 'Operate',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    bookingDetailColumns: {
      rowCodeLb: 'Row Code',
      columnCodeLb: 'Column Code',
      operateLb: 'Operate',
      editLb: 'Edit',
      deleteLb: 'Delete'
    },
    operationMsg: {
      submitSuccess: 'Edit successfully',
      deleteSuccess: 'Delete successfully',
      deleteCf: 'Are you sure to delete booking?'
    }
  },
};

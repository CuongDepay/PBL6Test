<template>
  <div class="p-2">
    <transition :enter-active-class="proxy?.animate.searchAnimate.enter" :leave-active-class="proxy?.animate.searchAnimate.leave">
      <div class="search" v-show="showSearch">
        <el-form :model="queryParams" ref="queryFormRef" :inline="true" label-width="68px">
          <el-form-item label="Tenant ID" prop="tenantId">
            <el-input v-model="queryParams.tenantId" placeholder="Please enter the tenant id" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="Contact user" prop="contactUserName">
            <el-input v-model="queryParams.contactUserName" placeholder="Please enter contact user" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="Phone number" prop="contactPhone">
            <el-input v-model="queryParams.contactPhone" placeholder="Please type your phone number" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item label="Company name" prop="companyName">
            <el-input v-model="queryParams.companyName" placeholder="Please enter the company name" clearable @keyup.enter="handleQuery" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="Search" @click="handleQuery">Search</el-button>
            <el-button icon="Refresh" @click="resetQuery">Reset</el-button>
          </el-form-item>
        </el-form>
      </div>
    </transition>

    <el-card shadow="never">
      <template #header>
        <el-row :gutter="10" class="mb8">
          <el-col :span="1.5">
            <el-button type="primary" plain icon="Plus" @click="handleAdd" v-hasPermi="['system:tenant:add']">Add</el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="success" plain icon="Edit" :disabled="single" @click="handleUpdate()" v-hasPermi="['system:tenant:edit']"
              >Edit</el-button
            >
          </el-col>
          <el-col :span="1.5">
            <el-button type="danger" plain icon="Delete" :disabled="multiple" @click="handleDelete()" v-hasPermi="['system:tenant:remove']">
              Delete
            </el-button>
          </el-col>
          <el-col :span="1.5">
            <el-button type="warning" plain icon="Download" @click="handleExport" v-hasPermi="['system:tenant:export']">Export</el-button>
          </el-col>
          <right-toolbar v-model:showSearch="showSearch" @queryTable="getList"></right-toolbar>
        </el-row>
      </template>

      <el-table v-loading="loading" :data="tenantList" @selection-change="handleSelectionChange">
        <el-table-column type="selection" width="55" align="center" />
        <el-table-column label="id" align="center" prop="id" v-if="false" />
        <el-table-column label="Tenant ID" align="center" prop="tenantId" />
        <el-table-column label="Contact" align="center" prop="contactUserName" />
        <el-table-column label="Phone number" align="center" prop="contactPhone" />
        <el-table-column label="Company name" align="center" prop="companyName" />
        <el-table-column label="License number" align="center" prop="licenseNumber" />
        <el-table-column label="Expire time" align="center" prop="expireTime" width="180">
          <template #default="scope">
            <span>{{ parseTime(scope.row.expireTime, '{y}-{m}-{d}') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="Status" align="center" prop="status">
          <template #default="scope">
            <el-switch v-model="scope.row.status" active-value="0" inactive-value="1" @change="handleStatusChange(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="Operate" align="center" class-name="small-padding fixed-width">
          <template #default="scope">
            <el-tooltip content="Edit" placement="top">
              <el-button link type="primary" icon="Edit" @click="handleUpdate(scope.row)" v-hasPermi="['system:tenant:edit']"></el-button>
            </el-tooltip>
            <el-tooltip content="Sync tenant package" placement="top">
              <el-button link type="primary" icon="Refresh" @click="handleSyncTenantPackage(scope.row)" v-hasPermi="['system:tenant:edit']">
              </el-button>
            </el-tooltip>
            <el-tooltip content="Delete" placement="top">
              <el-button link type="primary" icon="Delete" @click="handleDelete(scope.row)" v-hasPermi="['system:tenant:remove']"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>

      <pagination v-show="total>0" :total="total" v-model:page="queryParams.pageNum" v-model:limit="queryParams.pageSize" @pagination="getList" />
    </el-card>
    <!-- Add or modify tenant dialog -->
    <el-dialog :title="dialog.title" v-model="dialog.visible" width="500px" append-to-body>
      <el-form ref="tenantFormRef" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="Company name" prop="companyName">
          <el-input v-model="form.companyName" placeholder="Please enter the company name" />
        </el-form-item>
        <el-form-item label="Contact" prop="contactUserName">
          <el-input v-model="form.contactUserName" placeholder="Please enter contact user" />
        </el-form-item>
        <el-form-item label="Phone number" prop="contactPhone">
          <el-input v-model="form.contactPhone" placeholder="Please type your phone number" />
        </el-form-item>
        <el-form-item v-if="!form.id" label="Username" prop="username">
          <el-input v-model="form.username" placeholder="Please enter username" maxlength="30" />
        </el-form-item>
        <el-form-item v-if="!form.id" label="Password" prop="password">
          <el-input type="password" v-model="form.password" placeholder="Please enter password" maxlength="20" />
        </el-form-item>
        <el-form-item label="Tenant package" prop="packageId">
          <el-select v-model="form.packageId" :disabled="!!form.tenantId" placeholder="Please select tenant package" clearable style="width: 100%">
            <el-option v-for="item in packageList" :key="item.packageId" :label="item.packageName" :value="item.packageId" />
          </el-select>
        </el-form-item>
        <el-form-item label="Expire time" prop="expireTime">
          <el-date-picker
            clearable
            v-model="form.expireTime"
            type="datetime"
            value-format="YYYY-MM-DD HH:mm:ss"
            placeholder="Please select an expiration time"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item label="Amount of users" prop="accountCount">
          <el-input v-model="form.accountCount" placeholder="Please enter the number of users" />
        </el-form-item>
        <el-form-item label="Bind domain name" prop="domain">
          <el-input v-model="form.domain" placeholder="Please enter the bind domain name" />
        </el-form-item>
        <el-form-item label="Company address" prop="address">
          <el-input v-model="form.address" placeholder="Please enter business address" />
        </el-form-item>
        <el-form-item label="License number" prop="licenseNumber">
          <el-input v-model="form.licenseNumber" placeholder="Please enter license number" />
        </el-form-item>
        <el-form-item label="Company profile" prop="intro">
          <el-input type="textarea" v-model="form.intro" placeholder="Please enter company profile" />
        </el-form-item>
        <el-form-item label="Remark" prop="remark">
          <el-input v-model="form.remark" placeholder="Please enter a note" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button :loading="buttonLoading" type="primary" @click="submitForm">OK</el-button>
          <el-button @click="cancel">Cancel</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup name="Tenant" lang="ts">
import { listTenant, getTenant, delTenant, addTenant, updateTenant, changeTenantStatus, syncTenantPackage } from '@/api/system/tenant';
import { selectTenantPackage } from '@/api/system/tenantPackage';
import { TenantForm, TenantQuery, TenantVO } from '@/api/system/tenant/types';
import { TenantPkgVO } from '@/api/system/tenantPackage/types';
import { ComponentInternalInstance } from 'vue';
import { ElForm } from 'element-plus';

const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const tenantList = ref<TenantVO[]>([]);
const packageList = ref<TenantPkgVO[]>([]);
const buttonLoading = ref(false);
const loading = ref(true);
const showSearch = ref(true);
const ids = ref<Array<string | number>>([]);
const single = ref(true);
const multiple = ref(true);
const total = ref(0);

const queryFormRef = ref(ElForm);
const tenantFormRef = ref(ElForm);

const dialog = reactive<DialogOption>({
    visible: false,
    title: '',
    width: '500px'
});

const initFormData: TenantForm = {
    id: undefined,
    tenantId: undefined,
    contactUserName: '',
    contactPhone: '',
    username: '',
    password: '',
    companyName: '',
    licenseNumber: '',
    domain: '',
    address: '',
    intro: '',
    remark: '',
    packageId: '',
    expireTime: '',
    accountCount: 0,
    status: '0',
}
// eslint-disable-next-line no-undef
const data = reactive<PageData<TenantForm, TenantQuery>>({
    form: {...initFormData},
    queryParams: {
        pageNum: 1,
        pageSize: 20,
        tenantId: '',
        contactUserName: '',
        contactPhone: '',
        companyName: '',
        orderByColumn: '',
        isAsc: ''
    },
    rules: {
        id: [{ required: true, message: "ID cannot be empty", trigger: "blur" }],
        tenantId: [{ required: true, message: "Tenant id cannot be empty", trigger: "blur" }],
        contactUserName: [{ required: true, message: "Contact user cannot be empty", trigger: "blur" }],
        contactPhone: [{ required: true, message: "Phone number could not be empty", trigger: "blur" }],
        companyName: [{ required: true, message: "Company name cannot be empty", trigger: "blur" }],
        username: [
            { required: true, message: "Username can not be empty", trigger: "blur" },
            { min: 2, max: 20, message: 'Username length must be between 2 and 20', trigger: 'blur' }
        ],
        password: [
            { required: true, message: "Password can not be blank", trigger: "blur" },
            { min: 5, max: 20, message: 'User password length must be between 5 and 20', trigger: 'blur' }
        ]
    }
});

const { queryParams, form, rules } = toRefs(data);

/** Query all tenant packages */
const getTenantPackage = async () => {
    const res = await selectTenantPackage()
    packageList.value = res.data;
}

/** Query the list of tenants */
const getList = async () => {
    loading.value = true;
    const res = await listTenant(queryParams.value);
    tenantList.value = res.rows;
    total.value = res.total;
    loading.value = false;
}

// Tenant Package Status Modification
const handleStatusChange = async (row: TenantVO) => {
    let text = row.status === "0" ? "Enable" : "Disable";
    try {
        await proxy?.$modal.confirm('Are you sure you want "' + text + '" "' + row.companyName + '" tenant? ');
        await changeTenantStatus(row.id, row.tenantId, row.status);
        proxy?.$modal.msgSuccess(text + " success");
    } catch {
        row.status = row.status === "0" ? "1" : "0";
    }
}

// Cancel button
const cancel = () => {
    reset();
    dialog.visible = false;
}

// Form reset
const reset = () => {
    form.value = {...initFormData};
    tenantFormRef.value.resetFields();
}

/** Search button action */
const handleQuery = () => {
    queryParams.value.pageNum = 1;
    getList();
}

/** Reset button action */
const resetQuery = () => {
    queryFormRef.value.resetFields();
    handleQuery();
}

// Multiple selection box select data
const handleSelectionChange = (selection: TenantVO[]) => {
    ids.value = selection.map(item => item.id);
    single.value = selection.length != 1;
    multiple.value = !selection.length;
}

/** Add button action */
const handleAdd = () => {
    dialog.visible = true;
    dialog.title = "Add tenant";
    nextTick(() => {
        reset();
        getTenantPackage();
    })
}

/** Edit button action */
const handleUpdate = (row?: TenantVO) => {
    loading.value = true;
    dialog.visible = true;
    dialog.title = "Edit tenant";
    nextTick(async () => {
        reset();
        getTenantPackage();
        const _id = row?.id || ids.value[0];
        const res = await getTenant(_id);
        loading.value = false;
        Object.assign(form.value, res.data)
    })
}

/** Submit button */
const submitForm = () => {
    tenantFormRef.value.validate(async (valid: boolean) => {
        if (valid) {
            buttonLoading.value = true;
            if (form.value.id) {
                await updateTenant(form.value).finally(() => buttonLoading.value = false);
            } else {
                await addTenant(form.value).finally(() => buttonLoading.value = false);
            }
            proxy?.$modal.msgSuccess("Successful operation");
            dialog.visible = false;
            getList();
        }
    });
}

/** Delete button action */
const handleDelete = async (row?: TenantVO) => {
    const _ids = row?.id || ids.value;
    await proxy?.$modal.confirm('Are you sure to delete the data item tenant id "' + _ids + '"? ')
    loading.value = true;
    await delTenant(_ids).finally(() => loading.value = false);
    getList();
    proxy?.$modal.msgSuccess("Deleted successfully");


}

/** Synchronize tenant package button action */
const handleSyncTenantPackage = async (row: TenantVO) => {
    try {
        await proxy?.$modal.confirm('Are you sure to synchronize the data item tenant id "' + row.tenantId + '"? ');
        loading.value = true;
        await syncTenantPackage(row.tenantId, row.packageId);
        getList();
        proxy?.$modal.msgSuccess("Synchronied successfully");
    } catch {return} finally {
        loading.value = false;
    }
}

/** Export button action */
const handleExport = () => {
    proxy?.download('system/tenant/export', {
        ...queryParams.value
    }, `tenant_${new Date().getTime()}.xlsx`)
}

onMounted(() => {
    getList();
})
</script>

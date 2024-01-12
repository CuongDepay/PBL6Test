<template>
  <div class="top-right-btn" :style="style">
    <el-row>
      <el-tooltip class="item" effect="dark" :content="showSearch ? 'Hide search' : 'Show search'" placement="top" v-if="search">
        <el-button circle icon="Search" @click="toggleSearch()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Refresh" placement="top">
        <el-button circle icon="Refresh" @click="refresh()" />
      </el-tooltip>
      <el-tooltip class="item" effect="dark" content="Visible column" placement="top" v-if="columns">
        <el-button circle icon="Menu" @click="showColumn()" />
      </el-tooltip>
    </el-row>
    <el-dialog :title="title" v-model="open" append-to-body>
      <el-transfer :titles="['Show', 'Hide']" v-model="value" :data="columns" @change="dataChange"></el-transfer>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { TransferKey } from "element-plus";
import { PropType } from "vue";

const props = defineProps({
    showSearch: {
        type: Boolean,
        default: true,
    },
    columns: {
        // eslint-disable-next-line no-undef
        type: Array as PropType<FieldOption[]>,
    },
    search: {
        type: Boolean,
        default: true,
    },
    gutter: {
        type: Number,
        default: 10,
    },
})

const emits = defineEmits(['update:showSearch', 'queryTable']);

// explicit data
const value = ref<Array<number>>([]);
// popup title
const title = ref("Show/Hide");
// Whether to display the popup layer
const open = ref(false);

const style = computed(() => {
    const ret: any = {};
    if (props.gutter) {
        ret.marginRight = `${props.gutter / 2}px`;
    }
    return ret;
});

// search
function toggleSearch() {
    emits("update:showSearch", !props.showSearch);
}

// Refresh
function refresh() {
    emits("queryTable");
}

// The right list element changes
function dataChange(data: TransferKey[]) {
    props.columns?.forEach((item) => {
        item.visible = !data.includes(item.key);
    })
}

// Open the hidden column dialog
const showColumn = () => {
    open.value = true;
}

// Show or hide columns Initially hide columns by default
onMounted(() => {
    props.columns?.forEach((item) => {
        if (!item.visible) {
            value.value.push(item.key);
        }
    })
})
</script>

<style lang="scss" scoped>
:deep(.el-transfer__button) {
  border-radius: 50%;
  display: block;
  margin-left: 0px;
}
:deep(.el-transfer__button:first-child) {
  margin-bottom: 10px;
}

.my-el-transfer {
  text-align: center;
}
</style>

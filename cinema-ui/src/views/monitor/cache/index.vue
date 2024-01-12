<template>
  <div class="cache-monitor">
    <div class="cache-container">
      <div class="title">{{ $t('cacheMonitor.basicTt') }}</div>
      <div class="content">
        <table style="width: 100%;">
          <tbody>
            <tr>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.redisVersion') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.info">{{ cache.info.redis_version }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.oprMode') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.info">{{ cache.info.redis_mode === "standalone" ? "Standalone" : "Cluster" }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.port') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.info">{{ cache.info.tcp_port }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.clients') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.info">{{ cache.info.connected_clients }}</div>
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.runningTime') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.info">{{ cache.info.uptime_in_days }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.usedMemory') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.info">{{ cache.info.used_memory_human }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.usedCpu') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.info">{{ parseFloat(cache.info.used_cpu_user_children).toFixed(2) }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.memoryConf') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.info">{{ cache.info.maxmemory_human }}</div>
              </td>
            </tr>
            <tr>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.aof') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.info">{{ cache.info.aof_enabled === "0" ? "No" : "Yes" }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.rdb') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.info">{{ cache.info.rdb_last_bgsave_status }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.keys') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.dbSize">{{ cache.dbSize }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell">{{ $t('cacheMonitor.network') }}</div>
              </td>
              <td style="border: 1px solid #E5E7EB; padding: 8px;">
                <div class="cell" v-if="cache.info">{{ cache.info.instantaneous_input_kbps }}kps/{{ cache.info.instantaneous_output_kbps }}kps</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <el-row>
      <el-col :span="12">
        <div class="cache-container" style="margin-right: 12px;">
          <div class="title">{{ $t('cacheMonitor.commandStatsTt') }}</div>
          <div class="content">
            <div class="el-table el-table--enable-row-hover el-table--medium">
              <div ref="commandstats" style="height: 420px" />
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="cache-container" style="margin-left: 12px;">
          <div class="title">{{ $t('cacheMonitor.memoryTt') }}</div>
          <div class="content">
            <div class="el-table el-table--enable-row-hover el-table--medium">
              <div ref="usedmemory" style="height: 420px" />
            </div>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Cache" lang="ts">
import { getCache } from '@/api/monitor/cache';
import * as echarts from 'echarts';
import { ComponentInternalInstance } from "vue";

const cache = ref<any>({});
const commandstats = ref();
const usedmemory = ref();
const { proxy } = getCurrentInstance() as ComponentInternalInstance;

const getList = async () => {
  proxy?.$modal.loading("Loading cache monitoring data, please wait!");
  const res = await getCache();
  proxy?.$modal.closeLoading();
  cache.value = res.data;
  const commandstatsIntance = echarts.init(commandstats.value, "macarons");
  commandstatsIntance.setOption({
    tooltip: {
      trigger: "item",
      formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    series: [
      {
        name: "Order",
        type: "pie",
        roseType: "radius",
        radius: [15, 95],
        center: ["50%", "38%"],
        data: res.data.commandStats,
        animationEasing: "cubicInOut",
        animationDuration: 1000
      }
    ]
  });

  const usedmemoryInstance = echarts.init(usedmemory.value, "macarons");
  usedmemoryInstance.setOption({
    tooltip: {
      formatter: "{b} <br/>{a} : " + cache.value.info.used_memory_human
    },
    series: [
      {
        name: "Peak",
        type: "gauge",
        min: 0,
        max: 1000,
        detail: {
          formatter: cache.value.info.used_memory_human
        },
        data: [
          {
            value: parseFloat(cache.value.info.used_memory_human),
            name: "Memory consumption"
          }
        ]
      }
    ]
  })
}

onMounted(() => {
  getList();
})
</script>
<style lang="scss" scoped>
@import "@/assets/styles/variables.module.scss";
.cache-monitor {
  background: $gray-100;
  height: calc(100vh - $base-header-height - 41px);
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 24px;

  .cache-container {
    border: 1px solid $gray-200;
    background: $gray-0;
    box-shadow: 2px 0px 10px -2px rgba(17, 25, 39, 0.04), 0px 2px 10px 2px rgba(17, 25, 39, 0.04);
    padding: 12px 24px;
    width: 100% ;
    display: flex;
    flex-direction: column;
    gap: 9px;
    .title {
      color: $gray-700;
      font-size: 18px;
      font-style: normal;
      font-weight: 600;
      line-height: 24px; /* 133.333% */
    }
    .content {
      width: 100%;
    }
  }
}
</style>

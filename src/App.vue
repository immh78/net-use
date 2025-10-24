<script setup>
import { ref, onMounted } from 'vue';

const monthCircular = ref(0);
const monthLabel = ref("");

const todayCircular = ref(0);
const todayUseLabel = ref("");
const todayTotalLabel = ref("");

const timeNow = ref("");
const isLoading = ref(false);

// 한 달 총 데이터 용량 (GB)
const totalData = 15;




function getNow() {
  isLoading.value = true;
  const now = new Date();
  timeNow.value = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });

  // 현재 월의 총 일 수 계산
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  // 하루에 사용할 수 있는 데이터 계산
  const dailyData = totalData / daysInMonth;

  // 현재까지 경과한 시간 계산 (일 단위)
  const elapsedDays = now.getDate() - 1; // 오늘은 포함하지 않음
  const elapsedHours = now.getHours() / 24; // 시간 비율
  const elapsedTime = elapsedDays + elapsedHours;

  // 현재까지 사용할 수 있는 데이터 계산
  const availableData = (elapsedTime / daysInMonth) * totalData;

  // 오늘 현재 시간까지 사용할 수 있는 데이터 계산
  const todayAvailableData = (now.getHours() / 24) * dailyData; // 오늘 경과한 시간 비율


  monthCircular.value = ((totalData - availableData) / totalData) * 100;
  monthLabel.value = (totalData - availableData).toFixed(1);
  todayCircular.value = ((dailyData - todayAvailableData) / dailyData) * 100;
  todayUseLabel.value = (todayAvailableData * 1024).toFixed(0);
  todayTotalLabel.value = (dailyData * 1024).toFixed(0);

  setTimeout(() => {
    isLoading.value = false;
  }, 1000);

};

onMounted(() => {
  getNow();
});



</script>

<template>
  <div class="center-container bg-grey-darken-1">
    <v-sheet :height="140" :width="140" rounded="xl" class="pa-2 d-flex flex-column justify-space-between">
      <span class="monthUse mt-2">{{ monthLabel }} GB</span>

      <v-progress-linear :model-value="monthCircular" height="14" color="primary" rounded />

      <div class="d-flex justify-end" style="font-size: 12px; color: darkgrey;">
        <template v-if="isLoading">
          <v-progress-circular class="mr-4 mb-2" indeterminate size="14" width="1" />
        </template>
        <template v-else>
          <span class="mr-2 mb-1" @click="getNow()">{{ timeNow }}</span>
        </template>

      </div>
    </v-sheet>


    <v-sheet :height="140" :width="140" rounded="xl" class="mt-6 pa-2 d-flex flex-column">
      <span class="todayUse mt-2">{{ todayUseLabel }} MB</span>
      <span class="todayTotal">/ {{ todayTotalLabel }} MB</span>

      <v-progress-linear class="mt-3" :model-value="todayCircular" height="14" color="teal" rounded />

    </v-sheet>
  </div>
</template>

<style scoped>
.icon-wrapper {

  display: inline-flex;
}

.monthUse {
  font-size: 24px;
  display: block;
}

.todayUse {
  font-size: 24px;
  display: block;
}

.todayTotal {
  font-size: 14px;
  display: block;
}

.center-container {
  display: flex;
  flex-direction: column;
  /* 세로 정렬 */
  justify-content: center;
  /* 수평 중앙 정렬 */
  align-items: center;
  /* 수직 중앙 정렬 */
  height: 100vh;
  /* 화면 전체 높이 */
}
</style>

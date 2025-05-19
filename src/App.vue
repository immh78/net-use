<script setup>
import { ref, computed } from 'vue';

// 한 달 총 데이터 용량 (GB)
const totalData = 11;

// 현재 날짜와 시간
const now = new Date();

// 현재 월의 총 일 수 계산
const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

// 하루에 사용할 수 있는 데이터 계산
const dailyData = totalData / daysInMonth;

// 현재까지 경과한 시간 계산 (일 단위)
const elapsedDays = now.getDate() - 1; // 오늘은 포함하지 않음
const elapsedHours = now.getHours() / 24; // 시간 비율
const elapsedTime = elapsedDays + elapsedHours;

// 현재까지 사용할 수 있는 데이터 계산
const availableData = computed(() => (elapsedTime / daysInMonth) * totalData);

// 오늘 현재 시간까지 사용할 수 있는 데이터 계산
const todayAvailableData = computed(() => {
  const todayElapsedHours = now.getHours() / 24; // 오늘 경과한 시간 비율
  return todayElapsedHours * dailyData;
});
</script>

<template>
  <div class="center-container">
    <v-progress-circular :model-value="((totalData - availableData) / totalData) * 100" :rotate="360" :size="100"
      :width="15" color="primary">
      {{ totalData - availableData.toFixed(1) }} GB</v-progress-circular><p></p>

    <v-progress-circular :model-value="((dailyData - todayAvailableData) / dailyData) * 100" :rotate="360" :size="80"
      :width="10" color="teal">
      <div>
        <span class="todayUse">{{ (todayAvailableData * 1024).toFixed(0) }} MB</span>
        <span class="todayTotal">/ {{ (dailyData * 1024).toFixed(0) }} MB</span>
      </div>
    </v-progress-circular>
  </div>
</template>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}

.todayUse {
  font-size: 14px;
  display: block;
}

.todayTotal {
  font-size: 12px;
  display: block;
}

.center-container {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이 */
}
</style>

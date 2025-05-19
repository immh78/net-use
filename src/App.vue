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

function closePage() {
  window.close(); // 브라우저 창 닫기
};

</script>

<template>
  <div class="center-container">
    <div class="current-time">
      <v-chip color="primary">{{ new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }) }}</v-chip>
    </div>

    <v-progress-circular :model-value="((totalData - availableData) / totalData) * 100" :rotate="360" :size="200"
      :width="20" color="primary">
      <span class="monthUse">{{ totalData - availableData.toFixed(1) }} GB</span></v-progress-circular><p></p>

    <v-progress-circular :model-value="((dailyData - todayAvailableData) / dailyData) * 100" :rotate="360" :size="120"
      :width="14" color="teal">
      <div>
        <span class="todayUse">{{ (todayAvailableData * 1024).toFixed(0) }} MB</span>
        <span class="todayTotal">/ {{ (dailyData * 1024).toFixed(0) }} MB</span>
      </div>
    </v-progress-circular>

    <v-btn color="secondary" class="close-button" @click="closePage()">닫기</v-btn>
  </div>
</template>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}

.monthUse {
  font-size: 40px;
  display: block;
}

.todayUse {
  font-size: 20px;
  display: block;
}

.todayTotal {
  font-size: 14px;
  display: block;
}

.center-container {
  display: flex;
  flex-direction: column; /* 세로 정렬 */
  justify-content: center; /* 수평 중앙 정렬 */
  align-items: center; /* 수직 중앙 정렬 */
  height: 100vh; /* 화면 전체 높이 */
}

.close-button {
  align-self: center; /* 버튼을 중앙 정렬 */
  margin-top: auto; /* 위쪽 공간을 자동으로 채워 버튼을 아래로 밀기 */
  padding: 0.5rem 1rem;
}

</style>

<template>
  <LineChart v-bind="lineChartProps" />
</template>

<script setup lang="ts">
import { onMounted, computed, ref } from "vue";
import { useWeatherApi } from "../stores/weather-api-store";
import { LineChart, useLineChart } from "vue-chart-3";
import { Chart, ChartData, ChartOptions, registerables } from "chart.js";
Chart.register(...registerables);
const WeatherStore = useWeatherApi();

const getWeatherData = async () => {
  navigator.geolocation.getCurrentPosition(function (position) {
    const payload = {
      latitude: position.coords.latitude.toFixed(2),
      longitude: position.coords.longitude.toFixed(2),
    };
    WeatherStore.getCurrentWeather(payload);
  });
};

const hourlyData = WeatherStore.data.hourly
const getData = computed<ChartData<"line">>(() => ({
  // labels: hourlyData,
  labels: [0, 1 , 2, 3, 4, 5, 6, 7],
  datasets: [
    {
      label: "Precipitation",
      // data: hourlyData.precipitation,
      data: [4, 5 ,1, 7, 8,1, 9],
      fill: false,
      borderColor: "#4bc0c0",
    },
  ],
}));

const options = computed<ChartOptions<"line">>(() => ({
  plugins: {
    legend: {
      display: false,
    },
  },
}));

const { lineChartProps } = useLineChart({
  options,
  chartData: getData,
});


onMounted(() => {
  getWeatherData();
});
</script>

<style scoped lang="scss"></style>

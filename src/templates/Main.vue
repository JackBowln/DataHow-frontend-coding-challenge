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
const data = ref()
const getData = computed<ChartData<"line">>(() => ({
  labels: hourlyData.time,
  datasets: [
    {
      label: "Precipitation",
      data: hourlyData.precipitation,
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

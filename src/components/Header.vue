<template>
  <v-app-bar id="header">
    <v-row>
      <img src="@/assets/logo.png" class="image"/>
    </v-row>
  </v-app-bar>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
#header {
  padding-block: 15px;
  .image {
    max-height: 60px;
    margin-left: 10px;
  }
}
</style>

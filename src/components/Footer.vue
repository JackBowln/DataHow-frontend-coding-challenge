<template>
  <v-footer id="footer">
    <v-card
      elevation="0"
      rounded="0"
      width="100%"
      class="bg-grey text-center"
    >
      <v-card-text class="text-white">
        {{ new Date().getFullYear() }} — <strong>DataHow</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
<style lang="scss">
#footer {
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 0;
}  
</style>

<template>
    <v-app>
        <v-app-bar :elevation="0" class="transparent-header">
            <v-container class="d-flex align-center justify-space-between mb-4 mt-4">
                <!-- Логотип в левом углу -->
        <a href="/" class="d-flex align-center">
            <v-img src="@/assets/images/logo.svg" contain width="187"></v-img></a>
            </v-container>
        </v-app-bar>
        
        <v-main>
            <v-container>
              <NuxtPage />
            </v-container>
          </v-main>
    </v-app>
</template>
<script setup></script>
<style>
.transparent-header {
    background-color: transparent !important;
    color: white !important;
  }
</style>
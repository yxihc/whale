<template>
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>认识我们的团队</template>
      <template #lead>
        Vite 目前由一个国际化的团队开发和维护，
        下面是对一些团队成员的介绍。
      </template>
    </VPTeamPageTitle>
    <VPTeamMembers :members="core"/>
  </VPTeamPage>
</template>
<script setup lang="ts">
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'
import {core} from './../../../_data/team.js'
</script>



<template>
  <VPTeamPage>
    <VPTeamPageTitle>
      <template #title>认识我们的团队</template>
      <template #lead>
        Whale 目前由大前端的团队开发和维护， 下面是对一些团队成员的介绍。
      </template>
    </VPTeamPageTitle>
    <VPTeamMembers :members="core" />
  </VPTeamPage>
</template>
<script setup lang="ts">
import { VPTeamMembers, VPTeamPage, VPTeamPageTitle } from 'vitepress/theme'
import { core } from '../../../_data/team.js'
</script>

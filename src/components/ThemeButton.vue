<template>
	<v-btn large text icon color="primary" @click="switchTheme">
		<v-icon :class="IconClass">{{Icon}}</v-icon>
	</v-btn>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Get } from "vuex-pathify";
import { mdiMoonWaningCrescent, mdiWeatherSunny } from "@mdi/js";

@Component
export default class ThemeButton extends Vue {
  @Get("settings@isThemeDark") private isThemeDark!: boolean;

  switchTheme() {
    const isThemeDark = window.store.get("settings@isThemeDark");
    window.store.set("settings@isThemeDark", !isThemeDark);
  }
  get Icon() {
    if (this.isThemeDark) {
      return mdiMoonWaningCrescent;
    }
    return mdiWeatherSunny;
  }

  get IconClass() {
    if (this.isThemeDark) {
      return "rotate-315";
    }
    return "";
  }
}
</script>
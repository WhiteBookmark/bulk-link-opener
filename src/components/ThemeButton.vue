<template>
	<v-btn large text icon color="primary" @click="switchTheme">
		<v-icon :class="IconClass">{{Icon}}</v-icon>
	</v-btn>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Get } from "vuex-pathify";
import { mdiMoonWaningCrescent, mdiWeatherSunny } from "@mdi/js";
import { Sound } from "@/mixins/sound";

@Component
export default class ThemeButton extends Mixins<Sound>(Sound) {
  @Get("settings@isThemeDark") private isThemeDark!: boolean;

  switchTheme() {
    this.Switch();
    const isThemeDark = window.store.get("settings@isThemeDark");
    window.store.set("settings@isThemeDark", !isThemeDark);
    this.$globalEvent.$emit("open-snackbar", "info", "Theme Changed", false);
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
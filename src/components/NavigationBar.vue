<template>
	<v-app-bar app color="primary">
		<v-toolbar-title>
			<v-btn text @click="switchTheme" color="secondary">VueJS ❤️ 8base</v-btn>
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<v-btn large text color="accent">{{AuthButton}}</v-btn>
	</v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class NavigationBar extends Vue {
  get AuthButton() {
    return "Sign In";
  }

  switchTheme() {
    const isThemeDark = window.store.get("settings@isThemeDark");
    window.store.set("settings@isThemeDark", !isThemeDark);
  }
}
</script>

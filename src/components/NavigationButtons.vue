<template>
	<div>
		<v-btn
			v-for="navigation in navigations"
			:key="navigations.indexOf(navigation)"
			large
			tile
			text
			color="primary"
			exact
			:to="navigation.to"
			@click="Navigation()"
		>{{navigation.name}}</v-btn>
	</div>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Get } from "vuex-pathify";
import { Sound } from "@/mixins/sound";

@Component
export default class NavigationButtons extends Mixins<Sound>(Sound) {
  private navigationsList: Navigations[] = [
    {
      name: "Home",
      to: "/",
      requiresAuth: false
    },
    {
      name: "Settings",
      to: "/Settings",
      requiresAuth: true
    }
  ];
  get navigations() {
    if (!this.isAuthenticated) {
      return this.navigationsList.filter(
        navigation => !navigation.requiresAuth
      );
    }
    return this.navigationsList;
  }

  @Get("user@authenticated") private isAuthenticated!: boolean;
}
</script>
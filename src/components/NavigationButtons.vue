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
		>{{navigation.name}}</v-btn>
	</div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Get } from "vuex-pathify";

@Component
export default class NavigationButtons extends Vue {
  private navigationsList: navigations[] = [
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
<template>
	<v-app>
		<navigation-bar></navigation-bar>

		<v-content>
			<HelloWorld />
		</v-content>
	</v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Get } from "vuex-pathify";
import HelloWorld from "@/components/HelloWorld.vue";
import NavigationBar from "@/components/NavigationBar.vue";

@Component({
  components: {
    HelloWorld,
    NavigationBar
  }
})
export default class App extends Vue {
  @Get("settings@isThemeDark") private isThemeDark!: boolean;

  mounted() {
    this.$vuetify.theme.dark = this.isThemeDark;
  }

  @Watch("isThemeDark")
  onThemeSwitch(switchedValue: boolean) {
    this.$vuetify.theme.dark = switchedValue;
  }
}
</script>

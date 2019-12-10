<template>
	<v-app>
		<navigation-bar></navigation-bar>

		<v-content>
			<router-view></router-view>
		</v-content>

		<footer-bar></footer-bar>
	</v-app>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Get } from "vuex-pathify";
import NavigationBar from "@/components/NavigationBar.vue";
import FooterBar from "@/components/FooterBar.vue";

@Component({
  components: {
    NavigationBar,
    FooterBar
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

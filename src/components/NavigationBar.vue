<template>
	<v-app-bar app color="background">
		<v-toolbar-title>
			<v-btn text color="primary">Bulk Link Opener</v-btn>
		</v-toolbar-title>

		<v-spacer></v-spacer>

		<theme-button></theme-button>
		<navigation-buttons></navigation-buttons>
		<auth-button></auth-button>
	</v-app-bar>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import AuthButton from "@/components/AuthButton.vue";
import NavigationButtons from "@/components/NavigationButtons.vue";
import ThemeButton from "@/components/ThemeButton.vue";

@Component({
  components: {
    AuthButton,
    NavigationButtons,
    ThemeButton
  }
})
export default class NavigationBar extends Vue {}
</script>

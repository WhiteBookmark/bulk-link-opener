<template>
	<v-footer app color="background" class="primary--text">
		<p class="pa-0 my-auto">&copy; 2019 - Present</p>
		<v-spacer></v-spacer>
		<v-btn text href="https://github.com/WhiteBookmark/bulk-link-opener" target="_blank">
			<v-icon>{{Icons.mdiGithubBox}}</v-icon>Github
		</v-btn>
	</v-footer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiGithubBox } from "@mdi/js";

@Component
export default class FooterBar extends Vue {
  get Icons() {
    return {
      mdiGithubBox
    };
  }
}
</script>

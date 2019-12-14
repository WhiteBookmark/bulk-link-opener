<template>
	<v-footer app color="background" class="primary--text">
		<p class="pa-0 my-auto">&copy; 2019 - Present</p>
		<a href="https://www.8base.com/" target="_blank" class="ml-3" style="text-decoration: none;">
			<eight-base-logo></eight-base-logo>
		</a>
		<v-spacer></v-spacer>
		<v-btn text tile color="primary" :to="{name: 'about'}" exact @click="Navigation()">About</v-btn>
		<v-btn
			text
			href="https://github.com/WhiteBookmark/bulk-link-opener"
			target="_blank"
			@click="NewTab()"
		>
			<v-icon>{{Icons.mdiGithubBox}}</v-icon>Github
		</v-btn>
	</v-footer>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { mdiGithubBox } from "@mdi/js";
import { Sound } from "@/mixins/sound";
import EightBaseLogo from "@/components/EightBaseLogo.vue";

@Component({
  components: {
    EightBaseLogo
  }
})
export default class FooterBar extends Mixins<Sound>(Sound) {
  get Icons() {
    return {
      mdiGithubBox
    };
  }
}
</script>

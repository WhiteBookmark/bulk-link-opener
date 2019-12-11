<template>
	<div class="text-center ma-2">
		<v-btn dark @click="snackbar = true">Open Snackbar</v-btn>
		<v-snackbar v-model="snackbar">
			{{ text }}
			<v-btn color="pink" text @click="snackbar = false">Close</v-btn>
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MultiPurposeSnackbar extends Vue {
  private snackbar: boolean = false;
  private text: string = "Some text";
}
</script>
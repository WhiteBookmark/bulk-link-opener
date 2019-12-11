<template>
	<div class="text-center ma-2">
		<v-snackbar v-model="snackbar" :color="snackbarColor">
			<v-container fluid pa-0>
				<v-row no-gutters>
					<v-col>
						<span class="white--text">
							<b>{{text}}</b>
						</span>
						<v-btn color="white" text @click="snackbar = false">Close</v-btn>
					</v-col>
				</v-row>
				<v-row no-gutters>
					<v-col>
						<v-progress-linear :value="timeout"></v-progress-linear>
					</v-col>
				</v-row>
			</v-container>
		</v-snackbar>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class MultiPurposeSnackbar extends Vue {
  private snackbar: boolean = false;
  private text: string = "Unknown";
  private snackbarColor: string = "primary";
  private timeout: number = 100;

  created() {
    this.$globalEvent.$on("open-snackbar", (type: string, message: string) => {
      switch (type) {
        default:
        case "error":
          this.snackbarColor = "red";
          break;
        case "info":
          this.snackbarColor = "teal";
          break;
        case "success":
          this.snackbarColor = "green";
          break;
        case "warning":
          this.snackbarColor = "deep-orange";
          break;
      }
      this.text = message;
      this.snackbar = true;

      // Reset timeout and decrease interval periodically
      this.timeout = 100;
      const progressBarInterval = setInterval(() => {
        this.timeout -= 1;
      }, 60);

      // After 6000 claer the interval
      setTimeout(() => {
        clearInterval(progressBarInterval);
      }, 6000);
    });
  }
  beforeDestroy() {
    this.$globalEvent.$off("open-snackbar");
  }
}
</script>
<template>
	<v-snackbar v-model="snackbar" :color="snackbarColor" :timeout="snackbarTimeout">
		<v-container fluid pa-0>
			<v-row no-gutters>
				<v-col>
					<span class="white--text float-left">
						<b>{{text}}</b>
					</span>
					<v-btn color="white" text @click="snackbar = false" class="float-right">Close</v-btn>
				</v-col>
			</v-row>
			<v-row no-gutters>
				<v-col>
					<v-progress-linear :value="timeout" color="white"></v-progress-linear>
				</v-col>
			</v-row>
		</v-container>
	</v-snackbar>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Sound } from "@/mixins/sound";

@Component
export default class MultiPurposeSnackbar extends Mixins<Sound>(Sound) {
  private snackbar: boolean = false;
  private text: string = "Unknown";
  private snackbarColor: string = "primary";
  private timeout: number = 100;
  private snackbarTimeout: number = 3000; // In milliseconds

  created() {
    this.$globalEvent.$on(
      "open-snackbar",
      (type: string, message: string, sound: boolean = true) => {
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
        if (sound) {
          this.Alert();
        }
        this.text = message;
        this.snackbar = true;

        // Reset timeout and decrease interval periodically
        this.timeout = 100;
        const progressBarInterval = setInterval(() => {
          this.timeout -= 1;
        }, this.snackbarTimeout / 100);

        // After 6000 claer the interval
        setTimeout(() => {
          clearInterval(progressBarInterval);
        }, this.snackbarTimeout);
      }
    );
  }
  beforeDestroy() {
    this.$globalEvent.$off("open-snackbar");
  }
}
</script>
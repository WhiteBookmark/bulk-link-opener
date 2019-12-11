<template>
	<v-container fluid text-center>
		<v-row>
			<v-col>
				<h1>
					<v-progress-circular indeterminate color="primary"></v-progress-circular>&nbsp; Logging out...
				</h1>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class Logout extends Vue {
  mounted() {
    this.$globalEvent.$emit(
      "open-snackbar",
      "success",
      "Logged out successfully"
    );
    this.$router.push({ name: "home" });
  }
}
</script>
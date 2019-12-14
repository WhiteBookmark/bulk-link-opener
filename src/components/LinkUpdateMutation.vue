<template>
	<ApolloMutation
		:mutation="require('@/graphql/LinkUpdate.gql')"
		:variables="{ id: linkId, name: linkName, url: linkURL }"
		@done="onDone"
		@error="onError"
	>
		<template v-slot="{ mutate, loading }">
			<v-btn
				color="primary"
				text
				:loading="loading"
				:disabled="loading"
				@click="preMutate(); mutate()"
			>Save</v-btn>
		</template>
	</ApolloMutation>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Emit } from "vue-property-decorator";

@Component
export default class LinkUpdateMutation extends Vue {
  private dialog: boolean = false;

  @PropSync("id") private linkId!: string;
  @PropSync("name") private linkName!: string;
  @PropSync("url") private linkURL!: string;

  @Emit()
  private onDone() {
    this.$globalEvent.$emit("open-snackbar", "success", "Link updated");
    return;
  }

  @Emit()
  private preMutate() {
    return;
  }

  private onError(errorObject: any) {
    this.$globalEvent.$emit("open-snackbar", "error", errorObject.toString());
  }
}
</script>
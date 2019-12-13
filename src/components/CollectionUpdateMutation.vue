<template>
	<ApolloMutation
		:mutation="require('@/graphql/CollectionUpdate.gql')"
		:variables="{ id: collectionId, name: collectionName }"
		@done="onDone"
	>
		<template v-slot="{ mutate, loading, error }">
			<v-btn
				color="primary"
				text
				:loading="loading"
				:disabled="loading"
				@click="preMutate(); mutate()"
			>Save</v-btn>
			<p v-if="error">An error occurred: {{ error }}</p>
		</template>
	</ApolloMutation>
</template>

<script lang="ts">
import { Vue, Component, PropSync, Emit } from "vue-property-decorator";

@Component
export default class CollectionUpdateMutation extends Vue {
  private dialog: boolean = false;

  @PropSync("id") private collectionId!: string;
  @PropSync("name") private collectionName!: string;

  @Emit()
  private onDone() {
    this.$globalEvent.$emit("open-snackbar", "success", "Collection updated");
    return;
  }

  @Emit()
  private preMutate() {
    return;
  }
}
</script>
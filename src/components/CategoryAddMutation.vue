<template>
	<ApolloMutation
		:mutation="require('@/graphql/CategoryUpdate.gql')"
		:variables="{ id: categoryId, name: categoryName }"
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
export default class CategoryAddMutation extends Vue {
  private dialog: boolean = false;

  @PropSync("id") private categoryId!: string;
  @PropSync("name") private categoryName!: string;

  @Emit()
  private onDone() {
    this.$globalEvent.$emit("open-snackbar", "success", "Category updated");
    return;
  }

  @Emit()
  private preMutate() {
    return;
  }
}
</script>
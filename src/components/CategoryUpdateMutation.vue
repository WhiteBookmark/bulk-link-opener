<template>
	<ApolloMutation
		:mutation="require('@/graphql/CategoryUpdate.gql')"
		:variables="{ id: categoryId, name: categoryName }"
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
export default class CategoryUpdateMutation extends Vue {
  private dialog: boolean = false;

  @PropSync("id") private categoryId!: string;
  @PropSync("name") private categoryName!: string;

  @Emit()
  private onDone() {
    this.$globalEvent.$emit("open-snackbar", "success", "Category updated");
    return;
  }

  private onError(errorObject: any) {
    this.$globalEvent.$emit("open-snackbar", "error", errorObject.toString());
  }

  @Emit()
  private preMutate() {
    return;
  }
}
</script>
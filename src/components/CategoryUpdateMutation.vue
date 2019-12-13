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
export default class CategoryUpdateMutation extends Vue {
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

  private startUpdating() {
    // this.selectedCategories.forEach((categoryId: string) => {
    //   this.$apollo
    //     .mutate({
    //       mutation: CATEGORY_DELETE,
    //       variables: {
    //         id: categoryId
    //       }
    //     })
    //     .then(() => {
    //       // First unselect because deleting directly has no effecct on selected categories
    //       // If we don't do this, then after deleting next category item in array will be automatically selected
    //       let idIndex = this.selectedCategories.findIndex(
    //         (categoryId: string) => categoryId === categoryId
    //       );
    //       if (idIndex !== -1) this.selectedCategories.splice(idIndex, 1);
    //       // Now delete it from store
    //       idIndex = this.categories.findIndex(
    //         (category: Category) => category.id === categoryId
    //       );
    //       if (idIndex !== -1) this.categories.splice(idIndex, 1);
    //     })
    //     .catch((error: any) => {
    //       this.$globalEvent.$emit("open-snackbar", "error", error.toString());
    //     })
    //     .finally(() => {
    //       if (this.selectedCategories.length < 1) {
    //         this.$globalEvent.$emit(
    //           "open-snackbar",
    //           "success",
    //           "Categories deleted"
    //         );
    //         this.updateInProgress = false;
    //         this.buttonDisabled = false;
    //         this.buttonLoading = false;
    //       }
    //     });
    // });
  }
}
</script>
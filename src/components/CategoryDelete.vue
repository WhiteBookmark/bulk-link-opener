<template>
	<v-btn
		:disabled="buttonDisabled"
		:loading="buttonLoading"
		outlined
		color="primary"
		@click="startDeleting()"
	>Delete</v-btn>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Sync } from "vuex-pathify";
const CATEGORY_DELETE = require("@/graphql/CategoryDelete.gql");

@Component
export default class CategoryDelete extends Vue {
  private buttonDisabled: boolean = true;
  private buttonLoading: boolean = false;
  private deletingInProgress: boolean = false;

  @Sync("selected@categories")
  private selectedCategories!: Selected["categories"];

  @Sync("data@categories")
  private categories!: Category[];

  @Watch("selectedCategories")
  onSelectionChange(switchedValue: Selected["categories"]) {
    if (switchedValue.length > 0) {
      this.buttonDisabled = false;
      return;
    } else if (!this.deletingInProgress) {
      this.buttonDisabled = true;
    }
  }

  private startDeleting() {
    this.deletingInProgress = true;
    this.buttonDisabled = true;
    this.buttonLoading = true;

    this.selectedCategories.forEach((categoryId: string) => {
      this.$apollo
        .mutate({
          mutation: CATEGORY_DELETE,
          variables: {
            id: categoryId
          }
        })
        .then(() => {
          // First unselect because deleting directly has no effecct on selected categories
          // If we don't do this, then after deleting next category item in array will be automatically selected
          let idIndex = this.selectedCategories.findIndex(
            (categoryId: string) => categoryId === categoryId
          );
          if (idIndex !== -1) this.selectedCategories.splice(idIndex, 1);

          // Now delete it from store
          idIndex = this.categories.findIndex(
            (category: Category) => category.id === categoryId
          );
          if (idIndex !== -1) this.categories.splice(idIndex, 1);
        })
        .catch((error: any) => {
          this.$globalEvent.$emit("open-snackbar", "error", error.toString());
        })
        .finally(() => {
          if (this.selectedCategories.length < 1) {
            this.$globalEvent.$emit(
              "open-snackbar",
              "success",
              "Categories deleted"
            );
            this.deletingInProgress = false;
            this.buttonDisabled = false;
            this.buttonLoading = false;
          }
        });
    });
  }
}
</script>
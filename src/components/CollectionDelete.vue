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
const COLLECTION_DELETE = require("@/graphql/CollectionDelete.gql");

@Component
export default class CollectionDelete extends Vue {
  private buttonDisabled: boolean = true;
  private buttonLoading: boolean = false;
  private deletingInProgress: boolean = false;

  @Sync("selected@collections")
  private selectedCollections!: Selected["collections"];

  @Sync("data@collections")
  private collections!: Collection[];

  @Watch("selectedCollections")
  onSelectionChange(switchedValue: Selected["collections"]) {
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

    this.selectedCollections.forEach((collectionId: string) => {
      this.$apollo
        .mutate({
          mutation: COLLECTION_DELETE,
          variables: {
            id: collectionId
          }
        })
        .then(() => {
          // First unselect because deleting directly has no effect on selected categories
          // If we don't do this, then after deleting next category item in array will be automatically selected
          let idIndex = this.selectedCollections.findIndex(
            (selectedCollectionId: string) =>
              selectedCollectionId === collectionId
          );
          if (idIndex !== -1) this.selectedCollections.splice(idIndex, 1);

          // Now delete it from store
          idIndex = this.collections.findIndex(
            (collection: Category) => collection.id === collectionId
          );
          if (idIndex !== -1) this.collections.splice(idIndex, 1);
        })
        .catch((error: any) => {
          this.$globalEvent.$emit("open-snackbar", "error", error.toString());
        })
        .finally(() => {
          if (this.selectedCollections.length < 1) {
            this.$globalEvent.$emit(
              "open-snackbar",
              "success",
              "Collections deleted"
            );
            this.deletingInProgress = false;
            this.buttonDisabled = true;
            this.buttonLoading = false;
          }
        });
    });
  }
}
</script>
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
const LINK_DELETE = require("@/graphql/LinkDelete.gql");

@Component
export default class LinkDelete extends Vue {
  private buttonDisabled: boolean = true;
  private buttonLoading: boolean = false;
  private deletingInProgress: boolean = false;

  @Sync("selected@links")
  private selectedLinks!: Selected["links"];

  @Sync("data@links")
  private links!: Link[];

  @Watch("selectedLinks")
  onSelectionChange(switchedValue: Selected["links"]) {
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

    this.selectedLinks.forEach((linkId: string) => {
      this.$apollo
        .mutate({
          mutation: LINK_DELETE,
          variables: {
            id: linkId
          }
        })
        .then(() => {
          // First unselect because deleting directly has no effect on selected categories
          // If we don't do this, then after deleting next category item in array will be automatically selected
          let idIndex = this.selectedLinks.findIndex(
            (selectedLinkId: string) =>
              selectedLinkId === linkId
          );
          if (idIndex !== -1) this.selectedLinks.splice(idIndex, 1);

          // Now delete it from store
          idIndex = this.links.findIndex(
            (link: Category) => link.id === linkId
          );
          if (idIndex !== -1) this.links.splice(idIndex, 1);
        })
        .catch((error: any) => {
          this.$globalEvent.$emit("open-snackbar", "error", error.toString());
        })
        .finally(() => {
          if (this.selectedLinks.length < 1) {
            this.$globalEvent.$emit(
              "open-snackbar",
              "success",
              "Links deleted"
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
<template>
	<v-dialog v-model="dialog" :persistent="updateInProgress" max-width="300px">
		<template v-slot:activator="{ on }">
			<v-btn
				:disabled="buttonDisabled"
				:loading="updateInProgress"
				outlined
				color="primary"
				v-on="on"
			>Modify</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="headline">Modify Link</span>
			</v-card-title>
			<v-card-text>
				<v-text-field
					label="Name"
					:disabled="updateInProgress"
					:loading="updateInProgress"
					v-model="name"
          dense
					required
				></v-text-field>
				<v-text-field
					label="URL"
					:disabled="updateInProgress"
					:loading="updateInProgress"
					v-model="url"
          dense
					required
				></v-text-field>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text :disabled="updateInProgress" @click="dialog = false">Close</v-btn>
				<link-update-mutation
					:id="id"
					:name="name"
					:url="url"
					@pre-mutate="startUpdating"
					@on-done="linkUpdated"
				></link-update-mutation>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Get, Sync } from "vuex-pathify";
import LinkUpdateMutation from "@/components/LinkUpdateMutation.vue";

@Component({
  components: {
    LinkUpdateMutation
  }
})
export default class LinkUpdate extends Vue {
  private buttonDisabled: boolean = true;
  private updateInProgress: boolean = false;
  private dialog: boolean = false;
  private name: string = "";
  private id: string = "";
  private url: string = "";

  @Sync("selected@links")
  private selectedLinks!: Selected["links"];

  @Sync("data@links")
  private links!: Link[];

  @Get("data@links") private linkList!: Link[];

  private ActiveCollecion() {
    if (this.linkList.length > 0) {
      const selectedData: Link | undefined = this.linkList.find(
        link => link.id === this.selectedLinks[0]
      );

      if (selectedData) {
        this.id = selectedData.id;
        this.name = selectedData.name;
        this.url = selectedData.uRL;
        return;
      }
    }
    this.id = "";
    this.name = "";
    this.url = "";
  }

  @Watch("selectedLinks")
  onSelectionChange(switchedValue: Selected["links"]) {
    if (switchedValue.length === 1) {
      this.buttonDisabled = false;
      this.ActiveCollecion();
      return;
    }
    this.buttonDisabled = true;
  }

  private linkUpdated() {
    // First unselect
    let idIndex = this.selectedLinks.findIndex(
      (linkId: string) => linkId === this.id
    );
    if (idIndex !== -1) this.selectedLinks.splice(idIndex, 1);
    // Now update it from store
    idIndex = this.links.findIndex((link: Link) => link.id === this.id);
    if (idIndex !== -1) {
      this.links[idIndex].name = this.name;
      this.links[idIndex].uRL = this.url;
    }

    this.updateInProgress = false;
    this.dialog = false;
  }

  private startUpdating() {
    this.updateInProgress = true;
  }
}
</script>
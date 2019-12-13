<template>
	<v-dialog v-model="dialog" :persistent="dialogPersistent" max-width="300px">
		<template v-slot:activator="{ on }">
			<v-btn
				:disabled="buttonDisabled"
				:loading="buttonLoading"
				outlined
				color="primary"
				v-on="on"
			>Modify</v-btn>
		</template>
		<v-card>
			<v-card-title>
				<span class="headline">Modify Collection</span>
			</v-card-title>
			<v-card-text>
				<v-text-field label="Name" v-model="name" required></v-text-field>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text :disabled="dialogPersistent" @click="dialog = false">Close</v-btn>
				<collection-update-mutation
					:id="id"
					:name="name"
					@pre-mutate="startUpdating"
					@on-done="collectionUpdated"
				></collection-update-mutation>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Get, Sync } from "vuex-pathify";
import CollectionUpdateMutation from "@/components/CollectionUpdateMutation.vue";

@Component({
  components: {
    CollectionUpdateMutation
  }
})
export default class CollectionUpdate extends Vue {
  private buttonDisabled: boolean = true;
  private buttonLoading: boolean = false;
  private updateInProgress: boolean = false;
  private dialog: boolean = false;
  private dialogPersistent: boolean = false;
  private name: string = "";
  private id: string = "";

  @Sync("selected@collections")
  private selectedCollections!: Selected["collections"];

  @Sync("data@collections")
  private collections!: Collection[];

  @Get("data@collections") private collectionList!: Collection[];

  private ActiveCollecion() {
    if (this.collectionList.length > 0) {
      const selectedData: Collection | undefined = this.collectionList.find(
        collection => collection.id === this.selectedCollections[0]
      );

      if (selectedData) {
        this.id = selectedData.id;
        this.name = selectedData.name;
        return;
      }
    }
    this.id = "";
    this.name = "";
  }

  @Watch("selectedCollections")
  onSelectionChange(switchedValue: Selected["collections"]) {
    if (switchedValue.length === 1) {
      this.buttonDisabled = false;
      this.ActiveCollecion();
      return;
    }
    this.buttonDisabled = true;
  }

  private collectionUpdated() {
    // First unselect
    let idIndex = this.selectedCollections.findIndex(
      (collectionId: string) => collectionId === this.id
    );
    if (idIndex !== -1) this.selectedCollections.splice(idIndex, 1);
    // Now update it from store
    idIndex = this.collections.findIndex(
      (collection: Collection) => collection.id === this.id
    );
    if (idIndex !== -1) this.collections[idIndex].name = this.name;

    this.dialogPersistent = false;
    this.dialog = false;
  }

  private startUpdating() {
    this.dialogPersistent = true;
  }
}
</script>
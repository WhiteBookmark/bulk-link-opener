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
				<span class="headline">Modify Category</span>
			</v-card-title>
			<v-card-text>
				<v-text-field label="Name" v-model="name" required></v-text-field>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" text :disabled="dialogPersistent" @click="dialog = false">Close</v-btn>
				<category-update-mutation
					:id="id"
					:name="name"
					@pre-mutate="startUpdating"
					@on-done="categoryUpdated"
				></category-update-mutation>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { Get, Sync } from "vuex-pathify";
import CategoryUpdateMutation from "@/components/CategoryUpdateMutation.vue";

@Component({
  components: {
    CategoryUpdateMutation
  }
})
export default class CategoryUpdate extends Vue {
  private buttonDisabled: boolean = true;
  private buttonLoading: boolean = false;
  private updateInProgress: boolean = false;
  private dialog: boolean = false;
  private dialogPersistent: boolean = false;
  private name: string = "";
  private id: string = "";

  @Sync("selected@categories")
  private selectedCategories!: Selected["categories"];

  @Sync("data@categories")
  private categories!: Category[];

  @Get("data@categories") private categoryList!: Category[];

  private ActiveCategory() {
    if (this.categoryList.length > 0) {
      const selectedData: Category | undefined = this.categoryList.find(
        category => category.id === this.selectedCategories[0]
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

  @Watch("selectedCategories")
  onSelectionChange(switchedValue: Selected["categories"]) {
    if (switchedValue.length === 1) {
      this.buttonDisabled = false;
      this.ActiveCategory();
      return;
    }
    this.buttonDisabled = true;
  }

  private categoryUpdated() {
    // First unselect
    let idIndex = this.selectedCategories.findIndex(
      (categoryId: string) => categoryId === this.id
    );
    if (idIndex !== -1) this.selectedCategories.splice(idIndex, 1);
    // Now update it from store
    idIndex = this.categories.findIndex(
      (category: Category) => category.id === this.id
    );
    if (idIndex !== -1) this.categories[idIndex].name = this.name;

    this.dialogPersistent = false;
    this.dialog = false;
  }

  private startUpdating() {
    this.dialogPersistent = true;
  }
}
</script>
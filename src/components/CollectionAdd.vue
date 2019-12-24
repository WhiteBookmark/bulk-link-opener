<template>
	<ApolloMutation
		:mutation="require('@/graphql/CollectionAdd.gql')"
		:variables="{ categoryId, name }"
		@done="onDone"
		@error="onError"
	>
		<template v-slot="{ mutate, loading }">
			<v-container fluid text-center py-0>
				<v-row>
					<v-col>
						<v-select
							:items="CategoryNames"
							label="Category"
							outlined
							:loading="loading"
							:disabled="loading"
							v-model="categoryName"
							dense
							required
						></v-select>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="9">
						<v-text-field
							label="Collection Name"
							filled
							clearable
							:clear-icon="Icons.mdiCloseCircle"
							v-model="name"
							dense
							required
							:loading="loading"
							:disabled="loading"
							@keydown.esc="cancel"
							@keydown.enter="mutate()"
						></v-text-field>
					</v-col>
					<v-col>
						<v-btn color="primary" icon x-large :loading="loading" :disabled="loading" @click="mutate()">
							<v-icon>{{Icons.mdiPlus}}</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</ApolloMutation>
</template>

<script lang="ts">
import { Vue, Component, Watch } from "vue-property-decorator";
import { mdiPlus, mdiCloseCircle } from "@mdi/js";
import { Get, Sync } from "vuex-pathify";

@Component
export default class CollectionAdd extends Vue {
  private name: string = "";
  private categoryId: string = "";
  private categoryName: string = "";

  @Get("data@categories") private categoryList!: Category[];
  @Sync("data@collections") private collectionList!: Collection[];

  get CategoryNames() {
    return this.categoryList.map(category => category.name);
  }

  @Watch("categoryName")
  private onSelectionCategory(selectedValue: string) {
    if (!selectedValue) {
      return;
    }
    if (this.categoryList.length === 0) {
      return;
    }
    const selectedRecord: Category | undefined = this.categoryList.find(
      category => category.name === selectedValue
    );

    if (selectedRecord) {
      this.categoryId = selectedRecord.id;
    }
  }

  private onDone(resultObject: any) {
    const data = resultObject.data.collectionCreate;
    this.collectionList.push(data);
    this.name = "";
    this.categoryId = "";
    this.categoryName = "";
    this.$globalEvent.$emit("open-snackbar", "success", "Collection Added");
  }

  private onError(errorObject: any) {
    this.$globalEvent.$emit("open-snackbar", "error", errorObject.toString());
  }

  private cancel() {
    this.name = "";
    this.categoryId = "";
  }

  get Icons() {
    return {
      mdiPlus,
      mdiCloseCircle
    };
  }
}
</script>
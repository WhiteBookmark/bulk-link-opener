<template>
	<ApolloMutation
		:mutation="require('@/graphql/LinkAdd.gql')"
		:variables="{ collectionId, name, url }"
		@done="onDone"
		@error="onError"
	>
		<template v-slot="{ mutate, loading }">
			<v-container fluid text-center py-0>
				<v-row>
					<v-col cols="9">
						<v-select
							:items="CollectionNames"
							label="Collection"
							outlined
							:loading="loading"
							:disabled="loading"
							v-model="collectionName"
							required
						></v-select>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="9">
						<v-text-field
							label="Link Name"
							filled
							clearable
							:clear-icon="Icons.mdiCloseCircle"
							v-model="name"
							required
							:loading="loading"
							:disabled="loading"
							@keydown.esc="cancel"
							@keydown.enter="mutate()"
						></v-text-field>
					</v-col>
				</v-row>
				<v-row>
					<v-col cols="9">
						<v-text-field
							label="Link URL"
							filled
							clearable
							:clear-icon="Icons.mdiCloseCircle"
							v-model="url"
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
export default class LinkAdd extends Vue {
  private name: string = "";
  private url: string = "";
  private collectionId: string = "";
  private collectionName: string = "";

  @Get("data@collections") private collectionList!: Collection[];
  @Sync("data@links") private linkList!: Link[];

  get CollectionNames() {
    return this.collectionList.map(collection => collection.name);
  }

  @Watch("collectionName")
  private onSelectionLink(selectedValue: string) {
    if (!selectedValue) {
      return;
    }
    if (this.collectionList.length === 0) {
      return;
    }
    const selectedRecord: Collection | undefined = this.collectionList.find(
      collection => collection.name === selectedValue
    );

    if (selectedRecord) {
      this.collectionId = selectedRecord.id;
    }
  }

  private onDone(resultObject: any) {
    const data = resultObject.data.linkCreate;
    this.linkList.push(data);
    this.name = "";
    this.url = "";
    this.collectionId = "";
    this.collectionName = "";
    this.$globalEvent.$emit("open-snackbar", "success", "Link Added");
  }

  private onError(errorObject: any) {
    this.$globalEvent.$emit("open-snackbar", "error", errorObject.toString());
  }

  private cancel() {
    this.name = "";
    this.url = "";
    this.collectionId = "";
    this.collectionName = "";
  }

  get Icons() {
    return {
      mdiPlus,
      mdiCloseCircle
    };
  }
}
</script>
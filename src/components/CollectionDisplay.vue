<template>
	<v-list flat>
		<v-list-item-group v-model="selectedCollections" multiple>
			<template v-for="collection, index of collections">
				<v-list-item :key="index" :value="collection.id">
					<template v-slot:default="{ active, toggle }">
						<v-list-item-action>
							<v-checkbox
								:input-value="active"
								color="primary"
								:on-icon="Icons.mdiCheckboxMarked"
								:off-icon="Icons.mdiCheckboxBlankOutline"
								:true-value="collection.id"
								@click="toggle"
							></v-checkbox>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>{{ collection.name }}</v-list-item-title>
							<v-list-item-subtitle>Category: {{collection.categoryId.name}}</v-list-item-subtitle>
						</v-list-item-content>
					</template>
				</v-list-item>
			</template>
		</v-list-item-group>
	</v-list>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";
import { mdiCheckboxMarked, mdiCheckboxBlankOutline } from "@mdi/js";
import { Sync, Get } from "vuex-pathify";

@Component
export default class CollectionDisplay extends Vue {
  @Sync("selected@collections")
  private selectedCollections!: Selected["collections"];

  @Get("data@collections") private collections!: Collection[];
  @Prop() data!: Collection[];

  mounted() {
    window.store.set("data@collections", this.data);
  }

  get Icons() {
    return {
      mdiCheckboxMarked,
      mdiCheckboxBlankOutline
    };
  }
}
</script>
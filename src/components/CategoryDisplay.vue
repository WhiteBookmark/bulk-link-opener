<template>
	<v-list flat>
		<v-list-item-group v-model="selectedCategories" multiple>
			<template v-for="category, index of categories">
				<v-list-item :key="index" :value="category.id">
					<template v-slot:default="{ active, toggle }">
						<v-list-item-action>
							<v-checkbox
								:input-value="active"
								color="primary"
								:on-icon="Icons.mdiCheckboxMarked"
								:off-icon="Icons.mdiCheckboxBlankOutline"
								:true-value="category.id"
								@click="toggle"
							></v-checkbox>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>{{ category.name }}</v-list-item-title>
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
export default class CategoryDisplay extends Vue {
  @Sync("selected@categories")
  private selectedCategories!: Selected["categories"];

  @Get("data@categories") private categories!: Category[];
  @Prop() data!: Category[];

  mounted() {
    window.store.set("data@categories", this.data);
  }

  get Icons() {
    return {
      mdiCheckboxMarked,
      mdiCheckboxBlankOutline
    };
  }
}
</script>
<template>
	<v-list flat>
		<v-list-item-group v-model="selectedLinks" multiple>
			<template v-for="link, index of links">
				<v-list-item :key="index" :value="link.id">
					<template v-slot:default="{ active, toggle }">
						<v-list-item-action>
							<v-checkbox
								:input-value="active"
								color="primary"
								:on-icon="Icons.mdiCheckboxMarked"
								:off-icon="Icons.mdiCheckboxBlankOutline"
								:true-value="link.id"
								@click="toggle"
							></v-checkbox>
						</v-list-item-action>

						<v-list-item-content>
							<v-list-item-title>{{ link.name }}</v-list-item-title>
							<v-list-item-subtitle>URL: {{link.uRL}}</v-list-item-subtitle>
							<v-list-item-subtitle>Collection: {{link.collectionId.name}}</v-list-item-subtitle>
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
export default class LinkDisplay extends Vue {
  @Sync("selected@links")
  private selectedLinks!: Selected["links"];

  @Get("data@links") private links!: Link[];
  @Prop() data!: Link[];

  mounted() {
    window.store.set("data@links", this.data);
  }

  get Icons() {
    return {
      mdiCheckboxMarked,
      mdiCheckboxBlankOutline
    };
  }
}
</script>
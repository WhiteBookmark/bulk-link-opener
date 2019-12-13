<template>
	<v-card max-width="400" class="mx-auto">
		<v-toolbar color="secondary" class="white--text">
			<v-toolbar-title class="mx-auto">Collections</v-toolbar-title>
		</v-toolbar>

		<collection-list></collection-list>
		<collection-add></collection-add>

		<v-card-actions>
			<v-container fluid text-center pt-0>
				<v-row no-gutters>
					<v-col>
						<collection-update></collection-update>
					</v-col>
					<v-col>
						<collection-delete></collection-delete>
					</v-col>
				</v-row>
			</v-container>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CollectionList from "@/components/CollectionList.vue";
import CollectionAdd from "@/components/CollectionAdd.vue";
import CollectionDelete from "@/components/CollectionDelete.vue";
import CollectionUpdate from "@/components/CollectionUpdate.vue";

@Component({
  components: {
    CollectionList,
    CollectionAdd,
    CollectionDelete,
    CollectionUpdate
  }
})
export default class CollectionBox extends Vue {}
</script>
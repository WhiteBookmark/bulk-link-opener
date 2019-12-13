<template>
	<v-card max-width="400" class="mx-auto">
		<v-toolbar color="secondary" class="white--text">
			<v-toolbar-title class="mx-auto">Categories</v-toolbar-title>
		</v-toolbar>

		<category-list></category-list>
		<category-add></category-add>

		<v-card-actions>
			<v-container fluid text-center pt-0>
				<v-row no-gutters>
					<v-col>
						<category-update></category-update>
					</v-col>
					<v-col>
						<category-delete></category-delete>
					</v-col>
				</v-row>
			</v-container>
		</v-card-actions>
	</v-card>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CategoryList from "@/components/CategoryList.vue";
import CategoryDelete from "@/components/CategoryDelete.vue";
import CategoryUpdate from "@/components/CategoryUpdate.vue";
import CategoryAdd from "@/components/CategoryAdd.vue";

@Component({
  components: {
    CategoryList,
    CategoryDelete,
    CategoryUpdate,
    CategoryAdd
  }
})
export default class CategoryBox extends Vue {}
</script>
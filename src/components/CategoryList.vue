<template>
	<ApolloQuery :query="require('@/graphql/CategoryList.gql')">
		<template slot-scope="{ result: { loading, error, data } }">
			<!--Show circular loading-->
			<div class="pa-2 text-center" v-if="loading">
				<v-progress-circular indeterminate color="primary"></v-progress-circular>
			</div>
			<!--Show error message if there is an error-->
			<div v-else-if="error" class="primary--text text-center pa-2">
				<p class="my-auto">Unknown error occurred while fetching data via server</p>
			</div>
			<!--Show the data if available-->
			<div v-else-if="data">
				<category-display :data="data.categoriesList.items"></category-display>
			</div>
			<!--Data is displayed after a few seconds after it fetched from server, display skeleton loader until then-->
			<div class="pa-2 text-center" v-else-if="!data">
				<v-skeleton-loader loading type="list-item@3" class="mx-auto"></v-skeleton-loader>
			</div>
			<!--Last option indicates no data available on server-->
			<div v-else class="primary--text text-center pa-2">
				<p class="my-auto">No categories available</p>
			</div>
		</template>
	</ApolloQuery>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiCheckboxMarked, mdiCheckboxBlankOutline } from "@mdi/js";
import CategoryDisplay from "@/components/CategoryDisplay.vue";

@Component({
  components: {
    CategoryDisplay
  }
})
export default class CategoryList extends Vue {
  private selected: any[] = [];

  get Icons() {
    return {
      mdiCheckboxMarked,
      mdiCheckboxBlankOutline
    };
  }
}
</script>
<template>
	<ApolloQuery
		:query="require('@/graphql/DataDisplay.gql')"
		ref="dataDisplayApollo"
		fetchPolicy="no-cache"
		v-if="isAuthenticated"
	>
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
				<data-display :data="data.categoriesList.items"></data-display>
			</div>
			<!--Data is displayed after a few seconds after it fetched from server, display skeleton loader until then-->
			<div class="pa-2 text-center" v-else-if="!data">
				<v-skeleton-loader loading type="table" class="mx-auto"></v-skeleton-loader>
			</div>
			<!--Last option indicates no data available on server-->
			<div v-else class="primary--text text-center pa-2">
				<p class="my-auto">No data available</p>
			</div>
		</template>
	</ApolloQuery>
	<div v-else class="text-center">
		<div class="primary--text mt-4">
			<u>Login to add your own category</u>
		</div>

		<data-display :data="defaultData"></data-display>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mdiCheckboxMarked, mdiCheckboxBlankOutline } from "@mdi/js";
import DataDisplay from "@/components/DataDisplay.vue";
import { Get } from "vuex-pathify";

@Component({
  components: {
    DataDisplay
  }
})
export default class Home extends Vue {
  @Get("user@authenticated") private isAuthenticated!: boolean;
  @Get("data@default") private defaultData!: any;

  get Icons() {
    return {
      mdiCheckboxMarked,
      mdiCheckboxBlankOutline
    };
  }
}
</script>

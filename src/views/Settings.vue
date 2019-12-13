<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<category-box></category-box>
			</v-col>
			<v-col>
				<collection-box></collection-box>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CategoryBox from "@/components/CategoryBox.vue";
import CollectionBox from "@/components/CollectionBox.vue";

@Component({
  components: {
    CategoryBox,
    CollectionBox
  }
})
export default class Settings extends Vue {}
</script>
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
		<v-row>
			<v-col>
				<link-box></link-box>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CategoryBox from "@/components/CategoryBox.vue";
import CollectionBox from "@/components/CollectionBox.vue";
import LinkBox from "@/components/LinkBox.vue";

@Component({
  components: {
    CategoryBox,
    CollectionBox,
    LinkBox
  }
})
export default class Settings extends Vue {}
</script>
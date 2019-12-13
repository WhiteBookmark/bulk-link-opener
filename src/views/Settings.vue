<template>
	<v-container fluid>
		<v-row>
			<v-col>
				<category-box></category-box>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import CategoryBox from "@/components/CategoryBox.vue";

@Component({
  components: {
    CategoryBox
  }
})
export default class Settings extends Vue {

}
</script>
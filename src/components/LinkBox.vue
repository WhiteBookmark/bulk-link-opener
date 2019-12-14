<template>
	<v-container fluid>
		<v-row>
			<v-col></v-col>
			<v-col cols="10">
				<v-card class="mx-auto">
					<v-toolbar color="secondary" class="white--text">
						<v-toolbar-title class="mx-auto">Links</v-toolbar-title>
					</v-toolbar>

					<link-list></link-list>
					<link-add></link-add>

					<v-card-actions>
						<v-container fluid text-center pt-0>
							<v-row no-gutters>
								<v-col>
									<link-update></link-update>
								</v-col>
								<v-col>
									<link-delete></link-delete>
								</v-col>
							</v-row>
						</v-container>
					</v-card-actions>
				</v-card>
			</v-col>
			<v-col></v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import LinkList from "@/components/LinkList.vue";
import LinkAdd from "@/components/LinkAdd.vue";
import LinkDelete from "@/components/LinkDelete.vue";
import LinkUpdate from "@/components/LinkUpdate.vue";

@Component({
  components: {
    LinkList,
    LinkAdd,
    LinkDelete,
    LinkUpdate
  }
})
export default class LinkBox extends Vue {}
</script>
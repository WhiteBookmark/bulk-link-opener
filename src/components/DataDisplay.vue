<template>
	<v-container fluid text-center>
		<v-row>
			<v-col v-for="category in categories" :key="category.id">
				<v-card class="mx-auto">
					<v-toolbar color="secondary" class="white--text">
						<v-toolbar-title class="mx-auto">{{category.name}}</v-toolbar-title>
					</v-toolbar>

					<v-card-text>
						<template v-for="collection in category.category_Collection.items">
							<div :key="collection.id">
								<v-btn
									outlined
									color="primary"
									min-width="200"
									max-width="200"
									@click="openLinks(collection.collection_Link.items)"
								>{{collection.name}}</v-btn>
								<br />
								<br />
							</div>
						</template>
					</v-card-text>
				</v-card>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Mixins, Component, PropSync } from "vue-property-decorator";
import { Sound } from "@/mixins/sound";

@Component
export default class DataDisplay extends Mixins<Sound>(Sound) {
  @PropSync("data") private categories!: any;

  private openLinks(links: Link[]) {
    links.forEach((link: Link) => {
      window.open(link.uRL, "_blank");
    });
  }
}
</script>
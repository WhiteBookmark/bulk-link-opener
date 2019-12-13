<template>
	<ApolloMutation
		:mutation="require('@/graphql/CategoryAdd.gql')"
		:variables="{ email, name }"
		@done="onDone"
		@error="onError"
	>
		<template v-slot="{ mutate, loading }">
			<v-container fluid text-center py-0>
				<v-row>
					<v-col cols="9">
						<v-text-field
							label="Category Name"
							filled
							clearable
							:clear-icon="Icons.mdiCloseCircle"
							v-model="name"
							required
							:loading="loading"
							:disabled="loading"
							@keydown.esc="cancel"
							@keydown.enter="mutate()"
						></v-text-field>
					</v-col>
					<v-col>
						<v-btn color="primary" icon x-large :loading="loading" :disabled="loading" @click="mutate()">
							<v-icon>{{Icons.mdiPlus}}</v-icon>
						</v-btn>
					</v-col>
				</v-row>
			</v-container>
		</template>
	</ApolloMutation>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { mdiPlus, mdiCloseCircle } from "@mdi/js";
import { Get, Sync } from "vuex-pathify";

@Component
export default class CategoryAdd extends Vue {
  private name: string = "";

  @Get("user@data.user.email") private email!: string;
  @Sync("data@categories") private categoryList!: Category[];

  get Icons() {
    return {
      mdiPlus,
      mdiCloseCircle
    };
  }

  private onDone(resultObject: any) {
    const data = resultObject.data.categoryCreate;
    this.categoryList.push({
      id: data.id,
      name: data.name
    });
    this.name = "";
    this.$globalEvent.$emit("open-snackbar", "success", "Category Added");
  }

  private onError(errorObject: any) {
    this.$globalEvent.$emit("open-snackbar", "error", errorObject.toString());
  }

  private cancel() {
    this.name = "";
  }
}
</script>
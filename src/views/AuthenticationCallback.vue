<template>
	<v-container fluid text-center>
		<v-row>
			<v-col>
				<h1>
					<v-progress-circular indeterminate color="primary"></v-progress-circular>&nbsp; Processing authentication...
				</h1>
			</v-col>
		</v-row>
	</v-container>
</template>

<script lang="ts">
import { Mixins, Component } from "vue-property-decorator";
import { Authentication } from "@/mixins/auth";
import { CURRENT_USER_QUERY, USER_SIGN_UP_MUTATION } from "@/utils/graphql";

@Component
export default class AuthenticationCallback extends Mixins<Authentication>(
  Authentication
) {
  async mounted() {
    const authResult = await this.auth.getAuthorizedData();

    const context = {
      headers: {
        authorization: `Bearer ${authResult.idToken}`
      }
    };

    try {
      await this.$apollo.query({
        query: CURRENT_USER_QUERY,
        context
      });
    } catch {
      // If user doesn't exist, an error will be, thrown, which then the new user can be, created using the authResult values.
      await this.$apollo.mutate({
        mutation: USER_SIGN_UP_MUTATION,
        variables: {
          user: { email: authResult.email },
          authProfileId: process.env.VUE_APP_AUTH_PROFILE_ID
        },
        context
      });
    }
    window.store.set("user@authenticated", true);
    window.store.set("user@session", authResult.idToken);
    this.$router.push({ name: "home" });
  }
}
</script>
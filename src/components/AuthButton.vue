<template>
	<v-btn large tile text color="primary" @click="buttonClick">{{buttonText}}</v-btn>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import { Get } from "vuex-pathify";

@Component
export default class AuthButton extends Vue {
  @Get("user@authenticated") private isAuthenticated!: boolean;

  get buttonText() {
    if (this.isAuthenticated) {
      return "Sign Out";
    }
    return "Sign In";
  }

  private buttonClick() {
    if (this.isAuthenticated) {
      window.store.set("user@session", null);
      window.store.set("user@isAuthenticated", false);
      return;
    }
  }
}
</script>
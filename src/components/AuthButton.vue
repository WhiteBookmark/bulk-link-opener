<template>
	<v-btn large tile text color="primary" @click="buttonClick">{{buttonText}}</v-btn>
</template>

<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";
import { Get } from "vuex-pathify";
import { Authentication } from "@/mixins/auth";

@Component
export default class AuthButton extends Mixins<Authentication>(Authentication) {
  @Get("user@authenticated") private isAuthenticated!: boolean;

  get buttonText() {
    if (this.isAuthenticated) {
      return "Sign Out";
    }
    return "Sign In";
  }

  private async buttonClick() {
    if (this.isAuthenticated) {
      window.store.set("user@session", null);
      window.store.set("user@authenticated", false);
      this.auth.logout();
      return;
    }
    this.auth.authorize();
  }
}
</script>
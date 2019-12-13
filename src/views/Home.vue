<template>
	<div class="home">
		<p>Triggering the igniter</p>
	</div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { mdiCheckboxMarked, mdiCheckboxBlankOutline } from "@mdi/js";

@Component
export default class Home extends Vue {
  private settings: any[] = [];
  private some: boolean = false;

  get Icons() {
    return {
      mdiCheckboxMarked,
      mdiCheckboxBlankOutline
    };
  }
}
</script>

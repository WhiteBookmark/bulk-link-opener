<template>
	<v-footer app color="background" class="primary--text">
		<p class="pa-0 my-auto">&copy; 2019 - Present</p>
        <v-spacer></v-spacer>
        <v-btn>About</v-btn>
	</v-footer>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component
export default class FooterBar extends Vue {}
</script>

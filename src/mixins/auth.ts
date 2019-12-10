import { Component, Vue } from 'vue-property-decorator';
import { Auth, AUTH_STRATEGIES } from '@8base/auth';

@Component
export class Authentication extends Vue {
	public auth = Auth.createClient(
		{
			strategy: AUTH_STRATEGIES.WEB_8BASE,
		},
		{
			domain: process.env.VUE_APP_AUTH_DOMAIN,
			clientId: process.env.VUE_APP_AUTH_CLIENT_ID,
			redirectUri: `${window.location.origin}/auth/callback`,
			logoutRedirectUri: `${window.location.origin}/logout`,
		},
	);
}

import { Component, Vue } from 'vue-property-decorator';

@Component
export class Sound extends Vue {
	private soundInstance = new Audio();

	constructor() {
		super();
		this.soundInstance.volume = 0.01;
	}
	public Alert(): void {
		this.soundInstance = new Audio(require('@/assets/Audio/Alert.mp3'));
		this.Play();
	}
	public NewTab(): void {
		this.soundInstance = new Audio(require('@/assets/Audio/NewTab.mp3'));
		this.Play();
	}
	public Navigation(): void {
		this.soundInstance = new Audio(require('@/assets/Audio/Navigation.mp3'));
		this.Play();
	}
	public Switch(): void {
		this.soundInstance = new Audio(require('@/assets/Audio/Switch.mp3'));
		this.Play();
	}

	private Play(): void {
		if (process.env.NODE_ENV !== 'development') {
			return;
		}
		this.soundInstance.play();
	}
}

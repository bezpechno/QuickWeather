import App from './App.svelte';


const apiKey = process.env.OPENWEATHER_API;

const app = new App({
	target: document.body,
	props: {
		
	}
});

export default app;
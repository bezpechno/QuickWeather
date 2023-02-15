<script lang="ts">
	import { onMount } from "svelte";
	import WeatherService from "./utils/WeatherService";
	import { getWeatherData } from "./utils/WeatherService";
	import type { WeatherData } from "./utils/types";
	

	let weatherData;
	let temperature;
	let feeling;
	const weatherService = new WeatherService();

	onMount(async () => {
		weatherData = await weatherService.getWeatherData("London");
		try {
			const position = await getCurrentPosition();
			const { latitude, longitude } = position.coords;
			weatherData = await getWeatherData(latitude, longitude);
			temperature = Math.round(weatherData.main.temp);
			feeling = Math.round(weatherData.main.feels_like);
			console.log(weatherData);
		} catch (error) {
			console.error(error);
		}
	});
	async function getCurrentPosition(): Promise<GeolocationPosition> {
		return new Promise<GeolocationPosition>((resolve, reject) => {
			navigator.geolocation.getCurrentPosition(resolve, reject);
		});
	}
	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition((position) => {
				let latitude = position.coords.latitude;
				let longitude = position.coords.longitude;
				getWeatherData(latitude, longitude);
			});
		} else {
			console.log("Geolocation is not supported by this browser.");
		}
	}
</script>

<main>
	{#if weatherData}
	  <div class="location col-md-2">
		<h1 class="name">{weatherData.name}</h1>
	  </div>
	  <div class="info col-md-10">
		{#if weatherData.main}
		  <h1 class="medium temp">{Math.round(weatherData.main.temp)} &deg;C</h1>
		  <h4 class=" feeling">Feels {Math.round(weatherData.main.feels_like)} &deg;C</h4>
		{:else}
		  <p>No temperature data available</p>
		{/if}
		{#if weatherData.weather}
		  <p class=" desc">{weatherData.weather[0].main}</p>
		{:else}
		  <p>No weather data available</p>
		{/if}
	  </div>
	{:else}
	  <p>Loading...</p>
	{/if}
  </main>
  

<style>
/* Set main container to full height */
main {
  height: 100vh;
  display: flex;
}

/* Center the child elements */
main > div {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.desc{
	padding-top: 1em;
	text-transform: uppercase;
	font-size: 1.5rem;
  	font-weight: 700;	
}

/* Style the location container */
.location {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

/* Style the name of location */
.name {
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  margin-right: 20px;
}

/* Style the info container */
.info {
  text-align: center;

}

/* Style the temperature */
.temp {
  font-size: 4rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

/* Style the "Feels like" temperature */
.feeling {
  font-size: 1.5rem;
  font-weight: 700;
  padding-top: 1em;
  text-transform: uppercase;

}


	.name {
		color: #51da4c;
		text-transform: uppercase;
		font-size: 4em;
		font-weight: 100;
	}
	.medium {
		font-family: "Open Sans", sans-serif;
		font-weight: 700;
	}
	@media (min-width: 640px) {
		main {
			max-width: none;
		}
	}
</style>

---
categories:
  - Webseite
source: https://github.com/jason0x43/alfred-weather
tags:
  - Alfred
---
# alfred-weather

An [Alfred](https://www.alfredapp.com/) workflow for showing weather forecasts

This workflow lets you access weather forecasts from several APIs:

- [ClimaCell](https://climacell.co/)
- [OpenWeather](https://openweathermap.org/)
- [Dark Sky](https://darksky.net/)
- Note that [Dark Sky was purchased by Apple](https://blog.darksky.net/dark-sky-has-a-new-home/) in early 2020 and has sunset their API. API keys are no longer being issued, and the API will cease service at the end of 2021.

## Installation

Download the latest workflow package from the [releases page](https://github.com/jason0x43/alfred-weather/releases) and double click it — Alfred will take care of the rest.

## Setup

The workflow has one top-level command, `wtr`, and three sub-commands, daily (`wtd`), hourly (`wth`), and options (`wto`). The first thing you'll need to do is configure some options.

![[options.png]]

Some options are, well, optional, but the Service and related Key options, and a default location, are required. You need an API key for the service you choose. Both of the currently supported services (Dark Sky and OpenWeather) are free to use (for a reasonable number of requests per day).

- [OpenWeather API](https://openweathermap.org/api)
- [ClimaCell API](https://developer.climacell.co/)
- [Dark Sky API](https://darksky.net/dev/) (no longer offering new API keys)

Once you've entered the service key, selection the "Location" option then enter a ZIP code or city name, then wait a couple of seconds. When it looks like your desired location has been found, press Enter to save it.

## Usage

The `wtd` keyword will show a forecast for the next several days.

![[daily.png]]

The `wth` keyword will show a forecast for the next several hours.

![[hourly.png]]

In either case, you can enter a location query to get the forecast for somewhere other than your default location.

![[daily_name.png]]

![[daily_zip.png]]

Actioning a day in the daily forecast will jump to an hourly forecast for that day, if hourly data is available. Actioning the list heading will jump back to the daily forecast.

If there are any active weather alerts, they'll show at the top of the forecast. Actioning an alert will open more detailed information in a browser window.

If there is a newer version of the workflow available, a message will be displayed at the top of the result list. Actioning it will open a release page for the new version in a browser window.

![[update.png]]

## Credits

The package includes a number of icon sets from the [Weather Underground](https://github.com/jason0x43/alfred-weather/blob/master/wund) and from [weathericonsets.com](https://www.weathericonsets.com/) (I'm not up to drawing weather icons yet). Each set includes an `info.json` file that gives a short description and provides a source URL for the icon set.
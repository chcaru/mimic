# Mimic

[![npm version](https://badge.fury.io/js/ts-mimic.svg)](https://badge.fury.io/js/ts-mimic)

Mimic is a project that brings TypeScript interfaces to life with mock data. This is a small "monorepo" for the library, demo site, and a site that uses the library to send mock data to EventHub.

The original impetus for this project was that I wanted to be able to easily shape, edit, and generate large amounts of realistic mock data to test a feature I was building at the time: [Power BI - Streaming Dataflows](https://learn.microsoft.com/en-us/power-bi/transform-model/dataflows/dataflows-streaming) (for myself and the team). I decided to do it as a personal project and publish the library and tools for others to use too.

See the main [README](./projects/mimic/README.md) for the library.

## Components

### Mimic library

[`projects/mimic`](./projects/mimic) is the primary component - it's the library that transforms TypeScript into mock data generators.

It's available on npm: [ts-mimic](https://www.npmjs.com/package/ts-mimic)

See the main README of the library [README](./projects/mimic/README.md) for more details

### Demo site

A simple app that hosts two monaco editors, one to define types and the other to preview generated mock data.

Code: [`projects/mimic-site`](./projects/mimic-site)

Live site: [mimic.chriscaruso.dev](https://mimic.chriscaruso.dev)

### EventHub site

A small tool that uses mimic to define and send generated mock data to EventHub (Basically Kafka for Azure).

Code: [`projects/eventhub`](./projects/eventhub)

Live site: [eventhub.chriscaruso.dev](https://eventhub.chriscaruso.dev)

It's all client side, which is pretty cool!

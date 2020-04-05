<template>
  <div id="map"></div>
</template>

<script>
import mapboxgl from "mapbox-gl/dist/mapbox-gl";
import * as configs from "../config";
export default {
  components: {},
  props: {
    geoData: {
      type: Object,
      required: true
    },
    displayedIds: {
      type: Object
    }
  },
  data() {
    return {
      accessToken: configs.MAP_ACCESS_TOKEN,
      geoJsonlayer: configs.MAP_GEO_JSON_LAYER,
      geoStyle: configs.MAP_STYLE,
      mapbox: {}
    }; // your access token. Needed if you using
  },
  watch: {
    displayedIds() {
      Object.keys(this.displayedIds).forEach(key => {
        const id = configs.LAYER_PREFIX + key;
        if (this.mapbox.getLayer(id) !== undefined) {
          this.mapbox.setLayoutProperty(
            id,
            "visibility",
            this.displayedIds[key] ? "visible" : "none"
          );
        }
      });
    }
  },
  created() {},
  mounted() {
    this.initMapPlugin();
  },
  methods: {
    initMapPlugin() {
      mapboxgl.accessToken = this.accessToken;
      this.mapbox = new mapboxgl.Map({
        container: "map",
        style: this.geoStyle,
        center: [151.204732, -33.867009],
        zoom: 15
      });
      // Load layout from given JSON and it related parte
      this.mapbox.on("load", () => {
        this.mapbox.addSource("points", {
          type: "geojson",
          data: this.geoData
        });
        // Add a symbol layer.
        this.geoData.features.forEach(feat => {
          const id =
            configs.LAYER_PREFIX + feat.properties.project["Project ID"];
          if (!this.mapbox.getLayer(id)) {
            const layer = {
              ...this.geoJsonlayer,
              id,
              filter: ["==", "id", feat.properties.project["Project ID"]]
            };
            this.mapbox.addLayer(layer);
            this.mapbox.getLayoutProperty(id, "visibility");
            // Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
            this.mapbox.on("click", id, e => {
              this.mapbox.flyTo({ center: e.features[0].geometry.coordinates });
              const coordinates = e.features[0].geometry.coordinates.slice();
              const properties = e.features[0].properties;
              const parsedObj = JSON.parse(properties.project);
              const template = this.popupTemplate(
                parsedObj["Project ID"],
                parsedObj["Title"],
                parsedObj["Address"]
              );
              while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
                coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
              }

              new mapboxgl.Popup()
                .setLngLat(coordinates)
                .setHTML(template)
                .addTo(this.mapbox);
            });

            // Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
            this.mapbox.on("mouseenter", id, () => {
              this.mapbox.getCanvas().style.cursor = "pointer";
            });

            // Change it back to a pointer when it leaves.
            this.mapbox.on("mouseleave", id, () => {
              this.mapbox.getCanvas().style.cursor = "";
            });
          }
        });
      });
    },
    popupTemplate(id, title, add) {
      const template =
        "<div>ID: @id</div>" +
        "<div>name: @title</div>" +
        "<div>address: @address</div>";
      return template
        .replace(/@id/g, id)
        .replace(/@title/g, title)
        .replace(/@address/g, add);
    }
  }
};
</script>

<style>
#map {
  height: 100vh;
}
.mapboxgl-popup {
  max-width: 400px;
  font: 12px/20px "Helvetica Neue", Arial, Helvetica, sans-serif;
}
</style>
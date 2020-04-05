<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col cols="3">
          <Sidebar
            :categories="categories"
            :ids="ids"
            :statues="statues"
            @update-filter="updateFilter"
          ></Sidebar>
        </b-col>
        <b-col cols="9">
          <Map :geoData="geoData" :displayedIds="displayedProjIds"></Map>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import Sidebar from "./components/Sidebar";
import Map from "./components/Map";
import axios from "axios";
import { MAP_GEO_JSON_SOURCE } from "./config";

export default {
  name: "App",
  components: {
    Sidebar,
    Map
  },
  data() {
    return {
      geoData: {},
      filterId: null,
      filterCatogry: null,
      filterStatus: []
    };
  },
  computed: {
    projects() {
      if (this.geoData.features) {
        return this.geoData.features.map(item => {
          return item.properties.project;
        });
      }
      return [];
    },
    categories() {
      return [...new Set(this.projects.map(p => p["Category"]))];
    },
    statues() {
      return [...new Set(this.projects.map(p => p["Status"]))];
    },
    ids() {
      return this.projects.map(p => p["Project ID"]);
    },
    displayedProjIds() {
      if (this.filterId || this.filterCatogry || this.filterStatus.length > 0) {
        return this.projects.reduce((carry, proj) => {
          //find Project ID,Status,Category
          let val = false;
          if (proj["Project ID"] === this.filterId) {
            val = true;
          }
          if (proj["Category"] === this.filterCatogry) {
            val = true;
          }
          if (this.filterStatus.includes(proj["Status"])) {
            val = true;
          }
          carry[proj["Project ID"]] = val;

          return carry;
        }, {});
      }
      return this.ids.reduce((carry, id) => {
        carry[id] = true;
        return carry;
      }, {});
    }
  },
  created() {
    this.assignGeoData();
  },
  methods: {
    updateFilter({ id, category, statues }) {
      this.filterId = id;
      this.filterCatogry = category;
      this.filterStatus = statues;
    },
    getGeoDataJson() {
      return axios.get(MAP_GEO_JSON_SOURCE);
    },
    async assignGeoData() {
      try {
        const res = await this.getGeoDataJson();
        if (res.status === 200) {
          // const collection = JSON.stringify(res.data, null, '');
          // const {features,type} = JSON.parse(collection) ;
          const { features, type } = res.data;

          this.geoData = { features, type };
          // features =  features.map((item,index)=>{

          // });
        } else console.log(res.statusText);
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}
</style>

<template>
  <div id="app">
    <b-container fluid>
      <b-row>
        <b-col cols="3">
            <Sidebar :categories="categories" :ids="ids" :statues="statues"></Sidebar>
        </b-col>
        <b-col cols="9">
            <Map :geoData="geoData" ></Map>
        </b-col>
      </b-row>
    </b-container>

  </div>
</template>
<script>
import Sidebar from './components/Sidebar';
import Map from './components/Map';
import axios from 'axios';
import {MAP_GEO_JSON_SOURCE} from './config';


export default {
  name: 'App',
  components: {
    Sidebar,
    Map
  },
  data(){
    return {
      geoData:{},
    }
  },
  computed:{
    projects(){
      if(this.geoData.features){
            return this.geoData.features.map((item)=>{
              return item.properties.project;
            });
      }
      return [];
      
    },
    categories(){
       return [...new Set(this.projects.map(p =>p['Category']))] ;
    },
    statues(){
        return [...new Set(this.projects.map(p =>p['Status']))] ;
    },
    ids(){
      return this.projects.map(p =>p['Project ID']);
    },
  },
   created(){
     this.assignGeoData(); 
  },
   methods: {
     
        getGeoDataJson(){
        return axios.get(MAP_GEO_JSON_SOURCE);

        },
        async assignGeoData(){
          try{
              const res  =  await this.getGeoDataJson(); 
              if(res.status===200){
                  const collection = JSON.stringify(res.data, null, '');
                  const {features,type} = JSON.parse(collection) ;


                  this.geoData = {features,type}
                  // features =  features.map((item,index)=>{

                  // });
              }
              else
                console.log(res.statusText);
          }
          catch(e){
              console.error(e);
          }     
        }
  }
 

}
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

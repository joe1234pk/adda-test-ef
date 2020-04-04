<template>
  <div class="my-5">
    <h3>Filter</h3>
    <div class="my-3">
      <b-form-group label="ID">
        <VueSelect :options="ids" label="select" v-model="selectedId" :searchable="true"></VueSelect>
      </b-form-group>

      <b-form-group label="Category">
        <VueSelect :options="categories" label="select" v-model="selectedCategories"></VueSelect>
      </b-form-group>
      <b-form-group label="Status">
        <b-form-checkbox-group id="checkbox-group-2" v-model="selectedStatues" name="flavour-2">
          <b-form-checkbox :value="status" v-for="status in statues" :key="status">{{status}}</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import vSelect from "vue-select";
Vue.component("VueSelect", vSelect);
export default {
  props: {
    categories: {
      type: Array,
      default: () => []
    },
    statues: {
      type: Array,
      default: () => []
    },
    ids: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selectedStatues: [],
      selectedId: '',
      selectedCategories: ''
    };
  }
};
</script>
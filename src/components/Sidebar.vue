<template>
  <div class="my-5">
    <h3>Filter</h3>
    <div class="my-3">
      <b-form-group label="ID" id="id_form_group">
        <VueSelect :options="ids" label="select" v-model="selectedId" :searchable="true"></VueSelect>
      </b-form-group>

      <b-form-group label="Category" id="category_form_group">
        <VueSelect :options="categories" label="select" v-model="selectedCategories"></VueSelect>
      </b-form-group>
      <b-form-group label="Status">
        <b-form-checkbox-group id="status_checkbox_group" v-model="selectedStatues" >
          <b-form-checkbox :value="status" v-for="status in statues" :key="status">{{status}}</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-form-group>
        <b-button variant="outline-primary" @click="emitUpdate">Filter</b-button>
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
      selectedId: null,
      selectedCategories: null
    };
  },
  methods: {
    emitUpdate() {
      this.$emit("update-filter", {
        id: this.selectedId,
        category: this.selectedCategories,
        statues: [...this.selectedStatues]
      });
    }
  }
};
</script>
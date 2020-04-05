import {shallowMount,createLocalVue } from '@vue/test-utils'

import Sidebar from '@/components/Sidebar.vue';
import { BootstrapVue } from 'bootstrap-vue'
const localVue = createLocalVue();
localVue.use(BootstrapVue)

describe('Sidebar.vue', () => {

  const wrapper = shallowMount(Sidebar, {
    localVue,
    propsData: {  }
  });
  it('instance inialised', ()=>{
    expect(wrapper.isVueInstance()).toBeTruthy();
  });
  it('renders  correctly', () => {
    
    expect(wrapper.find('#id_form_group').exists()).toBe(true);
  })
})

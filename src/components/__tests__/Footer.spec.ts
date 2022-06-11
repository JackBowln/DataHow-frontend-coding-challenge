import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Footer from '../Footer.vue'



describe('Footer', () => {
  it("should have the correct year em v-card-text", () => {
    
    const wrapper = mount(Footer)
    expect(wrapper.find('.text-white').text()).toContain(new Date().getFullYear() )
  })
})


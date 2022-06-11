import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import Header from '../Header.vue'



describe('Header', () => {
  it("should have the correct image", () => {
    const wrapper = mount(Header)
    expect(wrapper.find('img').attributes('src')).toBe('@/assets/logo.png')
  })
})


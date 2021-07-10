import { mount } from '@vue/test-utils';
import Card from '@/components/Card.vue';

describe('# ArticleDetailCommentsForm', () => {
  it('mounts', () => {
    const wrapper = mount(Card);
    expect(wrapper.html());
  });
});

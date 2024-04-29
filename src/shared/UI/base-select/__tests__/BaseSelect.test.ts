import { mount } from '@vue/test-utils';
import {
  describe,
  expect,
  it
} from 'vitest';
import BaseSelect from '@/shared/UI/base-select';

const optionsData = [
  {
    label: 'Option 1',
    value: 'option1'
  },
  {
    label: 'Option 2',
    value: 'option2'
  },
  {
    label: 'Option 3',
    value: 'option3'
  }
];

describe('BaseSelect', () => {
  it('should element is exist and render with default props', () => {
    const wrapper = mount(BaseSelect);

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().autoRequest).toBe(false);
    expect(wrapper.props().params).toBeUndefined();
    expect(wrapper.props().options).toBeUndefined();
    expect(wrapper.props().request).toBeUndefined();
    expect(wrapper.props().maxlength).toBeUndefined();
    expect(wrapper.props().searchFieldName).toBe('searchString');
    expect(wrapper.props().searchString).toBeUndefined();
    expect(wrapper.props().defaultOption).toBeUndefined();
    expect(wrapper.props().allowInput).toBeUndefined();
  });

  it('should render with custom props', async () => {
    const modelValue = 'option1';
    const wrapper = mount(BaseSelect, {
      props: {
        modelValue,
        options: optionsData,
        autoRequest: true,
        maxlength: 5,
        request: () => {},
        params: {
        },
        allowInput: () => {}
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().modelValue).toBe(modelValue);
    expect(wrapper.props().options).toEqual(optionsData);
    expect(wrapper.props().autoRequest).toBe(true);
    expect(wrapper.props().maxlength).toBe(5);
    expect(wrapper.props().request).toBeTypeOf('function');
    expect(wrapper.props().allowInput).toBeTypeOf('function');
    expect(wrapper.props().params).toBeTypeOf('object');
  });
});

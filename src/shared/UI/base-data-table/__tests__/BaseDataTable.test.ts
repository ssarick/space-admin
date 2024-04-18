import { mount } from '@vue/test-utils';
import { NDataTable } from 'naive-ui';
import { describe, expect, it } from 'vitest';
import DataTable from '../';

describe('DataTable', () => {
  it('should render with default props', () => {
    const wrapper = mount(DataTable, {
      props: {
        rowKey: () => 1,
        columns: [],
        data: []
      }
    });

    expect(wrapper.exists()).toBe(true);
    expect(wrapper.props().rowKey).toBeTypeOf('function');
    expect(wrapper.props().singleLine).toBe(true);
    expect(wrapper.props().rowProps).toBeUndefined();
    expect(wrapper.props().maxHeight).toBeUndefined();
    expect(wrapper.props().size).toBeUndefined();
    expect(wrapper.props().loading).toBeFalsy();
    expect(wrapper.props().columns).toHaveLength(0);
    expect(wrapper.props().data).toHaveLength(0);
    expect(wrapper.props().rowClick).toBeFalsy();
  });

  it('should render with custom props', () => {
    const wrapper = mount(DataTable, {
      props: {
        remote: true,
        striped: true,
        singleLine: false,
        bordered: true,
        maxHeight: 500,
        size: 'small',
        loading: true,
        columns: [
          {
            title: 'Test branch title',
            key: 'branch'
          },
          {
            title: 'Test account title',
            key: 'account'
          }
        ],
        data: [
          {
            account: '22618000990086071001',
            branch: '01158'
          },
          {
            account: '22618000990086071002',
            branch: '01159'
          }
        ],
        rowKey: () => 1,
        rowProps: undefined
      }
    });

    const dataTableVm = wrapper.findComponent(NDataTable);

    expect(dataTableVm.exists()).toBe(true);
    expect(dataTableVm.props().remote).toBe(true);
    expect(dataTableVm.props().striped).toBe(true);
    expect(dataTableVm.props().singleLine).toBe(false);
    expect(dataTableVm.props().bordered).toBe(true);
    expect(dataTableVm.props().maxHeight).toBe(500);
    expect(dataTableVm.props().size).toBe('small');
    expect(dataTableVm.props().loading).toBe(true);
    expect(dataTableVm.props().columns).toHaveLength(2);
    expect(dataTableVm.props().data).toHaveLength(2);
  });
});

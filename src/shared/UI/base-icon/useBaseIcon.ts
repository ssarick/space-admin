import { Component, defineAsyncComponent, shallowRef, watch } from 'vue';
import { IProps } from './base-icon.types';

export default function useBaseIcon(
  props: IProps
) {
  const SVGComponent = shallowRef<Component | null>(null);

  const updateSVGComponent = () => {
    SVGComponent.value = defineAsyncComponent(
      () => import(`../../icons/${props.icon}.svg`)
    );
  };

  updateSVGComponent();

  props.isReactive && watch(
    () => props.icon,
    updateSVGComponent
  );

  return {
    SVGComponent
  };
}

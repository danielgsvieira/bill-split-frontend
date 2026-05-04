import type { VNode } from 'vue';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type VueSlot<T = any> = (props: T) => VNode[];

export type { VueSlot };

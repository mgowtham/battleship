import { helper } from '@ember/component/helper';

export function indexPosition([index]) {
  return index + 1;
}

export default helper(indexPosition);

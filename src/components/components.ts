import { withInstall } from '@/utils/install';

import HpSvgIconVue from './HpSvgIcon/Index.vue';
import HpHeaderBarVue from './HpHeaderBar/HpHeaderBar.vue';
import HpCommentVue from './HpComment/index.vue';
/**
 * HpSvgIcon
 */
export const HpSvgIcon = withInstall(HpSvgIconVue);

export const HpHeaderBar = withInstall(HpHeaderBarVue );

// export const HpHeader = withInstall(HpHeaderVue);
/**
 * HpComment
 */
export const HpComment = withInstall(HpCommentVue);



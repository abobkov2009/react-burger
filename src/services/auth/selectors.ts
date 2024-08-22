import { IRootState } from '../../utils/store';

export const selectUserInfo = (state: IRootState) => state.auth.user;

import { stringify } from 'qs';
import request from '../utils/request';


export function fetchUser(params) {
  return request(`/api/user/show?${stringify(params)}`);
}

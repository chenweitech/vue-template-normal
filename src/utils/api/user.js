import http from '../http/http';

export default {
  getPermissions(data) {
    return http.fetch('/getPermissions', data);
  }
}
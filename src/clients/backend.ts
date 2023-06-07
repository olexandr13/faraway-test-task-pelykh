import axios from 'axios';
import { getEndpoint } from '..//configs/backend-config'

class Backend {
  async getEvents() {
    const endpoint = getEndpoint('events');
    const response = await axios.get(endpoint);
    return response.data;
  }
}

export default new Backend();

import OriginService from '@/services/origin-service';
import config from '@/core/config';
import { storeIsToUpdate } from '@/core/utils';

export default {
  async findOrigins(store, forceUpdate = true) {
    const isToUpdate = storeIsToUpdate(forceUpdate,
      store.state.lastUpdate, config.ORIGIN_DATATABLE_EXPIRE_MINUTES,
      store.state.dataTable);

    console.log('origin/findFindOrigins->isToUpdate:', isToUpdate);
    if (isToUpdate) {
      const { apiContent: origins } = await OriginService.get({
        endpoint: '/',
        query: { page: 0, size: 100 },
      });
      store.commit('BOOTSTRAP_ORIGIN', origins);
    }
  },

  async insertOrigin(state, origin) {
    const { apiContent: savedOrigin } = await OriginService.post({
      endpoint: '/',
      payload: origin,
    });
    state.commit('INSERT_ORIGIN', savedOrigin);
    return savedOrigin;
  },

  async deleteOrigin(state, { id }) {
    const { apiContent: deletedOrigin } = await OriginService.delete({
      endpoint: `/${id}`,
    });

    state.commit('DELETE_ORIGIN', deletedOrigin);
  },

  async updateOrigin(state, origin) {
    const { apiContent: updatedOrigin } = await OriginService.put({
      endpoint: '/',
      payload: origin,
    });

    state.commit('UPDATE_ORIGIN', updatedOrigin);
    return updatedOrigin;
  },
};

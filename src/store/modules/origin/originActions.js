import OriginService from '@/services/origin-service';
import config from '@/core/config';
import { dateDifferenceInMinutes, isEmptyArray } from '@/core/utils';

export default {
  async findOrigins(store, forceUpdate = true) {
    const diffInMinus = dateDifferenceInMinutes(new Date(), store.state.lastUpdate);
    const dataTableIsEmpty = isEmptyArray(store.state.dataTable);
    const updateExpires = Number.isNaN(diffInMinus)
                          || diffInMinus >= config.ORIGIN_DATATABLE_EXPIRE_MINUTES;
    const isToUpdate = forceUpdate || dataTableIsEmpty || updateExpires;
    console.log(`dataTableIsEmpty: ${dataTableIsEmpty} - updateExpires: ${updateExpires}`);
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

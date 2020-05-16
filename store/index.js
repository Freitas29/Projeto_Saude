export const state = () => ({
    loading: false,
    insuranceCompanySelected: []
})

export const mutations = {
    changeLoading(state, payload){
        state.loading = payload
    },

    changeinsuranceCompanySelected(state, payload){
        state.insuranceCompanySelected = payload
    }
}

export const actions = {
    chageLoading({ dispatch }, payload){
        dispatch('changeLoading', payload)
    },

    changeinsuranceCompanySelected({ dispatch }, payload){
        dispatch('changeinsuranceCompanySelected', payload)
    }
}
export const state = () => ({
    loading: false,
    insuranceCompanySelected: [],
    chartGrowthData: []
})

export const mutations = {
    changeLoading(state, payload){
        state.loading = payload
    },

    changeInsuranceCompanySelected(state, payload){
        state.insuranceCompanySelected = payload
    },

    changeChartGrowthData(state, payload){
        state.chartGrowthData = payload
    }
}

export const actions = {
    chageLoading({ dispatch }, payload){
        dispatch('changeLoading', payload)
    },

    changeInsuranceCompanySelected({ dispatch }, payload){
        dispatch('changeInsuranceCompanySelected', payload)
    },

    changeChartGrowthData({ dispatch }, payload){
        dispatch('changeChartGrowthData', payload)
    }

}
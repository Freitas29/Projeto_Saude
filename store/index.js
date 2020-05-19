export const state = () => ({
    loading: false,
    insuranceCompanySelected: [],
    chartGrowthData: [],
    mapSelected: {},
    insuranceCompanies: [],
    isInsuranceCompany: false,
    county: ""
})

export const mutations = {
    changeLoading(state, payload){
        state.loading = payload
    },

    changeIsInsuranceCompany(state, payload){
        state.isInsuranceCompany = payload
    },

    changeCounty(state, payload){
        state.county = payload
    },

    changeInsuraceCompanies(state, payload){
        state.insuranceCompanies = payload
    },

    changeInsuranceCompanySelected(state, payload){
        state.insuranceCompanySelected = payload
    },

    changeChartGrowthData(state, payload){
        state.chartGrowthData = payload
    },

    changeMapSelected(state, payload){
        state.mapSelected = payload
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
    },

    changeMapSelected({ dispatch }, payload){
        dispatch("changeMapSelected", payload)
    },

    changeInsuraceCompanies({ dispatch }, payload){
        dispatch("changeInsuraceCompanies", payload)
    },
    
    changeIsInsuranceCompany({ dispatch }, payload){
        dispatch("changeIsInsuranceCompany", payload)
    },

    changeCounty({ dispatch }, payload){
        dispatch("changeCounty", payload)
    }

}
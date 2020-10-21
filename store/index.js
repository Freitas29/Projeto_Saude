export const state = () => ({
    loading: false,
    insuranceCompanySelected: [],
    chartGrowthData: [],
    mapSelected: {},
    messages: [{value: "Oi, meu nome é chatbot, o que você deseja saber?", type: "answer"}],
    insuranceCompanies: [],
    isInsuranceCompany: false,
    county: "",
    isDarkMode: false,
})

export const mutations = {
    changeLoading(state, payload){
        state.loading = payload
    },

    changeIsDarkMode(state, payload){
        state.isDarkMode = payload
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
    },

    changeModalGrowthClose(state){
        state.chartGrowthData = []
    },

    updateMessages(state, payload) {
        state.messages = [...state.messages, payload]
    }
}

export const actions = {
    changeLoading({ commit }, payload){
        commit('changeLoading', payload)
    },

    changeInsuranceCompanySelected({ commit }, payload){
        commit('changeInsuranceCompanySelected', payload)
    },

    changeChartGrowthData({ commit }, payload){
        commit('changeChartGrowthData', payload)
    },

    changeMapSelected({ commit }, payload){
        commit("changeMapSelected", payload)
    },

    changeInsuraceCompanies({ commit }, payload){
        commit("changeInsuraceCompanies", payload)
    },
    
    changeIsInsuranceCompany({ commit }, payload){
        commit("changeIsInsuranceCompany", payload)
    },

    changeCounty({ commit }, payload){
        commit("changeCounty", payload)
    },

    changeModalGrowthClose({ commit }, payload){
        if(!payload){
            commit("changeModalGrowthClose")
        }
    }

}
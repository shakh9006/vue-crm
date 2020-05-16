import firebase from "firebase/app";
export default {

    state: {
        info: {}
    },

    actions: {
        async fetchInfo({dispatch, commit}){
            try {
                const uid = await dispatch('getUId');
                if(uid) {
                    const info = (await firebase.database().ref(`/users/${uid}/info`).once('value')).val();
                    commit('setInfo', info);
                }
            }catch (e) {
                commit('setError', e);
                throw e;
            }
        },

        async updateInfo({commit, dispatch, getters}, bill) {
            const uid = await dispatch('getUId');
            if(uid) {
                try {
                    const infoData = {...getters.getInfo, ...bill};
                    await firebase.database().ref(`/users/${uid}/info`).update(infoData)
                    commit('setInfo', infoData);
                }catch (e) {
                    commit('setError', e);
                }
            }
        }
    },

    getters: {
        getInfo: s => s.info,
    },

    mutations: {
        setInfo(state, info) {
            state.info = info;
        },

        clearInfo(state) {
            state.info = {};
        }
    },
}
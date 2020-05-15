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
                console.log(e);
                throw e;
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
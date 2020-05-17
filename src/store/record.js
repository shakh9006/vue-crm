import firebase from 'firebase/app';
export default {
    actions: {
        async createRecord({dispatch, commit}, {category, amount, desc, type}){
            const uid = await dispatch('getUId');
            if(uid){
                try {
                   await firebase.database().ref(`/users/${uid}/records`).push({category, type, amount, desc});
                }catch (e) {
                    commit('setError', e);
                    throw e;
                }
            }
        },

        async fetchRecords({dispatch, commit}) {
            try {
                const uid = await dispatch('getUId');
                if(uid) {
                    const records = (await firebase.database().ref(`/users/${uid}/records`).once('value')).val() || {};
                    return Object.keys(records).map(key => ({...records[key], id: key}));
                }
                return  {};

            }catch (e) {
                commit('setError', e);
                throw e;
            }
        }
    },
}
import Api from '@/services/Api'

export default {
    index() {
        return Api().get('medicines')
    },
    show(medicineId) {
        return Api().get(`medicine/${medicineId}`)
    },
    post(medicine) {
        return Api().post('medicine', medicine)
    },
    put(medicine) {
        return Api().put(`medicine/${medicine.id}`, medicine)
    },
    delete(medicineId) {
        return Api().delete(`medicine/${medicineId}`)
    }
}

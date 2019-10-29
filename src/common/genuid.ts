import moment from 'moment'

export function generateUid() {
    return moment().valueOf().toString()
}
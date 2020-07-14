import axios from 'axios'
import Constants from '../constants'

const API_PRE = Constants.API_PRE

export default {
    getMsg: () => axios.get(`${API_PRE}/api/test`)
}

import axios from "axios"

const THETA_KEY = import.meta.env.VITE_THETA_KEY
const THETA_SECRET = import.meta.env.VITE_THETA_SECRET

const ThetaVideoAPI = {
    BASE_URL: 'https://api.thetavideoapi.com',

    createAndUploadVideo: async function(fileContents) {
        const result = await this.createURL()
        return await this.upload(result.body.uploads[0], fileContents)
    },

    createURL: async function () {
        try {
            const response = await axios.post(`${this.BASE_URL}/upload`, null, {
                headers: {
                    'x-tva-sa-id': THETA_KEY,
                    'x-tva-sa-secret': THETA_SECRET
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
            return null
        }
    },

    upload: async function (data, fileContents) {
        try {
            await axios.put(data.presigned_url, fileContents, {
                headers: {
                    'Content-Type': 'application/octet-stream'
                }
            })
            return data
        } catch (error) {
            console.error(error);
            return null
        }
    },

    transcodeVideo: async function () {

    },

    listVideo: async function() {
        try {
            const response = await axios.get(`${this.BASE_URL}/video/${THETA_KEY}/list`, {
                headers: {
                    'x-tva-sa-id': THETA_KEY,
                    'x-tva-sa-secret': THETA_SECRET
                }
            })
            return response.data
        } catch (error) {
            console.error(error);
            return null
        }
    }
}

export default ThetaVideoAPI
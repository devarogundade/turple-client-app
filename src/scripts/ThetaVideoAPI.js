import axios from "axios"

const THETA_KEY = import.meta.env.VITE_THETA_KEY
const THETA_SECRET = import.meta.env.VITE_THETA_SECRET

const ThetaVideoAPI = {
    BASE_URL: 'https://api.thetavideoapi.com',

    createAndUploadVideo: async function (fileContents) {
        const result = await this.createURL()
        await this.upload(result.body.uploads[0], fileContents)
        return this.transcodeVideo(result.body.uploads[0])
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
            // const formData= new FormData()
            // formData.append('file', fileContents)
            await axios.put(data.presigned_url, fileContents, {
                headers: {
                    'x-tva-sa-id': THETA_KEY,
                    'x-tva-sa-secret': THETA_SECRET,
                    'Content-Type': 'application/octet-stream'
                }
            })
        } catch (error) {
            console.error(error);
        }
    },

    transcodeVideo: async function (data) {
        try {
            const options = {
                "source_upload_id": data.id,
                "playback_policy": "public"
            }

            const response = await axios.post(`${this.BASE_URL}/video`, options, {
                headers: {
                    'x-tva-sa-id': THETA_KEY,
                    'x-tva-sa-secret': THETA_SECRET,
                    'Content-Type': 'application/json'
                }
            })

            return response.data.body
        } catch (error) {
            console.error(error);
            return null
        }
    }
}

export default ThetaVideoAPI
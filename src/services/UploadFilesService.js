// eslint-disable-next-line import/extensions
const { http } = require('../config/api')

export default {
  upload: (file, onUploadProgress, id) => {
    console.log('file > ', file)
    const formData = new FormData()

    formData.append('file', file)

    return http.post(`/upload/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    })
  },
}

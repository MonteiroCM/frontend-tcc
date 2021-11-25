<template>
  <div>
    <div v-if="currentFile">
      <div>
        <v-progress-linear
          v-model="progress"
          color="light-blue"
          height="25"
          reactive
        >
          <strong>{{ progress }} %</strong>
        </v-progress-linear>
      </div>
    </div>

    <v-row no-gutters justify="center" align="center">
      <v-col cols="8">
        <v-file-input
          show-size
          label="File input"
          @change="selectFile"
        ></v-file-input>
      </v-col>

      <v-col cols="4" class="pl-2">
      </v-col>
    </v-row>

    <v-alert v-if="message" border="left" color="blue-grey" dark>
      {{ message }}
    </v-alert>
  </div>
</template>

<script>
import UploadService from '../services/UploadFilesService'

export default {
  name: 'UploadFiles',
  data() {
    return {
      currentFile: undefined,
      progress: 0,
      message: '',

      fileInfos: [],
    }
  },
  methods: {
    selectFile(file) {
      this.progress = 0
      this.currentFile = file
    },

    upload() {
      if (!this.currentFile) {
        this.message = 'Please select a file!'

        return
      }

      this.message = ''

      console.log('upload - app -')
      UploadService.upload(this.currentFile, event => {
        this.progress = Math.round((100 * event.loaded) / event.total)
      }, 'e6c7be07-8bde-264d-e9c9-0d3e4512d6ae')
        .then(response => {
          this.message = response.data.message

          return this.message
        })
        .then(files => {
          this.fileInfos = files.data
        })
        .catch(() => {
          this.progress = 0
          this.message = 'Could not upload the file!'
          this.currentFile = undefined
        })
    },
  },
}
</script>
